import React from "react";
import { colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Fonts, globalFont } from "@/constants/Fonts";

type Props = {
    text : string,
    height? : number,
    width? : number,
    borderRadius? : number,
    fontWeight? : any,
    fontSize? : number,
    bgColor? : string ,
    textColor? : string,
    onPress? : (args: any) => any,
  };

export const CustomButton = ({
  text,
  height = 45, 
  width = 200,
  borderRadius = height/2,
  fontWeight = 700,
  fontSize,
  bgColor = colors.primary,
  textColor = colors.dark,
  onPress
  }: Props ) =>{
  return (
      <TouchableOpacity 
        onPress={onPress}
        style={
          {
            height: height,
            width: width,
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ThemedText style={
            {
              color: textColor, 
              fontFamily: Fonts(fontWeight),
              fontSize: fontSize,
            }}>
            {text}
          </ThemedText>
          
      </TouchableOpacity>)
}




