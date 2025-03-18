import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Cookbook, Permission, Recipe, Role } from "@/types/graphql";
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
        image
        description
        ingredients
        directions
        cookTime
        prepTime
        rating
        isPublic
      }
    }
  }
`;

const GET_PERMISSION = gql`
  query GetPermission($data: PermissionWhereInput!) {
    getPermission(data: $data) {
      resourceId
    }
  }
`;

const GET_COOKBOOKS_BY_IDS = gql`
  query GetCookbooksByIds($ids: [Float!]!) {
    getCookbooksByIds(ids: $ids) {
      id
      name
      description
      isPublic
      isMainCookbook
      rating
      recipes {
        id
        name
        image
        description
        ingredients
        directions
        cookTime
        prepTime
        rating
        isPublic
      }
    }
  }
`;


export default function Cookbooks(){
    const backgroundColor = useThemeColor("background");
    const router = useRouter();
    const { userId } = useSession();
    const { data: cookbookData, loading: cookbookLoading, error: cookbookError, refetch: cookbookUserRefetch } = useQuery(GET_USER_COOKBOOKS, {
      variables: { userId: Number(userId) }
    });
    const { data: permissionData, loading: permissionLoading, error: permissionError, refetch: permissionRefetch } = useQuery(GET_PERMISSION, {
      variables: { 
        data: {
          userId: { equals: Number(userId) },
          resourceType: { equals: "COOKBOOK" },
        }, 
      },
    });
    const { data: permissionCookbookData, loading: permissionCookbookLoading, error: permissionCookbookError, refetch: permissionCookbookRefetch } = useQuery(GET_COOKBOOKS_BY_IDS, {
      skip: !permissionData || !permissionData.getPermission.length,
      variables: {
        ids: permissionData?.getPermission.map((permission: Permission) => permission.resourceId) || [],
      },
    });

    const handleScroll = () => {
      if (window.scrollY === 0){
        cookbookUserRefetch();
        permissionRefetch();
        permissionCookbookRefetch();
      }
    };
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(
      useCallback(() => {
        if (userId) {
          console.log("Refetching cookbooks...");
          cookbookUserRefetch();
          permissionRefetch();
          permissionCookbookRefetch();
        }
      }, [userId, cookbookUserRefetch, permissionRefetch, permissionCookbookRefetch])
    );
    
    // Combine cookbooks from both sources
    const combinedCookbooks = [
      ...(cookbookData?.getUserCookbooks || []),
      ...(permissionCookbookData?.getCookbooksByIds || []),
    ];

    const handleCreateCookbook = () => {
      router.replace("/(app)/cookbooks/create-cookbook");
    };

    return (
        <SafeAreaView style={{backgroundColor:backgroundColor, flex: 1}}>
            <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>My Cookbooks</ThemedText>
            <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    {combinedCookbooks.map((cookbook: Cookbook) => (
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