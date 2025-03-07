import { Cookbook } from "@/types/graphql";
import { ThemedScrollView } from "../ThemedScrollView";
import { ThemedView } from "../ThemedView";
import { CookbookCardSelection } from "../CookbookCardSelection";
import { CustomButton } from "../CustomButton";
import { ThemedText } from "../ThemedText";

export const AddRecipeToCookbooks = ({cookbooks}: {cookbooks: Cookbook[]}) => {
    return (
      <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false}>
        <ThemedText style={{
            fontWeight: 700, 
            textAlign: 'center', 
            marginTop: 5, 
            paddingVertical: 10, 
            paddingHorizontal: 10, 
            fontSize: 30, 
            lineHeight: 30,
        }}>
            Add Recipe to Cookbooks
        </ThemedText>
        <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
            {cookbooks.map((cookbook) => (
                <ThemedView key={cookbook.id} style={{ marginBottom: 10 }}>
                    <CookbookCardSelection cookbook={cookbook} />
                </ThemedView>
            ))}
        </ThemedView>
        <CustomButton text="Save Recipe" bgProps={{style: {marginVertical: 30}, onPress: () => console.log(cookbooks.length)}} />
      </ThemedScrollView>
    );
  };