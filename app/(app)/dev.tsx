import { SafeAreaView, View, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RecipeCard } from "@/components/RecipeCard";
import { Recipe, Role } from "@/types/graphql";
import Recipes from "./recipes";

export default function Dev() {
    const backgroundColor = useThemeColor("background")
    const recipe: Recipe = {
        id: '1',
        cookTime: 5,
        description: "simple recipe",
        createdAt: "2025-05-01",
        isPublic: false,
        name: "Fried Rice",
        ratingsCount: 4,
        rating : 0,
        updatedAt: "",
        user: {
            username: "maybegood7",
            id: "1",
            createdAt: "2025-01-01",
            email: "email@mail.ca",
            password: "password",
            role: Role.User,
            updatedAt : "2025-01-01",
            _count: {
                comments: 0,
                communities: 0,
                cookbooks: 0,
                recipes: 1
            }
        },
        userId: 1,
        _count: {
            communities: 0,
            cookbook: 0
        }
    }

    const recipes = [recipe, recipe, recipe, recipe]

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: backgroundColor
        },
        gridContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 10,
        },
        cardWrapper: {
            width: "43%",
            marginBottom: 10,
        }
    })
    return (
        <SafeAreaView
        style={styles.safeArea}>
            <View style={styles.gridContainer}>
                {recipes.map((recipe) => (
                    <View key={recipe.id} style={styles.cardWrapper}>
                        <RecipeCard recipe={recipe} />
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )

}