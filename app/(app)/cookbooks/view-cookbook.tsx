import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/context";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { RecipeCard } from "@/components/RecipeCard";
import { CustomButton } from "@/components/CustomButton";
import { useRouter } from "expo-router";

export default function ViewCookbook() {
  const { selectedCookbook } = useSession();
  const backgroundColor = useThemeColor("background");
  const router = useRouter();

  if (!selectedCookbook) {
    return <ThemedText>No Cookbook Found</ThemedText>;
  }

  const addRecipesToCookbook = () => {
    router.push({
      pathname: "/(app)/cookbooks/add-recipes-to-cookbook",
      params: {id: selectedCookbook.id},
    });
  }

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <ThemedScrollView style={{paddingHorizontal: 20}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                  <ThemedText style={{ 
                      fontWeight: 700, 
                      textAlign: 'center', 
                      marginTop: 5, 
                      paddingVertical: 10, 
                      paddingHorizontal: 10, 
                      fontSize: 35, 
                      lineHeight: 35,
                      }}>
                          {selectedCookbook.name}
                  </ThemedText>
                  <ThemedText style={{ 
                      fontWeight: 400, 
                      textAlign: 'center',
                      marginBottom: 10, 
                      paddingVertical: 5, 
                      fontSize: 20 
                      }}>
                          {selectedCookbook.description}
                  </ThemedText>
                  <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                      <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                          {selectedCookbook.recipes?.map((recipe) => (
                              <ThemedView key={recipe.id} style={{ marginBottom: 10 }}>
                                  <RecipeCard recipe={recipe} />
                              </ThemedView>
                          ))}
                      </ThemedView>
                  </ThemedView>
                  <CustomButton text="Add Recipes" bgProps={{style: {marginVertical: 20}, onPress: addRecipesToCookbook}} />
              </ThemedScrollView>
    </SafeAreaView>
  );
}
