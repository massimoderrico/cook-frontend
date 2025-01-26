import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { KeyboardAvoidingView, TextInput, TextInputProps, TextStyle} from "react-native";
import { Fonts } from "@/constants/Fonts";

export type ThemedTextInputProps = TextInputProps & {
    placeholderOpacity? : number,
    invertColors? : boolean,
    fontWeight?: TextStyle["fontWeight"]
}

export const ThemedTextInput = ({
    placeholderOpacity = 100,
    fontWeight = 700,
    invertColors,
    style,
    ...rest
    }: ThemedTextInputProps ) =>{

    const textColor = useThemeColor('text', !invertColors)
    const backgroundColor = useThemeColor('background', !invertColors)
    

    return (
            <TextInput 
                placeholderTextColor={(textColor + placeholderOpacity.toString(16))}
                style={[
                {   
                    color: textColor,
                    backgroundColor: backgroundColor,
                    fontFamily: Fonts(fontWeight),
                    height: 50,
                    fontSize: 20,
                    borderRadius: 15, 
                    paddingLeft: 25,
                    shadowColor: backgroundColor,
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                },
                style]}
                {...rest}>
            </TextInput>
    )
}
