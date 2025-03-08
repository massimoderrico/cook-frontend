import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/context";
import { CustomButton } from "@/components/CustomButton";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

export default function Profile(){
    const backgroundColor = useThemeColor("background")
    const session = useSession()

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor}}>
            <ThemedText>Profile</ThemedText>
            {/* Profile Picture goes here */}
            <View style={{height: 160, width: 160, backgroundColor: "red", borderRadius: 80}}>
                <TouchableOpacity style={{height: 50, width: 50, borderRadius: 25, backgroundColor: Colors.primary , position: "absolute", bottom: 0, right: 0}}>
                </TouchableOpacity>
            </View>
            <ThemedText>{session.username}</ThemedText>
            <ThemedText>{session.email}</ThemedText>
                <CustomButton bgProps = {{
                    style: {width: 200, height: 45},
                }}              
                text="Edit Profile"/>
            {/* <TouchableOpacity onPress={() => {console.log(session.userId)}}>
                <ThemedText>UserId</ThemedText>
            </TouchableOpacity> */}
            <TouchableOpacity style={{marginTop: 20}}>
                <ThemedText>Settings</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 20}}>
                <ThemedText>Information</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 20}} onPress={() => {session.signOut()}}>
                <ThemedText style={{color: Colors.error, fontFamily: Fonts(600)}}>Logout</ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    )
}