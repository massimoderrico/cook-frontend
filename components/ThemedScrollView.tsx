import { ScrollView, View, type ScrollViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';


export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  invertColors?: boolean;
};

export function ThemedScrollView({ style, lightColor, darkColor, invertColors, ...rest }: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor('background', invertColors);

  return <ScrollView style={[{ backgroundColor }, style]} {...rest} />;
}
