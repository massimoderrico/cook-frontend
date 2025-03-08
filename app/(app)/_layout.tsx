import { Redirect, Stack, Tabs } from 'expo-router';
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
        tabBarStyle: {
          justifyContent: 'center',
          backgroundColor: useThemeColor('background'),
          borderTopColor: useThemeColor('text'),
          height: 90,
          paddingTop: 12
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: undefined,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? color: useThemeColor("text")} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: undefined,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={focused ? color: useThemeColor("text")} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-recipe"
        options={{
          title: undefined,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"add-circle"} color={focused ? color: useThemeColor("text")} />
          ),
        }}
      />
      <Tabs.Screen
        name="cookbooks"
        options={{
          title: undefined,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={focused ? color: useThemeColor("text")} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: undefined,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={focused ? color: useThemeColor("text")} />
          ),
        }}
      />
    </Tabs>
  )
}
