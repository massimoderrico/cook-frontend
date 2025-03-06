import { Recipe } from "@/types/graphql";
import { ThemedScrollView } from "../ThemedScrollView";
import { ThemedView } from "../ThemedView";
import { RecipeCardSelection } from "../RecipeCardSelection";
import { CustomButton } from "../CustomButton";
import { ThemedText } from "../ThemedText";

export const AddRecipesToCookbook = ({recipes}: {recipes: Recipe[]}) => {
    return (
      <ThemedScrollView style={{paddingHorizontal: 20}} showsVerticalScrollIndicator={false}>
        <ThemedText style={{
            fontWeight: 700, 
            textAlign: 'center', 
            marginTop: 5, 
            paddingVertical: 10, 
            paddingHorizontal: 10, 
            fontSize: 30, 
            lineHeight: 30,
        }}>
            Add Recipes to Cookbook
        </ThemedText>
        <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
            <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                {recipes.map((recipe) => (
                    <ThemedView key={recipe.id} style={{ marginBottom: 10 }}>
                        <RecipeCardSelection recipe={recipe} />
                    </ThemedView>
                ))}
            </ThemedView>
        </ThemedView>
        <CustomButton text="Save Cookbook" bgProps={{style: {marginVertical: 30}, onPress: () => console.log(recipes.length)}} />
      </ThemedScrollView>
    );
  };