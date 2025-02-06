import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { KeyboardAvoidingView, TextInput, TextInputProps, TextStyle} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";

export type ThemedTextInputProps = TextInputProps & {
    placeholderOpacity? : number,
    invertColors? : boolean,
    fontWeight?: TextStyle["fontWeight"],
    iconName? : string
}

export const ThemedTextInput = ({
    placeholderOpacity = 100,
    fontWeight = 700,
    invertColors,
    style,
    iconName,
    ...rest
    }: ThemedTextInputProps ) =>{

    const textColor = useThemeColor('text', !invertColors)
    const backgroundColor = useThemeColor('background', !invertColors)
    const placeholderTextColor = textColor + placeholderOpacity.toString(16)

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
                    paddingRight: iconName ? 15 : 0,
                    shadowColor: backgroundColor,
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                },
                style]}
                {...rest}>
                {iconName && (
                    <Ionicons
                        name={iconName as any}
                        size={24}
                        color={placeholderTextColor}
                        style={{ marginLeft: 10 }}
                    />
                )}
            </TextInput>
    )
}
