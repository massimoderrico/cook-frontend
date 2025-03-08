import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Cookbook } from "@/types/graphql";
import { useRouter } from "expo-router";
import { useSession } from "@/context";

export const CookbookCard = ({cookbook}: {cookbook: Cookbook}) => {
    const router = useRouter();
    const { setSelectedCookbook } = useSession();  // Access the context to set the cookbook

    const handlePress = () => {
        setSelectedCookbook(cookbook);
        router.push({
            pathname: "/(app)/cookbooks/view-cookbook",
            params: {id: cookbook.id},
        });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
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
            <View style={{ width: "70%" }}>
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
            </View>
            <View
                style={{
                    backgroundColor: Colors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                }}>
                <ThemedText style={{ color: "white", fontSize: 21 }}>
                    {cookbook.recipes?.length} Recipes
                </ThemedText>
            </View>
        </ThemedView>
        </TouchableOpacity>
    )
}