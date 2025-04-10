import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Cookbook, Recipe, Role } from "@/types/graphql";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useFocusEffect, useLocalSearchParams, useRouter, useSegments } from "expo-router";
import { useSession } from "@/context";
import { useCallback, useEffect, useState } from "react";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { CustomButton } from "@/components/CustomButton";
import { CookbookCard } from "@/components/CookbookCard";
import { RecipeCardSelection } from "@/components/RecipeCardSelection";

const GET_USER_RECIPES = gql`
  query GetUserRecipes($userId: Float!) {
    getUserRecipes(userId: $userId) {
      id
      name
      image
      description
      ingredients
      directions
      cookTime
      prepTime
      rating
      isPublic
    }
  }
`;

const ADD_RECIPES_TO_COOKBOOK = gql`
  mutation AddRecipesToCookbook($cookbookId: Int!, $recipeIds: [Int!]!) {
    addRecipesToCookbook(cookbookId: $cookbookId, recipeIds: $recipeIds) {
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


export default function AddRecipesToCookbook(){
    const backgroundColor = useThemeColor("background");
    const router = useRouter();
    const { userId } = useSession();
    const { id } = useLocalSearchParams();
    const { data: userRecipeData, refetch } = useQuery(GET_USER_RECIPES, {
      variables: { userId: Number(userId) }
    });
    const [addRecipesToCookbook, { data: addRecipesToCookbookData }] = useMutation(ADD_RECIPES_TO_COOKBOOK);
    const [selectedRecipeIds, setSelectedRecipeIds] = useState<number[]>([]);
    
    const onSelectRecipe = (recipeId: number, isSelected: boolean) => {
      setSelectedRecipeIds((prevSelected) =>
        isSelected ? [...prevSelected, recipeId] : prevSelected.filter((id) => id !== recipeId)
      );
    };

    useEffect(
      useCallback(() => {
        if (userId) {
          // console.log("Refetching recipes...");
          refetch();
        }
      }, [userId])
    );

    const handleSaveCookbook = async () => {
      try {
        await addRecipesToCookbook({
          variables: {
            cookbookId: Number(id),
            recipeIds: selectedRecipeIds,
          },
        });
        console.log("Cookbook saved successfully.");
        router.push('/(app)/cookbooks')
      } catch (error) {
        console.error("Error saving cookbook:", error);
      }
    };

    return (
        <SafeAreaView style={{backgroundColor:backgroundColor, flex: 1}}>
            <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>Add Recipes to Cookbook</ThemedText>
            <ThemedScrollView style={{paddingHorizontal: 20}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
            <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                    {userRecipeData?.getUserRecipes.map((recipe: Recipe) => (
                        <ThemedView key={recipe.id} style={{ marginBottom: 10 }}>
                            <RecipeCardSelection recipe={recipe} onSelect={onSelectRecipe} />
                        </ThemedView>
                    ))}
                </ThemedView>
            </ThemedView>
            <CustomButton text="Save Cookbook" bgProps={{style: {marginVertical: 30}, onPress: handleSaveCookbook}} />
          </ThemedScrollView>
        </SafeAreaView>
    )
}