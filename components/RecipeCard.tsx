import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Recipe } from "../types/graphql";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { useSession } from "@/context";

export const RecipeCard = ({recipe}: {recipe: Recipe}) => {
  const router = useRouter();
  const { setSelectedRecipe } = useSession();

  const handlePress = () => {
    setSelectedRecipe(recipe);
    router.push({
        pathname: "/(app)/cookbooks/view-recipe",
        params: {id: recipe.id},
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
    <ThemedView invertColors={true} 
      style={{ 
        alignItems: 'center',
        width: 170,
        borderRadius: 40,
        paddingVertical: 10,
        shadowColor: useThemeColor("text"),
        shadowOffset: {
          width: 2,
          height: 2, 
        },
        shadowOpacity: 0.4, 
        shadowRadius: 5,
        elevation: 5,
      }}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <ThemedText
          invertColors={true}
          numberOfLines={2} // Ensures at most 2 lines
          ellipsizeMode="tail" // Adds "..." if text is too long
          style={{
            textAlign: "center",
            paddingBottom: 10,
            paddingTop: 5,
            flexWrap: "wrap",
            width: "95%",
            paddingHorizontal: 10,
            height: 40, // Ensure uniform height
          }}
        >
          {recipe.name}
        </ThemedText>
      </View>
      {/* replace themed view with image below  */}
      <Image source={{ uri: recipe.image || undefined }} style={{borderRadius: 30, height: 69, width: 147}}/> 
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
            {recipe?.cookTime} min
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
    </TouchableOpacity>
  );
}