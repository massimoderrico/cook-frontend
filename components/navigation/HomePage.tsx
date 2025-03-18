import { SafeAreaView, View, StyleSheet, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RecipeCard } from "@/components/RecipeCard";
import { Recipe, Role } from "@/types/graphql";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedScrollView } from "../ThemedScrollView";
import { useEffect, useState } from "react";

const FETCH_RECIPES = gql`
    query TopRecipes($skip: Int! $first: Int!) {
        hpGetTopRecipes(skip: $skip first: $first) {
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

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [skip, setSkip] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [reachedEnd, setReachedEnd] = useState(false)
    
    //Fetch recipes lazily
    const [fetchRecipes, { loading, data, error }] = useLazyQuery(FETCH_RECIPES, { 
        fetchPolicy: "network-only",
        onError: (err) => console.error("GraphQL Error:", err.message),
    });    
    

    useEffect(() => {
        console.log("we are fetchRecipes at first")
        fetchRecipes({variables: {skip: 0, first: 10}});
    }, []);

    useEffect(() => {
        if (data?.hpGetTopRecipes) {
            console.log("data received: ",data?.hpGetTopRecipes)
            setRecipes((prev) => [...prev, ...data.hpGetTopRecipes]); // Append new recipes
        }
    }, [data]);

    const loadMoreRecipes = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        const newSkip = skip + recipes.length;
        console.log("we are skipping new recipes");
        fetchRecipes({
            variables: { skip: newSkip, first: 10}
        })
        .then(() => {
            if (!data?.hpGetTopRecipes) {
                console.log("No more recipes to load");
            }
            
        })
        .finally(() => {
            setSkip(newSkip);
            setLoadingMore(false);
        })
    };


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
                    data={recipes}
                    keyExtractor={(recipe) => recipe.id}
                    numColumns={numColumns}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({item}) => (
                        <ThemedView key={item.id} style={styles.cardWrapper}>
                            <RecipeCard recipe={item}/>
                        </ThemedView>
                    )}
                    contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: cardMargin}}
                    onEndReached={loadMoreRecipes}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null} // Show loading indicator 
                />
        </SafeAreaView>
    )
}