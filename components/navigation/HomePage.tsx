import { SafeAreaView, View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RecipeCard } from "@/components/RecipeCard";
import { Recipe, Role } from "@/types/graphql";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedScrollView } from "../ThemedScrollView";

const FETCH_RECIPES = gql`
    query TopRecipes {
        hpGetTopRecipes(first: 20) {
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
    const screenWidth = Dimensions.get("screen").width;
    const cardMargin = 20;
    const numColumns = 2;

    const cardWidth = (screenWidth - (numColumns + 1) * cardMargin) / numColumns;

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
            padding: cardMargin,
        },
        cardWrapper: {
            width: cardWidth,
            margin: cardMargin / 2,
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
            <ThemedText style={styles.titleText}>Home</ThemedText>
            <FlatList
                    data={data?.hpGetTopRecipes}
                    keyExtractor={(recipe) => recipe.id}
                    numColumns={numColumns}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({item}) => (
                        <ThemedView key={item.id} style={styles.cardWrapper}>
                            <RecipeCard recipe={item}/>
                        </ThemedView>
                    )}
                    contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: cardMargin}}
                />
        </SafeAreaView>
    )
}