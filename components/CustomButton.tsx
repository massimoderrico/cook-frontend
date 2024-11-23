import React from "react";
import { colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TouchableOpacity } from "react-native";

type props = {
    height? : number;
    width? : number;
    borderRadius? : number;
    title : string;
    fontWeight? : number;
    fontSize? : number;
    bgColor? : string;
    textColor? : string;
    inputFunction? : () => void
  };

export const CustomButton = (props: props) =>{
    return (
      <TouchableOpacity 
        style={
          {
            height: props.height,
            width: props.width,
            borderRadius: props.borderRadius,
            backgroundColor: props.bgColor,
          }
        }/>)
}

const styles = StyleSheet.create({
  button: {
  },
});


