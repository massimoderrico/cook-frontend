import React from "react";
import { Colors } from "@/constants/Colors";
import { TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";

/* EXAMPLE USAGE:

<CustomButton
  text="Click Me"
  bgProps={{
      style: { backgroundColor: "red" },
      onPress: () => console.log("Button Pressed"),
  }}
  textProps={{
      fontWeight: 300,
      style: { fontSize: 30 }, 
}}/>
*/

type TextButtonProps = TextProps & {
  fontWeight?: number | string;
};

type CustomButtonProps = {
  text: string;
  bgProps?: TouchableOpacityProps;
  textProps?: TextButtonProps;
};

export const CustomButton = (
  { 
    text, 
    bgProps : { style: bgStyle, ...bgRest } = {},
    textProps : { fontWeight = 700 , style:textStyle, ...textRest } = {}
  }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          height: 55,
          borderRadius: 27.5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primary,
          shadowColor: useThemeColor('background', true),
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        bgStyle, 
      ]}
      {...bgRest}
    >
      <ThemedText
        style={[
          {
            color: Colors.light.text,
            fontFamily: Fonts(fontWeight),
            fontSize: 26,
            lineHeight: 26,
          },
          textStyle,
        ]}
        {...textRest}
      >
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
};
