/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const colors = {
  primary: '#20B3F8',
  light: '#F6F7F8',
  dark: '#2A2A2D',
  error: '#ef4444',
  success: '#47d64b'
}

export const Colors = {
  primary: colors.primary,
  light: {
    text: colors.dark,
    background: colors.light,
    tint: colors.primary,
    icon: colors.dark,
    tabIconDefault: colors.dark,
    tabIconSelected: colors.primary,
  },
  dark: {
    text: colors.light,
    background: colors.dark,
    tint: colors.primary,
    icon: colors.light,
    tabIconDefault: colors.light,
    tabIconSelected: colors.primary,
  },
};
