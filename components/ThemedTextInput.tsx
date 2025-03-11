import React, { ComponentProps } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { KeyboardAvoidingView, StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from "./ThemedView";

export type ThemedTextInputProps = TextInputProps & {
    placeholderOpacity? : number,
    invertColors? : boolean,
    fontWeight?: TextStyle["fontWeight"],
    iconProps?: React.ComponentProps<typeof Ionicons>,
    style?: StyleProp<ViewStyle> 
}

export const ThemedTextInput = ({
    placeholderOpacity = 100,
    fontWeight = 700,
    invertColors,
    style,
    iconProps,
    ...rest
    }: ThemedTextInputProps ) => {

    const textColor = useThemeColor('text', !invertColors)
    const backgroundColor = useThemeColor('background', !invertColors)
    const placeholderTextColor = textColor + placeholderOpacity.toString(16)

    return (
        <ThemedView style={[{
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: backgroundColor,
            borderRadius: 15}, style]}>
            <TextInput 
                autoCapitalize="none"
                placeholderTextColor={(textColor + placeholderOpacity.toString(16))}
                style={
                {   
                    color: textColor,
                    backgroundColor: backgroundColor,
                    fontFamily: Fonts(fontWeight),
                    height: 50,
                    fontSize: 20,
                    paddingLeft: 25,
                    shadowColor: backgroundColor,
                    borderRadius: 15,
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    flex: 8,
                }}
            {...rest}/>
            {iconProps && <Ionicons style={{flex: 1}} size={28} {...iconProps}/>}
        </ThemedView>
          
    )
}
