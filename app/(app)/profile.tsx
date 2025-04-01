import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, View, Image, Alert } from "react-native";
import { useSession } from "@/context";
import { CustomButton } from "@/components/CustomButton";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { defaultProfilePic } from "@/constants/Data";
import { launchImageLibraryAsync, ImagePickerAsset, MediaTypeOptions } from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { gql, useMutation } from "@apollo/client";
import { useStorageState } from "@/useStorageState";
import { getToken } from "@/storage";

const CHANGE_PICTURE_MUTATION = gql`
mutation ChangePictureUser($id: Int!, $image: String!) {
    changePictureUser(id: $id, image: $image) {
    id
    image
    }
}
`;

export default function Profile(){
    const backgroundColor = useThemeColor("background")
    const textColor = useThemeColor("text")
    const session = useSession()
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [changePictureUser, { loading, error }] = useMutation(CHANGE_PICTURE_MUTATION);

    const pickImage = async () => {
        const response: ImagePicker.ImagePickerResult = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (response.canceled) return;

        if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            await uploadImage(response.assets[0].uri, session.userId || 0);
        }
    };

    const uploadImage = async (uri: string, userId: number) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `profile_pictures/${userId}`);
        
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            console.log(await getToken());
          // downloadURL not being stored to postgres server
            if (userId && userId > 0 && downloadURL) {
                await changePictureUser({
                    variables: { id: userId, image: downloadURL },
                }).catch((err) => console.error("GraphQL Error:", JSON.stringify(err, null, 2)));
            }
            
        } catch (error) {
          console.error("Upload error:", error);        
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
                <Image source={{uri: imageUri || defaultProfilePic}} style={{height: 160, width: 160, borderRadius: 80}}/>
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