import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Modal, StyleSheet, TouchableOpacity } from "react-native"
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "expo-router";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Colors } from "@/constants/Colors";

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($recipeId: Int!, $userId: Int!) {
    deleteRecipe(recipeId: $recipeId, userId: $userId)
  }
`;

const UPDATE_RECIPE_RATING = gql`
  mutation UpdateRecipeRating($recipeId: Int!, $rating: Float!) {
    updateRecipeRating(recipeId: $recipeId, rating: $rating) {
      id
      rating
    }
  }
`;

export default function ViewRecipe () {
    const { selectedRecipe } = useSession();
    const { setSelectedRecipe } = useSession();
    const router = useRouter();
    const { userId } = useSession();
    const [menuVisible, setMenuVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [rating, setRating] = useState("");
    const [deleteRecipeMutation] = useMutation(DELETE_RECIPE);
    const [updateRecipeRating] = useMutation(UPDATE_RECIPE_RATING);

    if (!selectedRecipe) {
        return <ThemedText>No Recipe Found</ThemedText>;
    };

    const addRecipeToCookbooks = () => {
        setMenuVisible(false);
        router.push({
            pathname: "/(app)/create-recipe/add-recipe-to-cookbooks",
            params: {id: selectedRecipe.id},
        });
    };

    const addRating = () => {
        setMenuVisible(false);
        setRatingModalVisible(true);
    };

    const submitRating = async () => {
        if (!rating || isNaN(parseFloat(rating))) return;

        try {
            const { data } = await updateRecipeRating({
                variables: {
                    recipeId: parseInt(selectedRecipe.id),
                    rating: parseFloat(rating),
                },
            });
            if (data?.updateRecipeRating) {
                setSelectedRecipe({
                    ...selectedRecipe,
                    rating: data.updateRecipeRating.rating,
                });
                setRatingModalVisible(false);
                setRating("");
            }
        } catch (err) {
            console.error("Error updating rating:", err);
        }
    };
      
    const editRecipe = () => {
        setMenuVisible(false);
        setSelectedRecipe(selectedRecipe);
        router.push("/(app)/create-recipe/edit-recipe");
    };
    
    const deleteRecipe = async () => {
        setMenuVisible(false);
        if (!userId) return;
        try {
            const { data } = await deleteRecipeMutation({
                variables: { 
                    recipeId: parseInt(selectedRecipe.id),
                    userId 
                },
            });
        router.push("/(app)/cookbooks");
        } catch (err) {
            console.error("Error deleting recipe:", err);
        }
    };

    return (
            <SafeAreaView style={{flex: 1, backgroundColor: useThemeColor('background') }}>
                {/* Rating Modal */}
            <Modal
                visible={ratingModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setRatingModalVisible(false)}
            >
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}
                    onPress={() => setRatingModalVisible(false)}
                >
                    <ThemedView style={{ padding: 20, borderRadius: 10, width: 200 }}>
                        <ThemedText style={{ fontSize: 20, marginBottom: 10 }}>Enter Rating (1-5)</ThemedText>
                        <ThemedTextInput
                            value={rating}
                            onChangeText={setRating}
                            keyboardType="numeric"
                            placeholder="e.g. 4.5"
                            style={{ height: 70, padding: 5, borderWidth: 1, borderColor: "#ddd", borderRadius: 5 }}
                        />
                        <TouchableOpacity onPress={submitRating} style={{ marginTop: 10, padding: 10, backgroundColor: Colors.primary, borderRadius: 15 }}>
                            <ThemedText style={{ color: "white", textAlign: "center" }}>Submit</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </TouchableOpacity>
            </Modal>
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
                                          {selectedRecipe.name}
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
                          <TouchableOpacity onPress={addRecipeToCookbooks} style={{ paddingVertical: 10 }}>
                              <ThemedText>Add to Cookbook</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={editRecipe} style={{ paddingVertical: 10 }}>
                              <ThemedText>Edit Recipe</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={addRating} style={{ paddingVertical: 10 }}>
                              <ThemedText>Add rating</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={deleteRecipe} style={{ paddingVertical: 10 }}>
                              <ThemedText style={{color: "red"}}>Delete Recipe</ThemedText>
                            </TouchableOpacity>
                          </ThemedView>
                        </TouchableOpacity>
                      </Modal>
                <ThemedScrollView style={{paddingHorizontal: 10}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                    <ThemedText style={{marginLeft: 10}}>
                        {selectedRecipe.description}
                    </ThemedText>
        
                    {/* Details Section */}
                    <ThemedText style={{ marginLeft: 10, fontSize: 27, marginTop: 20, paddingVertical: 10}}>
                        Details
                    </ThemedText>
                    <ThemedView style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <ThemedView style={{marginLeft: 10}}>
                        {/* Rating */}
                        <ThemedView style={styles.bubble}>
                            <ThemedView style = {styles.circle}>
                                <ThemedText style={styles.number}>{selectedRecipe.rating}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.label}>Rating</ThemedText>
                        </ThemedView>
                        {/* Cook Time */}
                        <ThemedView style={styles.bubble}>
                            <ThemedView style = {styles.circle}>
                                <ThemedText style={styles.number}>{selectedRecipe.cookTime}</ThemedText>
                            </ThemedView>
                            <ThemedView style={{flexDirection: "column"}}>
                                <ThemedText style={styles.label}>Cook Time</ThemedText>
                                <ThemedText style={styles.unit}>minutes</ThemedText>
                            </ThemedView>
                        </ThemedView> 
                        {/* Prep Time */}
                        <ThemedView style={styles.bubble}>
                            <ThemedView style = {styles.circle}>
                                <ThemedText style={styles.number}>{selectedRecipe.prepTime}</ThemedText>
                            </ThemedView>
                            <ThemedView style={{flexDirection: "column"}}>
                                <ThemedText style={styles.label}>Prep Time</ThemedText>
                                <ThemedText style={styles.unit}>minutes</ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                    <ThemedView style={{marginRight: 10, marginTop: 10, borderRadius: 30, height: 145, width: 145, backgroundColor: "red"}}/> 
                    </ThemedView>
        
                    <ThemedView style={{marginLeft: 10}}>

                        {/* Ingredients Section */}
                        <ThemedText style={{ fontSize: 27, marginTop: 20, paddingVertical: 10}}>Ingredients</ThemedText>
                        <ThemedView style={{flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'space-between', width: '100%'}}>
                            {selectedRecipe.ingredients?.map((ingredient, index) => (
                                <ThemedView key={index} style={{ marginBottom: 10 }}>
                                    <ThemedText >   • {ingredient}</ThemedText>
                                </ThemedView>
                            ))}
                        </ThemedView>

            
                        {/* Directions Section */}
                        <ThemedText style={{ fontSize: 27, marginTop: 20, paddingVertical: 10}}>Directions</ThemedText>
                        <ThemedView style={{flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'space-between', width: '100%'}}>
                            {selectedRecipe.directions?.map((direction, index) => (
                                <ThemedView key={index} style={{ marginBottom: 10 }}>
                                    <ThemedText >   {index+1}- {direction}</ThemedText>
                                </ThemedView>
                            ))}
                        </ThemedView>
                    </ThemedView>
                </ThemedScrollView>
            </SafeAreaView>
        );
    
}

const styles = StyleSheet.create({
    bubble: {
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1F1F1F", // Dark background
      borderRadius: 30, // Oval shape
      paddingVertical: 8,
      paddingHorizontal: 15,
      width: 185, // Adjust as needed
      maxHeight: 63,
      justifyContent: "flex-start",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3, // Shadow for Android
    },
    circle: {
      width: 50,
      height: 40,
      borderRadius: 20, // Makes it a perfect circle
      backgroundColor: "#FFF", // White background
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    number: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1F1F1F", // Dark text color
    },
    textContainer: {
      flexDirection: "column",
    },
    label: {
      fontSize: 20,
      backgroundColor: "#1F1F1F",
      textAlign: 'center',
      fontWeight: "600",
      color: "#FFF", // White text
    },
    unit: {
      fontSize: 12,
      backgroundColor: "#1F1F1F",
      color: "#DDD", // Lighter text for units
      textAlign: "center",
    },
  });