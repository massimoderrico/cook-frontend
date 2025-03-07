import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/context";

export default function Profile(){
    const backgroundColor = useThemeColor("background")
    const session = useSession()

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor}}>
            <ThemedText>Profile Page</ThemedText>
            <TouchableOpacity onPress={() => {
                session.signOut()}}>
                <ThemedText>Signout</ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    )
}