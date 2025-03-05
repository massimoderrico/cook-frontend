import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Cookbook } from "@/types/graphql";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CookbookCardSelection = ({cookbook}: {cookbook: Cookbook}) => {
    const [isSelected, setSelection] = useState(false);

    const toggleSelection = () => {
        setSelection(!isSelected);
    };

    return (
        <ThemedView invertColors={true}
            style={{
                alignItems: "center",
                height: 100,
                width: 370,
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
                shadowColor: "#000", 
                shadowOffset: {
                    width: 0,
                    height: 5, 
                },
                shadowOpacity: 0.4, 
                shadowRadius: 10,
                elevation: 5,
            }}>
            <ThemedView invertColors={true}>
                <ThemedText invertColors={true}
                    style={{ 
                        fontSize: 25, 
                        fontWeight: "bold",
                        margin: 5 
                    }}>
                        {cookbook.name}
                </ThemedText>
                <View
                    style={{
                        backgroundColor: Colors.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        borderRadius: 20,
                        width: 125,
                    }}>
                    <ThemedText style={{ color: "white", fontSize: 21 }}>
                        {cookbook.recipes?.length} Recipes
                    </ThemedText>
                </View>
            </ThemedView>
            <TouchableOpacity onPress={toggleSelection}>
                <Ionicons
                    name={isSelected ? "checkbox" : "square-outline"}
                    size={35}
                    color={Colors.primary}
                />
            </TouchableOpacity>
        </ThemedView>
    )
}