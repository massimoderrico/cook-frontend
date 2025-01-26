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
import { ThemedDropdown } from "./ThemedDropdown";
import { MeasurementTypes } from "@/types/graphql";

type ThemedIngredientAdditiveTextInput = {
  inputArray: string[];
  setInputArray: any
  numbered?: boolean
  textInputProps?: ThemedTextInputProps;
};

export const ThemedIngredientAdditveTextInput = (
    {
        inputArray, 
        setInputArray, 
        numbered,
        textInputProps : { style: textInputStyle, ...textInputRest } = {},
    } : ThemedIngredientAdditiveTextInput) => {

    const [measurement, setMeasurement] = useState<string>()
    const [measurementType, setMeasurementType] = useState<string>(MeasurementTypes[0].value)
    const [ingredient, setIngredient] = useState<string>("")
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
            <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20}}>
                    <ThemedTextInput 
                            placeholder="3" 
                            value={measurement} 
                            onChangeText={setMeasurement} 
                            keyboardType="numeric"
                            style={{
                                textAlign: "center",
                                flex: 1,
                                paddingLeft: 10,
                                paddingHorizontal: 10,
                                borderWidth: 2,
                                borderColor: Colors.primary,
                                
                            }}
                        />
        
                    <ThemedDropdown
                        textAlign="center" 
                        data={MeasurementTypes} 
                        labelField={"label"} 
                        valueField={"value"} 
                        onChange={(item) => setMeasurementType(item.value)}
                        style={{ flex: 2, paddingLeft: 10}}
                        value={MeasurementTypes[0].value}
                        maxHeight={225}
                    />
                    <ThemedTextInput 
                        placeholder="vanilla" 
                        value={ingredient} 
                        onChangeText={setIngredient} 
                        style={{
                            flex: 4,
                            paddingLeft: 10,
                            paddingHorizontal: 10,
                            borderWidth: 2,
                            borderColor: Colors.primary,                         
                        }}
                    />
                   
            </ThemedView>
            {displayError && <Text style={{color: Colors.error, fontSize: 16, marginTop: 5}}>
               "Fields cannot be empty"
            </Text>}
            <CustomButton 
                text= "+ Add" 
                bgProps={{ 
                    style: { width: 80, height: 36, marginTop: 10, alignSelf: "flex-end"},
                    onPress: () => {
                        if (measurement && measurementType && ingredient) {
                        setDisplayError(false)
                        setInputArray([...inputArray, `${measurement} ${measurementType} ${ingredient}`]);
                        setMeasurement("")
                        setMeasurementType("")
                        setIngredient("")
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




