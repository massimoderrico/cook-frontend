import { Dropdown } from 'react-native-element-dropdown';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TextStyle } from 'react-native';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

export type ThemedDropdownProps = DropdownProps<any> & {
  lightColor?: string;
  darkColor?: string;
  invertColors?: boolean;
  fontWeight?: string | number
  fontSize?: number
  placeholderOpacity?: number
  textAlign ?: TextStyle["textAlign"]
};

export function ThemedDropdown({ 
    style, 
    lightColor, 
    darkColor, 
    invertColors,
    fontWeight = 700,
    fontSize = 20,
    placeholderOpacity = 100,
    textAlign,
    ...rest }: ThemedDropdownProps) {
    const textColor = useThemeColor('text', !invertColors);
    const backgroundColor = useThemeColor('background', !invertColors);

  return <Dropdown 
    style={[{                 
        backgroundColor: backgroundColor,
        height: 50,
        borderRadius: 15, 
        paddingLeft: 25,
        shadowColor: backgroundColor,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
       
     }, style]} {...rest}

    searchPlaceholderTextColor= {textColor}
    selectedTextStyle = {{
        color: textColor,
        fontSize: fontSize,
        fontFamily: Fonts(fontWeight),
        borderRadius: 15,
        padding: 0,
        margin: 0,
        textAlign: textAlign
        }}
   
    inputSearchStyle ={{
        color: textColor,
        fontSize: fontSize,
        fontFamily: Fonts(fontWeight),
        borderRadius: 15,
        paddingLeft: 13,
        backgroundColor: backgroundColor,
        padding: 0,
        margin: 0,
        textAlign: textAlign
    }}
    containerStyle={{
        backgroundColor: backgroundColor,
        borderRadius: 15,
        padding: 0,
        margin: 0,
        borderColor: Colors.primary
    }}
    itemTextStyle= {{
        borderRadius: 15,
        color: textColor,
        fontSize: fontSize,
        fontFamily: Fonts(fontWeight),
        padding: 0,
        margin: 0,
        textAlign: textAlign

    }}
     itemContainerStyle = {{
        backgroundColor: "none",
        padding: 0,
        margin: 0,
    }}
    placeholderStyle= {{
        borderRadius: 15,
        color: textColor + placeholderOpacity.toString(16),
        backgroundColor: backgroundColor,
        fontFamily: Fonts(fontWeight),
        fontSize: fontSize,
        padding: 0,
        margin: 0,
        textAlign: textAlign
     }}/>;
}
