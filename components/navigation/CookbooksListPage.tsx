import React, { useState } from "react";
import { ThemedScrollView } from "../ThemedScrollView";
import { CookbookCard } from "@/components/CookbookCard";
import { Cookbook } from "@/types/graphql";
import { ThemedTextInput } from "../ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { KeyboardAvoidingView, Switch } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomButton } from "../CustomButton";

export const CookbooksListPage = ({cookbooks}: {cookbooks: Cookbook[]}) => {
    return (
      <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false}>
        <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
            {cookbooks.map((cookbook) => (
                <ThemedView key={cookbook.id} style={{ marginBottom: 10 }}>
                    <CookbookCard cookbook={cookbook} />
                </ThemedView>
            ))}
        </ThemedView>
        <CustomButton text="Create New Cookbook" bgProps={{style: {marginVertical: 30}, onPress: () => console.log(cookbooks.length)}} />
      </ThemedScrollView>
    );
  };