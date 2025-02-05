import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function AddRecipe(){
    const backgroundColor = useThemeColor("background")

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor}}>
            <ThemedText>Add Recipe</ThemedText>
        </SafeAreaView>
    )
}