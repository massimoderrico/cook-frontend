import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CookbooksListPage } from "@/components/navigation/CookbooksListPage";
import { Cookbook, Recipe, Role } from "@/types/graphql";

export default function Cookbooks(){
    const backgroundColor = useThemeColor("background")
    const dummyRecipe: Recipe = {
          name: "Spaghetti",
          description: "A classic Italian pasta dish with a rich meat sauce.",
          ingredients: ["200g spaghetti", "300g ground beef", "1 onion, chopped"],
          prepTime: 15,
          cookTime: 45,
          isPublic: true,
          userId: 123,
          rating: 4.5,
          _count: {
            __typename: undefined,
            communities: 0,
            cookbook: 0
          },
          createdAt: undefined,
          id: "",
          ratingsCount: 0,
          updatedAt: undefined,
          user: {
            __typename: undefined,
            _count: {
              __typename: undefined,
              comments: 0,
              communities: 0,
              cookbooks: 0,
              recipes: 0
            },
            comments: undefined,
            communities: undefined,
            cookbooks: undefined,
            createdAt: undefined,
            email: "",
            id: "",
            image: undefined,
            mainCookbookId: undefined,
            name: undefined,
            password: "",
            recipes: undefined,
            role: Role.Admin,
            updatedAt: undefined,
            username: ""
          },
        };
    
        const dummyRecipes: Recipe[] = [dummyRecipe, dummyRecipe];
    
        const dummyCookbook: Cookbook = {
          name: "My Recipes",
          description: "A cookbook for all my recipes cookbook for all my recipes cookbook for all my recipes cookbook for all my recipes",
          recipes: [dummyRecipe],
          _count: {
            __typename: undefined,
            communities: 0,
            recipes: 0
          },
          createdAt: undefined,
          id: "",
          isMainCookbook: false,
          isPublic: false,
          ratingsCount: 0,
          updatedAt: undefined,
          user: {
            __typename: undefined,
            _count: {
              __typename: undefined,
              comments: 0,
              communities: 0,
              cookbooks: 0,
              recipes: 0
            },
            comments: undefined,
            communities: undefined,
            cookbooks: undefined,
            createdAt: undefined,
            email: "",
            id: "",
            image: undefined,
            mainCookbookId: undefined,
            name: undefined,
            password: "",
            recipes: undefined,
            role: Role.Admin,
            updatedAt: undefined,
            username: ""
          },
          userId: 0
        };
    
        const dummyCookbooks: Cookbook[] = [dummyCookbook] 

    return (
        <SafeAreaView style={{backgroundColor:backgroundColor, flex: 1}}>
            <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>My Cookbooks</ThemedText>
            <CookbooksListPage cookbooks={dummyCookbooks}/>
        </SafeAreaView>
    )
}