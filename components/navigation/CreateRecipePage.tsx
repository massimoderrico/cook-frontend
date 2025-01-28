import React, { useState } from "react";
import { ThemedScrollView } from "../ThemedScrollView";
import { ThemedTextInput } from "../ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { InputAccessoryView, KeyboardAvoidingView, SafeAreaView, Switch } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomButton } from "../CustomButton";
import { ThemedAdditveTextInput } from "../ThemedAdditiveTextInput";
import { ThemedIngredientAdditveTextInput } from "../ThemedIngredientAdditiveTextInput";
import { SafeAreaProvider } from "react-native-safe-area-context";
export const CreateRecipePage = ( ) => {
    const [recipeName, onChangeRecipeName ] = useState<string>()
    const [description, onChangeDescription ] = useState<string>()
    const [prepTime, onChangePrepTime ] = useState<string>()
    const [cookTime, onChangeCookTime ] = useState<string>()
    const [isPublic, setIsPublic ] = useState<boolean>(false)
    const [ingredients, setIngredients] = useState<string[]>([])
    const [directions, setDirections] = useState<string[]>([])
    const inputAccessoryViewID = 'uniqueID';

    return (
        <KeyboardAvoidingView behavior="position" >
        <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} >
            <ThemedTextInput 
            placeholder="Recipe Name" 
            value={recipeName} 
            onChangeText={onChangeRecipeName}
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
            <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedText fontWeight={500} >
                        Prepration Time
                    </ThemedText>
                </ThemedView>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center', }}>
                    <ThemedTextInput 
                        placeholder="30 mins" 
                        value={prepTime} 
                        onChangeText={onChangePrepTime} 
                        style={{
                            paddingLeft: 10,
                            paddingHorizontal: 10,
                            borderWidth: 2,
                            borderColor: Colors.primary,
                            
                        }}
                    />
                </ThemedView>       
            </ThemedView>
            <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedText fontWeight={500}>
                        Cook Time
                    </ThemedText>
                </ThemedView>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center', }}>
                    <ThemedTextInput 
                        placeholder="30 mins" 
                        value={cookTime} 
                        onChangeText={onChangeCookTime} 
                        style={{
                            paddingLeft: 10,
                            paddingHorizontal: 10,
                            borderWidth: 2,
                            borderColor: Colors.primary,
                            
                        }}
                    />
                </ThemedView>       
            </ThemedView>
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
            <ThemedText type= {"subtitle"} fontWeight={700} style={{marginTop: 30}}>
                Ingredients
            </ThemedText>
            <ThemedIngredientAdditveTextInput inputArray={ingredients} setInputArray={setIngredients}/>
            <ThemedText type= {"subtitle"} fontWeight={700} style={{marginTop: 30}}>
                Directions
            </ThemedText>
            
            <ThemedAdditveTextInput textInputProps={{placeholder: "Add vanilla to cake batter"}} inputArray={directions} setInputArray={setDirections} numbered numberedPrefix="Step "/>
            <CustomButton text="Save Recipe" bgProps={{style: {marginVertical: 30}, onPress: () => console.log(ingredients)}} />
            
        </ThemedScrollView>
        </KeyboardAvoidingView>
    )
}




