import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Recipe } from "../types/graphql";
import { View, Text, useColorScheme, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";


export const RecipeCard = ({recipe}: {recipe: Recipe}) => {
  // const image = recipe.image? recipe.image : require('../assets/images/icon.png');
  
  return (
    <ThemedView invertColors={true} 
      style={{ 
        alignItems: 'center',
        width: 170,
        borderRadius: 40,
        paddingVertical: 10,
        shadowColor: useThemeColor("text"),
        shadowOffset: {
          width: 5,
          height: 5, 
        },
        shadowOpacity: 0.4, 
        shadowRadius: 10,
        elevation: 5,
      }}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <ThemedText
          invertColors={true}
          style={{
            textAlign: "center",
            paddingBottom: 10,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {recipe.name}
        </ThemedText>
      </View>
      {/* replace themed view with image below  */}
      <ThemedView style={{borderRadius: 30, height: 69, width: 147, backgroundColor: "red"}}/> 
      {/* <Image source={{uri: require('../assets/images/icon.png')}} style={{borderRadius: 30, height: 69, width: 147}}/>  */}
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
            {recipe.rating} 
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}