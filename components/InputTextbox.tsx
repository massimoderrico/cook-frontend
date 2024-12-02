import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps} from "react-native";
import { Fonts } from "@/constants/Fonts";

type InputTextboxProps = TextInputProps & {
    placeholderOpacity? : number,
    fontWeight?: string | number
}

export const InputTextbox = ({
    placeholderOpacity = 100,
    fontWeight = 500,
    style,
    ...rest
    }: InputTextboxProps ) =>{

    const textColor = useThemeColor('text', true)

    return (
        <TextInput 
            placeholderTextColor={(textColor + placeholderOpacity.toString(16))}
            style={[
            {   
                color: textColor,
                backgroundColor: useThemeColor('background', true),
                fontFamily: Fonts(fontWeight),
                height: 44,
                fontSize: 20,
                borderRadius: 15, 
                paddingLeft: 15,  
            },
            style]}
            {...rest}>
        </TextInput>
    )
}




