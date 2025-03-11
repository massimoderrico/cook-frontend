import { SafeAreaView, View, StyleSheet, FlatList } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RecipeCard } from "@/components/RecipeCard";
import { Recipe, Role } from "@/types/graphql";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedScrollView } from "../ThemedScrollView";

const FETCH_RECIPES = gql`
    query TopRecipes {
        hpGetTopRecipes {
            id
            name
            description
            ingredients
            directions
            prepTime
            cookTime
            rating
            image
        }
    }
`;

export default function HomePage() {
    const backgroundColor = useThemeColor("background");
    const {data, loading, error}= useQuery(FETCH_RECIPES)
    
    if (loading) {
        console.log("We are Loading....")
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText>Error: {error.message}</ThemedText>
            </View>
        )
    }

    const styles = StyleSheet.create({
        gridContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
        },
        cardWrapper: {
            marginBottom: 15,
            marginHorizontal: 10,
        },
        safeArea: {
            backgroundColor:backgroundColor, 
            flex: 1
        },
        titleText: { 
            padding: 20,
            fontSize: 30, 
            fontWeight: "bold", 
            textAlign: 'center'
        },
        scrollView: {
            paddingHorizontal: 10,
        },
        contentContainer: {
            flexGrow: 1,
            paddingBottom: 100,
        }
    })
    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedText style={styles.titleText}>Homme</ThemedText>
            <ThemedScrollView style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <ThemedView style={styles.gridContainer}>
                    {data?.hpGetTopRecipes.map((recipe: Recipe) => (
                        <ThemedView key={recipe.id} style={styles.cardWrapper}>
                            <RecipeCard recipe={recipe}/>
                        </ThemedView>
                    ))}
                </ThemedView>
            </ThemedScrollView>
        </SafeAreaView>
    )
}