import { SafeAreaView, View, StyleSheet, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RecipeCard } from "@/components/RecipeCard";
import { Recipe, Role } from "@/types/graphql";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedScrollView } from "../ThemedScrollView";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/context";

const FETCH_TOP_RECIPES = gql`
    query TopRecipes($skip: Int! $first: Int!) {
        hpGetTopRecipes(skip: $skip first: $first) {
            id
            name
            image
            description
            ingredients
            directions
            cookTime
            prepTime
            rating
            isPublic
        }
    }
`;

const FETCH_RECENT_RECIPES = gql`
    query RecentRecipes($skip: Int! $first: Int!) {
        hpGetRecentRecipes(skip: $skip first: $first) {
            id
            name
            image
            description
            ingredients
            directions
            cookTime
            prepTime
            rating
            isPublic
        }
    }
`;

export default function HomePageRemodel() {
    const backgroundColor = useThemeColor("background");    
    const { userId } = useSession();
    const { data: topsData, loading: topsLoading, error: topsError, refetch: topsRefresh } = useQuery(FETCH_TOP_RECIPES, {
        variables: { skip: 0, first: 10 },
    });
    const { data: recentsData, loading: recentsLoading, error: recentsError, refetch: recentsRefresh } = useQuery(FETCH_RECENT_RECIPES, {
        variables: { skip: 0, first: 10 },
    });

    useEffect(
        useCallback(() => {
            if (userId) {
                console.log("Refetching recipes...");
                topsRefresh();
                recentsRefresh();
            }
        }, [userId, recentsRefresh])
    );

    return (
        <SafeAreaView style={{ backgroundColor, flex: 1 }}>
            <ThemedScrollView style={{paddingHorizontal: 20}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                <ThemedText style={{ 
                    fontWeight: 400, 
                    textAlign: 'center',
                    marginBottom: 10, 
                    padding: 10, 
                    fontSize: 25
                }}> Top Rated Recipes </ThemedText>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                        {topsData?.hpGetTopRecipes?.map((recipe: Recipe) => (
                            <ThemedView key={recipe.id} style={{ marginBottom: 10 }}>
                                <RecipeCard recipe={recipe} />
                            </ThemedView>
                        ))}
                    </ThemedView>
                </ThemedView>
                <ThemedText style={{ 
                    fontWeight: 400, 
                    textAlign: 'center',
                    marginBottom: 10,
                    marginTop: 10, 
                    padding: 10, 
                    fontSize: 25
                }}> Most Recent Recipes </ThemedText>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                        {recentsData?.hpGetRecentRecipes?.map((recipe: Recipe) => (
                            <ThemedView key={recipe.id} style={{ marginBottom: 10 }}>
                                <RecipeCard recipe={recipe} />
                            </ThemedView>
                        ))}
                    </ThemedView>
                </ThemedView>
            </ThemedScrollView>
        </SafeAreaView>
    )
}