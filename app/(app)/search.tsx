import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Search(){
    const backgroundColor = useThemeColor("background")

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor}}>
            <ThemedText>Search </ThemedText>
        </SafeAreaView>
    )
}