import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps} from "react-native";
import { Fonts } from "@/constants/Fonts";

export type ThemedTextInputProps = TextInputProps & {
    placeholderOpacity? : number,
    fontWeight?: string | number
}

export const ThemedTextInput = ({
    placeholderOpacity = 100,
    fontWeight = 700,
    style,
    ...rest
    }: ThemedTextInputProps ) =>{

    const textColor = useThemeColor('text', true)
    const bgColor = useThemeColor('background', true)

    return (
        <TextInput 
            placeholderTextColor={(textColor + placeholderOpacity.toString(16))}
            style={[
            {   
                color: textColor,
                backgroundColor: useThemeColor('background', true),
                fontFamily: Fonts(fontWeight),
                height: 50,
                fontSize: 20,
                borderRadius: 15, 
                paddingLeft: 25,
                shadowColor: bgColor,
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.2,
                shadowRadius: 10,

            },
            style]}
            {...rest}>
        </TextInput>
    )
}
