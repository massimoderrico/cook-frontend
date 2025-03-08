import React, { useState } from "react";
import { ThemedScrollView } from "../ThemedScrollView";
import { CookbookCard } from "@/components/CookbookCard";
import { Cookbook } from "@/types/graphql";
import { ThemedView } from "../ThemedView";
import { CustomButton } from "../CustomButton";
import { useRouter } from "expo-router";

export const CookbooksListPage = ({cookbooks}: {cookbooks: Cookbook[]}) => {
    const router = useRouter();

    const handleCreateCookbook = () => {
      router.push("/(app)/cookbooks/create-cookbook");
    };

    return (
      <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false}>
        <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
            {cookbooks.map((cookbook) => (
                <ThemedView key={cookbook.id} style={{ marginBottom: 10 }}>
                    <CookbookCard cookbook={cookbook} />
                </ThemedView>
            ))}
        </ThemedView>
        <CustomButton text="Create New Cookbook" bgProps={{style: {marginVertical: 30}, onPress: handleCreateCookbook}} />
      </ThemedScrollView>
    );
  };