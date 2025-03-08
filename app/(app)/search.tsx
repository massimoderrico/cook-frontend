import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SearchPage } from "@/components/navigation/SearchPage";

export default function Search(){
    const backgroundColor = useThemeColor("background")

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor, flex: 1}}>
            <SearchPage/>
        </SafeAreaView>
    )
}