import { SafeAreaView } from "react-native-safe-area-context";
import { ViewCookbookPage } from "@/components/navigation/ViewCookbookPage";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/context";

export default function ViewCookbook() {
  const { selectedCookbook } = useSession();
  const backgroundColor = useThemeColor("background");

  if (!selectedCookbook) {
    return <ThemedText>No Cookbook Found</ThemedText>;
  }

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <ViewCookbookPage cookbook={selectedCookbook} />
    </SafeAreaView>
  );
}
