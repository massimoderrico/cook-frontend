import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { SessionProvider } from '@/context';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    CormorantLight: require('@/assets/fonts/Cormorant/Cormorant-Light.ttf'),
    CormorantRegular: require('@/assets/fonts/Cormorant/Cormorant-Regular.ttf'),
    CormorantMedium: require('@/assets/fonts/Cormorant/Cormorant-Medium.ttf'),
    CormorantSemiBold: require('@/assets/fonts/Cormorant/Cormorant-SemiBold.ttf'),
    CormorantBold: require('@/assets/fonts/Cormorant/Cormorant-Bold.ttf'),
    CormorantLightItalic: require('@/assets/fonts/Cormorant/Cormorant-LightItalic.ttf'),
    CormorantItalic: require('@/assets/fonts/Cormorant/Cormorant-RegularItalic.ttf'),
    CormorantMediumItalic: require('@/assets/fonts/Cormorant/Cormorant-MediumItalic.ttf'),
    CormorantSemiBoldItalic: require('@/assets/fonts/Cormorant/Cormorant-SemiBoldItalic.ttf'),
    CormorantBoldItalic: require('@/assets/fonts/Cormorant/Cormorant-BoldItalic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
