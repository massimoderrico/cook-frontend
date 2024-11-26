import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps} from "react-native";
import { Fonts } from "@/constants/Fonts";

type Props = TextInputProps & {
    placeholderOpacity? : number,
}

export const InputTextbox = ({
    placeholderOpacity = 100,
    style,
    ...rest
    }: Props ) =>{
        const textColor = useThemeColor('text', true);
        const backgroundColor = useThemeColor('background', true);

    return (
        <TextInput 
            placeholderTextColor={(textColor + placeholderOpacity.toString(16))}
            style={[
            {   
                color: textColor,
                backgroundColor: backgroundColor,
                fontFamily: Fonts(700),
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




