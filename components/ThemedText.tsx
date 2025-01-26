import { Text, type TextProps, StyleSheet, TextStyle } from 'react-native';
import { Fonts, globalFont } from '@/constants/Fonts';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  invertColors?: boolean;
  fontWeight?: TextStyle["fontWeight"]
  type?: 'default' | 'title' | 'tabtitle' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  invertColors,
  type = 'default',
  fontWeight = 400,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor('text', invertColors);

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'tabtitle' ? styles.tabtitle : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        {fontFamily: Fonts(fontWeight)},
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Fonts(),
  },
  defaultSemiBold: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Fonts("semibold"),
  },
  title: {
    fontSize: 72,
    fontFamily: Fonts('bold'),
  },
  tabtitle: {
    fontSize: 24,
    fontFamily: Fonts('semibold'),
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 30,
    fontFamily: Fonts('bold'),
  },
  link: {
    lineHeight: 30,
    fontSize: 20,
    color: '#0a7ea4',
    fontFamily: Fonts('medium')
  },
});
