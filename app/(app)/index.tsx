import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import HomePage from "@/components/navigation/HomePage";

export default function Home(){
    const backgroundColor = useThemeColor("background")

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor, flex: 1}}>
            <HomePage/>
        </SafeAreaView>
    )
}