/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const colors = {
  primary: '#20B3F8',
  lightText: '#000000',
  lightBg: '#F6F7F8',
  darkText: '#F6F7F8',
  darkBg: '#2A2A2D',
  error: '#ef4444',
  success: '#47d64b'
}

export const Colors = {
  primary: colors.primary,
  light: {
    text: colors.lightText,
    background: colors.lightBg,
    tint: colors.primary,
    icon: colors.lightText,
    tabIconDefault: colors.lightText,
    tabIconSelected: colors.primary,
    // error text 
    // error bg
    // success text
    // success bg
  },
  dark: {
    text: colors.darkText,
    background: colors.darkBg,
    tint: colors.primary,
    icon: colors.darkText,
    tabIconDefault: colors.darkText,
    tabIconSelected: colors.primary,
    // error text 
    // error bg
    // success text
    // success bg
  },
};
