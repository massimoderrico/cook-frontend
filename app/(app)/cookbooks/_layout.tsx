import { Stack } from 'expo-router';

export default function Cookbook() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-recipes-to-cookbook" />
      <Stack.Screen name="view-cookbook" />
      <Stack.Screen name="edit-cookbook" />
      <Stack.Screen name="create-cookbook" />
      <Stack.Screen name="remove-recipes-from-cookbook" />
    </Stack>
  );
}
