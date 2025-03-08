import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CreateCookbookPage } from "@/components/navigation/CreateCookbookPage";

export default function AddRecipes() {
  const backgroundColor = useThemeColor("background");

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <CreateCookbookPage/>
    </SafeAreaView>
  );
}