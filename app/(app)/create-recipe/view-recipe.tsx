import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native"
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context";

export default function ViewRecipe () {
    const { selectedRecipe } = useSession();

    if (!selectedRecipe) {
        return <ThemedText>No Recipe Found</ThemedText>;
    }

    return (
            <SafeAreaView style={{flex: 1, backgroundColor: useThemeColor('background') }}>
                <ThemedView>
                    <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", marginLeft: 15}}>{selectedRecipe.name}</ThemedText>
                    <ThemedText style={{marginLeft: 15}}>
                        Hi! I am the description for a delicious butter chicken recipe! 😊
                    </ThemedText>
        
                    {/* Details Section */}
                    <ThemedView style={{marginLeft: 15}}>
                        <ThemedText style={{ fontSize: 27, marginTop: 20}}>
                            Details
                        </ThemedText>
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
                                <ThemedText style={styles.unit}>hours</ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
        
                    <ThemedView style={{marginLeft: 15}}>

                        {/* Ingredients Section */}
                        <ThemedText style={{ fontSize: 27, marginTop: 20}}>Ingredients</ThemedText>
                        <ThemedView style={{flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'space-between', width: '100%'}}>
                            {selectedRecipe.ingredients?.map((ingredient, index) => (
                                <ThemedView key={index} style={{ marginBottom: 10 }}>
                                    <ThemedText >• {ingredient}</ThemedText>
                                </ThemedView>
                            ))}
                        </ThemedView>

            
                        {/* Directions Section */}
                        <ThemedText style={{ fontSize: 27, marginTop: 20}}>Directions</ThemedText>
                        <ThemedView style={{flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'space-between', width: '100%'}}>
                            {selectedRecipe.directions?.map((direction, index) => (
                                <ThemedView key={index} style={{ marginBottom: 10 }}>
                                    <ThemedText >{index+1}- {direction}</ThemedText>
                                </ThemedView>
                            ))}
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </SafeAreaView>
        )
    
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
      width: 200, // Adjust as needed
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