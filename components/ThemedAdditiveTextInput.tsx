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

type ThemedAdditiveTextInput = {
  inputArray: string[];
  setInputArray: any
  numbered?: boolean
  textInputProps?: ThemedTextInputProps;
};

export const ThemedAdditveTextInput = (
    {
        inputArray, 
        setInputArray, 
        numbered,
        textInputProps : { style: textInputStyle, ...textInputRest } = {},
    } : ThemedAdditiveTextInput) => {
    const [textInputValue, setTextInputValue] = useState<string>("")
    const [displayError, setDisplayError] = useState<boolean>(false)

    const backgroundColor = useThemeColor('background', true)
    

    return (

        <ThemedView>
            {inputArray.map((item, index) => (
                <ThemedView key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15}}>
                    <ThemedText fontWeight={500} >{numbered ? "Step " + `${index+1}` + "." : '\u2022'} {item}</ThemedText>
                    <TouchableOpacity onPress={() => setInputArray(inputArray.filter((_, i) => i !== index))}>
                        <TabBarIcon name="close" size={22} color={backgroundColor} />
                    </TouchableOpacity>
                    
                </ThemedView>
            ))}
            <ThemedTextInput 
                placeholder= {textInputRest.placeholder}
                style={[{
                    paddingLeft: 10,
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: Colors.primary, 
                }, 
                textInputStyle]}
                value={textInputValue} 
                onChangeText={setTextInputValue} 
                {...textInputRest}
                />
            {displayError && <Text style={{color: Colors.error, fontSize: 16, marginTop: 5}}>
               "Please enter value"
            </Text>}
            <CustomButton 
                text= "+ Add" 
                bgProps={{ 
                    style: { width: 80, height: 36, marginTop: 10, alignSelf: "flex-end"},
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
    )
}




