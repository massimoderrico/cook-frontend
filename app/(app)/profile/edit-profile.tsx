import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function EditProfile() {
    const backgroundColor = useThemeColor("background");

    const { userId } = useSession();
    const router = useRouter();

    return (
        <SafeAreaView style={{ backgroundColor, flex: 1 }}>
          <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>Edit Profile</ThemedText>

        </SafeAreaView>
    )
}