import { Stack } from 'expo-router';

export default function CreateRecipeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-recipe-to-cookbooks" />
      <Stack.Screen name="edit-recipe" />
    </Stack>
  );
}
