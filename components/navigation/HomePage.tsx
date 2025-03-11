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
            width: "42%",
            marginBottom: 15,
        },
        safeArea: {
            backgroundColor:backgroundColor, 
            flex: 1
        }
    })
    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>Home</ThemedText>
                <FlatList
                    data={data?.hpGetTopRecipes}
                    keyExtractor={(recipe) => recipe.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "center" }}
                    renderItem={({item}) => (
                        <ThemedView key={item.id} style={styles.cardWrapper}>
                            <RecipeCard recipe={item}/>
                        </ThemedView>
                    )}
                />
    </SafeAreaView>
    )
}