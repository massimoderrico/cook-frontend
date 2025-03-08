import React, { useState } from "react";
import { ThemedScrollView } from "../ThemedScrollView";
import { Cookbook } from "@/types/graphql";
import { ThemedView } from "../ThemedView";
import { CustomButton } from "../CustomButton";
import { RecipeCard } from "../RecipeCard";
import { ThemedText } from "../ThemedText";

export const ViewCookbookPage = ({cookbook}: {cookbook: Cookbook}) => {
    return (
        <ThemedScrollView style={{paddingHorizontal: 20}} showsVerticalScrollIndicator={false}>
            <ThemedText style={{ 
                fontWeight: 700, 
                textAlign: 'center', 
                marginTop: 5, 
                paddingVertical: 10, 
                paddingHorizontal: 10, 
                fontSize: 35, 
                lineHeight: 35,
                }}>
                    {cookbook.name}
            </ThemedText>
            <ThemedText style={{ 
                fontWeight: 400, 
                textAlign: 'center',
                marginBottom: 10, 
                paddingVertical: 5, 
                fontSize: 20 
                }}>
                    {cookbook.description}
            </ThemedText>
            <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                    {cookbook.recipes?.map((recipe) => (
                        <ThemedView key={recipe.id} style={{ marginBottom: 10 }}>
                            <RecipeCard recipe={recipe} />
                        </ThemedView>
                    ))}
                </ThemedView>
            </ThemedView>
            <CustomButton text="Add Recipe" bgProps={{style: {marginVertical: 20}, onPress: () => console.log(cookbook.recipes?.length)}} />
        </ThemedScrollView>
    );
};