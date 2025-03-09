import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Recipe } from "../types/graphql";
import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";

export const RecipeCardSelection = ({
    recipe,
    onSelect,
  }: {
    recipe: Recipe;
    onSelect: (recipeId: number, isSelected: boolean) => void;
  }) => { 
    const [isSelected, setSelection] = useState(false);

    const toggleSelection = () => {
        setSelection(!isSelected);
        onSelect(Number(recipe.id), !isSelected);
    };

    return (
        <ThemedView invertColors={true} 
            style={{ 
                alignItems: 'center',
                width: 170,
                borderRadius: 40,
                shadowColor: "#000", 
                shadowOffset: {
                    width: 0,
                    height: 5, 
                },
                shadowOpacity: 0.4, 
                shadowRadius: 10,
                elevation: 5,
                padding: 10,
            }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%", marginBottom: 10 }}>
                        <ThemedText invertColors={true} 
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                flexShrink: 1,
                                flexWrap: "wrap",
                                textAlign: "left",
                        }}>{recipe.name}</ThemedText>
                        <TouchableOpacity onPress={toggleSelection}>
                            <Ionicons
                                name={isSelected ? "checkbox" : "square-outline"}
                                size={27}
                                color={Colors.primary}
                            />
                        </TouchableOpacity>
                </View>
            {/* replace themed view with image below  */}
            <ThemedView style={{borderRadius: 30, height: 69, width: 147, backgroundColor: "red"}}/> 
            <View style={{
                flexDirection: 'row', 
                justifyContent: 'space-evenly',
                paddingVertical: 10,
                width: 170
                }}>
                <View style={{
                backgroundColor: Colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 20.
                }}>
                <Text style={{
                    color: "white", 
                    fontSize: 18
                    }}> 
                    {recipe.cookTime?.toString()} min
                </Text>
                </View>
                <View style={{
                backgroundColor: Colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 20
                }}>
                <Text style={{
                    color: "white", 
                    fontSize: 18
                    }}> 
                    {recipe.rating?.toString()} 
                </Text>
                </View>
            </View>
        </ThemedView>
    );
}