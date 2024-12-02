import React from "react";
import { Colors } from "@/constants/Colors";
import { TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { Fonts } from "@/constants/Fonts";

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
    textProps : { fontWeight, style:textStyle, ...textRest } = {}
  }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primary,
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
