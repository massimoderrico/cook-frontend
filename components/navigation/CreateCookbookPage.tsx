import React, { useState } from "react";
import { ThemedScrollView } from "../ThemedScrollView";
import { ThemedTextInput } from "../ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { KeyboardAvoidingView, Switch } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomButton } from "../CustomButton";

export const CreateCookbookPage = ( ) => {
    const [cookbookName, onChangeCookbookName ] = useState<string>()
    const [description, onChangeDescription ] = useState<string>()
    const [isPublic, setIsPublic ] = useState<boolean>(false)

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
            <CustomButton text="Save Cookbook" bgProps={{style: {marginVertical: 30}, onPress: () => console.log(cookbookName)}} />
        </ThemedScrollView>
        </KeyboardAvoidingView>
    )
}