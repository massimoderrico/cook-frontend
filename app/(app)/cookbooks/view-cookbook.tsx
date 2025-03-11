import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/context";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { RecipeCard } from "@/components/RecipeCard";
import { CustomButton } from "@/components/CustomButton";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { gql, useMutation } from "@apollo/client";

const DELETE_COOKBOOK = gql`
  mutation DeleteCookbook($cookbookId: Int!, $userId: Int!) {
    deleteCookbook(cookbookId: $cookbookId, userId: $userId)
  }
`;

export default function ViewCookbook() {
  const { selectedCookbook } = useSession();
  const { setSelectedCookbook } = useSession();
  const backgroundColor = useThemeColor("background");
  const router = useRouter();
  const { userId } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteCookbookMutation, { loading, data, error }] = useMutation(DELETE_COOKBOOK);

  if (!selectedCookbook) {
    return <ThemedText>No Cookbook Found</ThemedText>;
  }

  const addRecipesToCookbook = () => {
    setMenuVisible(false);
    router.push({
      pathname: "/(app)/cookbooks/add-recipes-to-cookbook",
      params: {id: selectedCookbook.id},
    });
  }

  const removeRecipesFromCookbook = () => {
    setMenuVisible(false);
    setSelectedCookbook(selectedCookbook);
    router.push({
      pathname: "/(app)/cookbooks/remove-recipes-from-cookbook",
      params: {id: selectedCookbook.id},
    });
  }
  
  const editCookbook = () => {
    setMenuVisible(false);
    setSelectedCookbook(selectedCookbook);
    router.push("/(app)/cookbooks/edit-cookbook");
  };

  const deleteCookbook = async () => {
    setMenuVisible(false);
    if (!userId) return;
    try {
      const { data } = await deleteCookbookMutation({
        variables: { 
          cookbookId: parseInt(selectedCookbook.id),
          userId 
        },
      });
      router.push("/(app)/cookbooks");
    } catch (err) {
      console.error("Error deleting cookbook:", err);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <ThemedView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10 }}>
      <ThemedText style={{ 
                      fontWeight: 700, 
                      textAlign: 'center', 
                      marginTop: 5, 
                      paddingVertical: 10, 
                      paddingHorizontal: 10, 
                      fontSize: 30, 
                      lineHeight: 30,
                      }}>
                          {selectedCookbook.name}
                  </ThemedText>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <ThemedText style={{ fontSize: 20 }}>⋮</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}
          onPress={() => setMenuVisible(false)}
        >
          <ThemedView style={{ padding: 20, borderRadius: 10, width: 200 }}>
            <TouchableOpacity onPress={editCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText>Edit Cookbook</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={addRecipesToCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText>Add Recipes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeRecipesFromCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText>Remove Recipes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText style={{color: "red"}}>Delete Cookbook</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </TouchableOpacity>
      </Modal>
      <ThemedScrollView style={{paddingHorizontal: 20}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                  <ThemedText style={{ 
                      fontWeight: 400, 
                      textAlign: 'center',
                      marginBottom: 10, 
                      paddingBottom: 10, 
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
