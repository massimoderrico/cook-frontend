import React, { useState } from "react";
import { ThemedScrollView } from "../ThemedScrollView";
import { ThemedTextInput } from "../ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { KeyboardAvoidingView, Switch } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomButton } from "../CustomButton";
import { gql, useMutation } from '@apollo/client';
import { useRouter } from "expo-router";
import { useSession } from "@/context";

const CREATE_COOKBOOK = gql`
    mutation CreateCookbook($data: CookbookCreateInput!) {
        createCookbook(data: $data) {
            id
            name
            description
        }
    }
`;

export const CreateCookbookPage = ( ) => {
    const [cookbookName, onChangeCookbookName ] = useState<string>();
    const [description, onChangeDescription ] = useState<string>();
    const [isPublic, setIsPublic ] = useState<boolean>(false);

    const { userId } = useSession();
    const router = useRouter();
    const [createCookbook, { loading, data, error }] = useMutation(CREATE_COOKBOOK);

    const handleSaveCookbook = async () => { 
        if (!userId) return;
        try {
          const { data } = await createCookbook({
            variables: {
              data: {
                name: cookbookName,
                description,
                isPublic,
                user: { connect: { id: userId } },
              },
            },
          });
          console.log("Cookbook created:", data);
          if (data?.createCookbook) {
            router.push({
                pathname: "/(app)/cookbooks/add-recipes",
                params: {id: data.id},
            });
          }
        } catch (err) {
          console.error("Error creating cookbook:", err);
        }
    };

    return (
        <KeyboardAvoidingView behavior="position" >
        <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} >
            <ThemedTextInput 
            placeholder="Cookbook Name" 
            value={cookbookName} 
            onChangeText={onChangeCookbookName}
            style={{marginTop: 20,
                borderWidth: 2,
                borderColor: Colors.primary,
                paddingLeft: 10
            }}
            />
            <ThemedTextInput 
            placeholder="Description" 
            value={description} 
            multiline={true}
            onChangeText={onChangeDescription}
            style={{marginVertical: 10,
                borderWidth: 2,
                borderColor: Colors.primary,
                paddingLeft: 10,
                height: 100 
            }}
            />
            <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedText fontWeight={500} >
                        Public Recipe
                    </ThemedText>
                </ThemedView>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center', }}>
                    <Switch
                        trackColor={{false: useThemeColor("background"), true: Colors.primary}}
                        thumbColor={isPublic ? useThemeColor('background', true) : useThemeColor("background")}
                        onValueChange={setIsPublic}
                        value={isPublic}
                    />
                </ThemedView>       
            </ThemedView>    
            <CustomButton text="Save Cookbook" bgProps={{style: {marginVertical: 30}, onPress: () => {handleSaveCookbook()}}} />
        </ThemedScrollView>
        </KeyboardAvoidingView>
    )
}