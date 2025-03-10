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
import { CookbookCardSelection } from "@/components/CookbookCardSelection";

const GET_USER_COOKBOOKS = gql`
  query GetUserCookbooks($userId: Float!) {
    getUserCookbooks(userId: $userId) {
      id
      name
      description
      recipes {
        id
      }
    }
  }
`;

const ADD_RECIPE_TO_COOKBOOKS = gql`
  mutation AddRecipeToCookbook($cookbookIds: [Int!]!, $recipeId: Int!) {
    addRecipeToCookbook(cookbookIds: $cookbookIds, recipeId: $recipeId) {
        id
        name
        description
    }
  }
`;


export default function AddRecipeToCookbooks(){
    const backgroundColor = useThemeColor("background");
    const router = useRouter();
    const { userId } = useSession();
    const { id } = useLocalSearchParams();
    const { data: userCookbookData, refetch } = useQuery(GET_USER_COOKBOOKS, {
      variables: { userId: Number(userId) }
    });
    const [addRecipeToCookbooks, { data: addRecipeToCookbooksData }] = useMutation(ADD_RECIPE_TO_COOKBOOKS);
    const [selectedCookbookIds, setSelectedCookbookIds] = useState<number[]>([]);
    
    const onSelectCookbook = (cookbookId: number, isSelected: boolean) => {
        setSelectedCookbookIds((prevSelected) =>
        isSelected ? [...prevSelected, cookbookId] : prevSelected.filter((id) => id !== cookbookId)
      );
    };

    useEffect(
      useCallback(() => {
        if (userId) {
          console.log("Refetching cookbooks...");
          refetch();
        }
      }, [userId])
    );

    const handleSaveRecipe = async () => {
      try {
        await addRecipeToCookbooks({
          variables: {
            cookbookIds: selectedCookbookIds,
            recipeId: Number(id),
          },
        });
        console.log("Recipe saved successfully.");
        router.push('/(app)/create-recipe')
      } catch (error) {
        console.error("Error saving recipe:", error);
      }
    };

    return (
      <SafeAreaView style={{backgroundColor:backgroundColor, flex: 1}}>
        <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>Add Recipes to Cookbook</ThemedText>
        <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
            <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                {userCookbookData?.getUserCookbooks.map((cookbook: Cookbook) => (
                    <ThemedView key={cookbook.id} style={{ marginBottom: 10 }}>
                        <CookbookCardSelection cookbook={cookbook} onSelect={onSelectCookbook} />
                    </ThemedView>
                ))}
            </ThemedView>
            <CustomButton text="Save Recipe" bgProps={{style: {marginVertical: 30}, onPress: handleSaveRecipe}} />
        </ThemedScrollView>
      </SafeAreaView>
    );
}