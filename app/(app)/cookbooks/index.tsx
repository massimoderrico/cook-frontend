import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Cookbook, Recipe, Role } from "@/types/graphql";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useFocusEffect, useRouter, useSegments } from "expo-router";
import { useSession } from "@/context";
import { useCallback, useEffect, useState } from "react";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { CustomButton } from "@/components/CustomButton";
import { CookbookCard } from "@/components/CookbookCard";

const GET_USER_COOKBOOKS = gql`
  query GetUserCookbooks($userId: Float!) {
    getUserCookbooks(userId: $userId) {
      id
      name
      description
      isPublic
      isMainCookbook
      rating
      recipes {
        id
        name
        ingredients
      }
    }
  }
`;


export default function Cookbooks(){
    const backgroundColor = useThemeColor("background");
    const router = useRouter();
    const { userId } = useSession();
    const { data, loading, error, refetch } = useQuery(GET_USER_COOKBOOKS, {
      variables: { userId: Number(userId) }
    });
    
    useEffect(
      useCallback(() => {
        if (userId) {
          console.log("Refetching cookbooks...");
          refetch();
        }
      }, [userId])
    );

    const handleCreateCookbook = () => {
      router.push("/(app)/cookbooks/create-cookbook");
    };

    return (
        <SafeAreaView style={{backgroundColor:backgroundColor, flex: 1}}>
            <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>My Cookbooks</ThemedText>
            <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    {data?.getUserCookbooks.map((cookbook: Cookbook) => (
                        <ThemedView key={cookbook.id} style={{ marginBottom: 10 }}>
                            <CookbookCard cookbook={cookbook} />
                        </ThemedView>
                    ))}
                </ThemedView>
                <CustomButton text="Create New Cookbook" bgProps={{style: {marginVertical: 30}, onPress: handleCreateCookbook}} />
             </ThemedScrollView>
        </SafeAreaView>
    )
}