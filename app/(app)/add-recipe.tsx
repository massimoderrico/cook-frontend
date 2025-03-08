import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CreateRecipePage } from "@/components/navigation/CreateRecipePage";

export default function AddRecipe(){
    const backgroundColor = useThemeColor("background")

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor, flex: 1}}>
            <ThemedText>Create Recipe</ThemedText>
            <CreateRecipePage/>
        </SafeAreaView>
    )
}