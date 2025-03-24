import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, View, Image } from "react-native";
import { useSession } from "@/context";
import { CustomButton } from "@/components/CustomButton";
import { ThemedView } from "@/components/ThemedView";
import { colors, Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { defaultProfilePic } from "@/constants/Data";

export default function Profile(){
    const backgroundColor = useThemeColor("background")
    const textColor = useThemeColor("text")
    const session = useSession()
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pickImage = async () => {
      // Request permission to access media library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
  
      // Open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri); // Use the first selected image URI
      }
    };
  

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor, flex: 1, alignItems: "center"}}>
            <ThemedText style={{ padding: 20, marginBottom: 40, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>
                Profile
            </ThemedText>
            <ThemedView style={{justifyContent: "center", alignItems: "center"}}>
            <View style={{height: 160, width: 160, borderRadius: 80}}>
                <Image source={{uri: selectedImage || defaultProfilePic}} style={{height: 160, width: 160, borderRadius: 80}}/>
                <TouchableOpacity onPress={pickImage} style={{height: 50, width: 50, borderRadius: 25, backgroundColor: Colors.primary , position: "absolute", bottom: 0, right: 0, justifyContent: "center", alignItems: "center"}}>
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