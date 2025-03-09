import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Cookbook, Recipe } from "@/types/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSession } from "@/context";
import { useCallback, useEffect, useState } from "react";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { CustomButton } from "@/components/CustomButton";
import { RecipeCardSelection } from "@/components/RecipeCardSelection";

const REMOVE_RECIPE_FROM_COOKBOOK = gql`
  mutation DeleteRecipeFromCookbook($cookbookId: Int!, $recipeId: Int!) {
    deleteRecipeFromCookbook(cookbookId: $cookbookId, recipeId: $recipeId) {
      id
      name
      recipes {
        id
        name
        description
        isPublic
        rating
      }
    }
  }
`;

export default function RemoveRecipeFromCookbook() {
  const backgroundColor = useThemeColor("background");
  const router = useRouter();
  const { selectedCookbook } = useSession();
  const { userId } = useSession();
  if (!selectedCookbook) {
    return <ThemedText>No Cookbook Found</ThemedText>;
    }
  const { id } = useLocalSearchParams();
  
  const [deleteRecipeFromCookbook] = useMutation(REMOVE_RECIPE_FROM_COOKBOOK);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<number[]>([]);

  const onSelectRecipe = (recipeId: number, isSelected: boolean) => {
    setSelectedRecipeIds((prevSelected) =>
      isSelected ? [...prevSelected, recipeId] : prevSelected.filter((id) => id !== recipeId)
    );
  };

  const handleRemoveRecipes = async () => {
    try {
        if (selectedRecipeIds.length === 0) {
            console.log("No recipes selected.");
            return;
        }
        for (const recipeId of selectedRecipeIds) {
            await deleteRecipeFromCookbook({
                variables: {
                    cookbookId: Number(id),
                    recipeId: Number(recipeId),
                },
            });
        }
        console.log("Recipes removed successfully.");
        router.push("/(app)/cookbooks");
    } catch (error) {
        console.error("Error removing recipe:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: backgroundColor, flex: 1 }}>
      <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center', lineHeight: 30 }}>
        Remove Recipes from Cookbook
      </ThemedText>
      <ThemedScrollView
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <ThemedView style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ThemedView style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
            {selectedCookbook.recipes?.map((recipe: Recipe) => (
              <ThemedView key={recipe.id} style={{ marginBottom: 10 }}>
                <RecipeCardSelection recipe={recipe} onSelect={onSelectRecipe} />
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
        <CustomButton text="Save Cookbook" bgProps={{ style: { marginVertical: 30 }, onPress: () => {handleRemoveRecipes()}}} />
      </ThemedScrollView>
    </SafeAreaView>
  );
}
