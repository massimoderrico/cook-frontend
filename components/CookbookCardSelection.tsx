import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Cookbook } from "@/types/graphql";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CookbookCardSelection = ({
    cookbook,
    onSelect,
  }: {
    cookbook: Cookbook;
    onSelect: (cookbookId: number, isSelected: boolean) => void;
  }) => {
    const [isSelected, setSelection] = useState(false);

    const toggleSelection = () => {
        setSelection(!isSelected);
        onSelect(Number(cookbook.id), !isSelected);
    };

    return (
        <ThemedView invertColors={true}
            style={{
                alignItems: "center",
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
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ThemedText invertColors={true}
                    style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        margin: 5,
                        flexWrap: "wrap",
                        textAlign: "left",
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
                        alignSelf: "flex-start",
                    }}>
                    <ThemedText style={{ color: "white", fontSize: 21 }}>
                        {cookbook.recipes?.length} Recipes
                    </ThemedText>
                </View>
            </View>
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