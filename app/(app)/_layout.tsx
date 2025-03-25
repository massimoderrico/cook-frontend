import { Redirect, router, Stack, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSession } from '@/context';
import { Text } from 'react-native';

export default function AppLayout() {

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: useThemeColor('background'),
          borderTopColor: useThemeColor('text'),
          height: 90,
          paddingTop: 10
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? color: useThemeColor("text")} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); 
            router.replace("/(app)"); 
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={focused ? color: useThemeColor("text")} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-recipe"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"add-circle"} size={40} color={focused ? color: useThemeColor("text")} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); 
            router.replace("/(app)/create-recipe"); 
          },
        }}
      />
      <Tabs.Screen
        name="cookbooks"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={focused ? color: useThemeColor("text")} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); 
            router.replace("/cookbooks"); 
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={focused ? color: useThemeColor("text")} />
          ),
        }}
      />
    </Tabs>
  )
}
