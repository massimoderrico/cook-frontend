import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import HomePage from "@/components/navigation/HomePage";
import HomePageRemodel from "@/components/navigation/HomePageRemodel";

export default function Home(){
    const backgroundColor = useThemeColor("background")

    return (
        <SafeAreaView style={{backgroundColor:backgroundColor, flex: 1}}>
            <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>Home</ThemedText>
                <HomePageRemodel/>
        </SafeAreaView>
    )
}