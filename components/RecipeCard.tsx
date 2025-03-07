import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Recipe } from "../types/graphql";
import { View, Text, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

export const RecipeCard = ({recipe}: {recipe: Recipe}) => { 
  return (
    <ThemedView invertColors={true} 
      style={{ 
        alignItems: 'center',
        height: 170,
        width: 170,
        borderRadius: 40,
      }}>
      <ThemedText invertColors={true} 
      style={{
        paddingVertical: 10,
      }}>{recipe.name}</ThemedText>
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
            {recipe.rating.toString()} 
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}