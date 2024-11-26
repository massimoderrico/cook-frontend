import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  invertColors?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, invertColors, ...rest }: ThemedViewProps) {
  const backgroundColor = useThemeColor('background', invertColors);

  return <View style={[{ backgroundColor }, style]} {...rest} />;
}
