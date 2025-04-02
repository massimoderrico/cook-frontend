import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { KeyboardAvoidingView, Platform, Switch, TouchableOpacity, Image } from "react-native"
import { useState } from "react"
import { Colors } from "@/constants/Colors"
import { CustomButton } from "@/components/CustomButton"
import { ThemedIngredientAdditveTextInput } from "@/components/ThemedIngredientAdditiveTextInput";
import { ThemedAdditveTextInput } from "@/components/ThemedAdditiveTextInput";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context";
import { useRouter } from "expo-router";
import { gql, useMutation } from "@apollo/client";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

export const EDIT_RECIPE = gql`
  mutation EditRecipe($recipeId: Int!, $data: RecipeUpdateManyMutationInput!) {
    editRecipe(recipeId: $recipeId, data: $data) {
      id
      name
      description
    }
  }
`;



export default function EditRecipe () {
    const { selectedRecipe } = useSession();
    const { userId } = useSession();
    if (!selectedRecipe) {
        return <ThemedText>No Cookbook Found</ThemedText>;
    }
    const [recipeName, onChangeRecipeName ] = useState<string>(selectedRecipe?.name || "");
    const [description, onChangeDescription ] = useState<string>(selectedRecipe?.description || "")
    const [prepTime, onChangePrepTime ] = useState<string>(selectedRecipe?.prepTime ? String(selectedRecipe.prepTime) : "")
    const [cookTime, onChangeCookTime ] = useState<string>(selectedRecipe?.cookTime ? String(selectedRecipe.cookTime) : "")
    const [isPublic, setIsPublic ] = useState<boolean>(selectedRecipe?.isPublic || false)
    const [ingredients, setIngredients] = useState<string[]>(selectedRecipe?.ingredients ? [...selectedRecipe.ingredients] : [])
    const [directions, setDirections] = useState<string[]>(selectedRecipe?.directions ? [...selectedRecipe.directions] : [])
    const [imageUri, setImageUri] = useState<string>(selectedRecipe?.image || "");
    const router = useRouter();
    const [editRecipe, { loading, data, error }] = useMutation(EDIT_RECIPE);
    const textColor = useThemeColor("text")

    const pickImage = async () => {
        const response: ImagePicker.ImagePickerResult = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (response.canceled) return;

        if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);        }
    };

    const uploadImage = async (uri: string) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `recipes/${selectedRecipe.id}`);
        
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL

        } catch (error) {
        console.error("Upload error:", error);        
        }
    };

    const handleSaveRecipe = async () => { 
        if (!userId) return;
        try {
            if (imageUri) {
            var imageUrl =  await uploadImage(imageUri) 
            }
          const { data } = await editRecipe({
            variables: {
                recipeId: parseInt(selectedRecipe.id),
                data: {
                    name: { set: recipeName },
                    description: { set: description },
                    prepTime: { set: prepTime ? parseInt(prepTime, 10) : null }, 
                    cookTime: { set: cookTime ? parseInt(cookTime, 10) : null },
                    isPublic: { set: isPublic },
                    ingredients: { set: ingredients ?? [] },
                    directions: { set: directions ?? [] },
                    image: { set: imageUrl }
                },
            },
          });
          console.log("Recipe updated:", data);
          router.push("/(app)/cookbooks")
          } catch (err) {
            console.error("Error updating recipe:", err);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: useThemeColor('background') }}>
        <ThemedText  style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}> Edit Recipe</ThemedText>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20} style={{flex: 1}}>
        <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
            { imageUri && 
                <TouchableOpacity onPress={pickImage} style={{height: 80, borderRadius: 15, marginBottom: 10}}>
                    <Image source={{uri: imageUri}} style={{height: 80, borderRadius: 15}}/>
                </TouchableOpacity>
            }
            { !imageUri &&
                <TouchableOpacity onPress={pickImage} style={{height: 80, borderRadius: 15, marginBottom: 10, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center"}}>
                <Ionicons name="camera" size={24} color={textColor}/>
                </TouchableOpacity>
            }
            <ThemedTextInput 
            placeholder="Recipe Name" 
            value={recipeName} 
            onChangeText={onChangeRecipeName}
            style={{
                borderWidth: 2,
                borderColor: Colors.primary,
                paddingLeft: 10
            }}
            />
            <ThemedTextInput 
            placeholder="Description" 
            value={description} 
            multiline={true}
            onChangeText={onChangeDescription}
            style={{marginVertical: 10,
                borderWidth: 2,
                borderColor: Colors.primary,
                paddingLeft: 10,
                height: 100 
            }}
            />
            <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedText fontWeight={500} >
                        Prepration Time
                    </ThemedText>
                </ThemedView>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center', }}>
                    <ThemedTextInput  
                        placeholder="30 mins" 
                        value={prepTime} 
                        onChangeText={onChangePrepTime} 
                        keyboardType="numeric"
                        style={{
                            paddingLeft: 10,
                            paddingHorizontal: 10,
                            borderWidth: 2,
                            borderColor: Colors.primary,
                            
                        }}
                    />
                </ThemedView>       
            </ThemedView>
            <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedText fontWeight={500}>
                        Cook Time
                    </ThemedText>
                </ThemedView>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center', }}>
                    <ThemedTextInput 
                        placeholder="30 mins" 
                        value={cookTime} 
                        onChangeText={onChangeCookTime}
                        keyboardType="numeric" 
                        style={{
                            paddingLeft: 10,
                            paddingHorizontal: 10,
                            borderWidth: 2,
                            borderColor: Colors.primary,
                            
                        }}
                    />
                </ThemedView>       
            </ThemedView>
            <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedText fontWeight={500} >
                        Public Recipe
                    </ThemedText>
                </ThemedView>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center', }}>
                    <Switch
                        trackColor={{false: useThemeColor("background"), true: Colors.primary}}
                        thumbColor={isPublic ? useThemeColor('background', true) : useThemeColor("background")}
                        onValueChange={setIsPublic}
                        value={isPublic}
                    />
                </ThemedView>       
            </ThemedView>    
            <ThemedText type= {"subtitle"} fontWeight={700} style={{marginTop: 30}}>
                Ingredients
            </ThemedText>
            <ThemedIngredientAdditveTextInput inputArray={ingredients} setInputArray={setIngredients}/>
            <ThemedText type= {"subtitle"} fontWeight={700} style={{marginTop: 30}}>
                Directions
            </ThemedText> 
            <ThemedAdditveTextInput textInputProps={{placeholder: "Add vanilla to cake batter"}} inputArray={directions} setInputArray={setDirections} numbered numberedPrefix="Step "/>
            <CustomButton text="Save Recipe" bgProps={{style: {marginVertical: 30}, onPress: handleSaveRecipe}} />
        </ThemedScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}