import React, { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedTextInput, ThemedTextInputProps } from "./ThemedTextInput";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { FlatList, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { CustomButton } from "./CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { Text } from "react-native";
import { Fonts } from "@/constants/Fonts";

type ThemedAdditiveTextInput = {
  inputArray: string[];
  setInputArray: any
  numbered?: boolean
  numberedPrefix?: string;
  textInputProps?: ThemedTextInputProps;
};

export const ThemedAdditveTextInput = (
    {
        inputArray, 
        setInputArray, 
        numbered,
        numberedPrefix= "",
        textInputProps : { style: textInputStyle, ...textInputRest } = {},
    } : ThemedAdditiveTextInput) => {
    const [textInputValue, setTextInputValue] = useState<string>("")
    const [displayError, setDisplayError] = useState<boolean>(false)

    const backgroundColor = useThemeColor('background', true)
    

    return (

        <ThemedView>
            {inputArray.map((item, index) => (
                <ThemedView key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
                    <ThemedText fontWeight={500}>
                        {numbered ? `${numberedPrefix}` + `${index+1}` + ".\n" : '\u2022'} 
                        {item}
                    </ThemedText>
                    <TouchableOpacity onPress={() => setInputArray(inputArray.filter((_, i) => i !== index))}>
                        <TabBarIcon name="close" size={22} color={backgroundColor} />
                    </TouchableOpacity>
                    
                </ThemedView>
            ))}
            <ThemedTextInput 
                placeholder= {textInputRest.placeholder}
                style={[{
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: Colors.primary, 
                }, 
                textInputStyle]}
                value={textInputValue} 
                onChangeText={setTextInputValue} 
                {...textInputRest}
                />
            <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{color: Colors.error, fontSize: 16, marginTop: 5, fontFamily: Fonts(600)}}>
                {displayError ? "Field cannot be empty" : ""}
            </Text>
            <CustomButton 
                text= "+ Add" 
                bgProps={{ 
                    style: { width: 80, height: 36, marginTop: 10},
                    onPress: () => {
                        if (textInputValue) {
                        setDisplayError(false)
                        setInputArray([...inputArray, textInputValue]);
                        setTextInputValue("");
                    }
                    else{
                        setDisplayError(true)
                    }} }}
                textProps={{
                    style: { fontSize: 20 }, 
                }}/>
            </ThemedView>    
        </ThemedView>
    )
}




