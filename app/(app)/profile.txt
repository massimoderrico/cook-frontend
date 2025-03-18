import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/context";
import { CustomButton } from "@/components/CustomButton";
import { ThemedView } from "@/components/ThemedView";
import { colors, Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";

export default function Profile(){
    const backgroundColor = useThemeColor("background")
    const textColor = useThemeColor("text")
    const session = useSession()

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor, flex: 1, alignItems: "center"}}>
            <ThemedText style={{ padding: 20, marginBottom: 40, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>
                Profile
            </ThemedText>
            {/* Profile Picture goes here */}
            <ThemedView style={{justifyContent: "center", alignItems: "center"}}>
            <View style={{height: 160, width: 160, backgroundColor: "red", borderRadius: 80}}>
                <TouchableOpacity style={{height: 50, width: 50, borderRadius: 25, backgroundColor: Colors.primary , position: "absolute", bottom: 0, right: 0, justifyContent: "center", alignItems: "center"}}>
                <Ionicons name="camera" size={24} color={textColor}/>
                </TouchableOpacity>
            </View>
            <ThemedText style={{ paddingTop: 20,  fontSize: 30, fontWeight: "bold", textAlign: 'center', fontFamily: Fonts(600)}}>{session.username}</ThemedText>
            <ThemedText >{session.email}</ThemedText>
                <CustomButton bgProps = {{
                    style: {width: 200, height: 45, margin: 15, marginBottom: 50},
                }}              
                text="Edit Profile"/>
            <TouchableOpacity style={{marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", minWidth: 200 }}>
                <View style={{height: 40, width: 40, borderRadius: 25, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center"}}>
                    <Ionicons name="cog" size={24} color={textColor}/>
                </View>
                <ThemedText style={{ alignItems: "center"}}>Settings</ThemedText>
                <Ionicons name="chevron-forward" size={24} color={textColor}/>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", minWidth: 200}}>
                <View style={{height: 40, width: 40, borderRadius: 25, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center"}}>
                    <Ionicons name="exit" size={22} style={{left:2}} color={textColor}/>
                </View>
                <ThemedText onPress={() => {session.signOut()}} style={{color: Colors.error, fontFamily: Fonts(600), alignItems: "center"}}>Logout</ThemedText>
                <Ionicons name="chevron-forward" size={24} color={textColor}/>
            </TouchableOpacity>
            </ThemedView>
        </SafeAreaView>
    )
}