import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { KeyboardAvoidingView, Platform, Switch } from "react-native"
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

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($data: RecipeCreateInput!) {
    createRecipe(data: $data) {
      id
      name
      description
    }
  }
`;

export default function CreateRecipe () {
    const [recipeName, onChangeRecipeName ] = useState<string>()
    const [description, onChangeDescription ] = useState<string>()
    const [prepTime, onChangePrepTime ] = useState<string>()
    const [cookTime, onChangeCookTime ] = useState<string>()
    const [isPublic, setIsPublic ] = useState<boolean>(false)
    const [ingredients, setIngredients] = useState<string[]>([])
    const [directions, setDirections] = useState<string[]>([])

    const { userId } = useSession();
    const router = useRouter();
    const [createRecipe, { loading, data, error }] = useMutation(CREATE_RECIPE);

    const handleSaveRecipe = async () => { 
        if (!userId) return;
        try {
          const { data } = await createRecipe({
            variables: {
              data: {
                name: recipeName,
                description,
                prepTime: prepTime ? parseInt(prepTime, 10) : null, 
                cookTime: cookTime ? parseInt(cookTime, 10) : null,
                isPublic,
                ingredients: { set: ingredients ?? [] },
                directions: { set: directions ?? [] },
                user: { connect: { id: userId } },
              },
            },
          });
          console.log("Recipe created:", data);
          if (data?.createRecipe) {
            router.push({
                pathname: "/(app)/create-recipe/add-recipe-to-cookbooks",
                params: {id: data?.createRecipe.id},
            });
          }
          } catch (err) {
            console.error("Error creating recipe:", err);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: useThemeColor('background') }}>
        <ThemedText  style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}> Create Recipe</ThemedText>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20} style={{flex: 1}}>
        <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} >
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
                <ThemedView style={{justifyContent: 'center', alignItems: 'center', }}>
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
                            paddingLeft: 20,
                            paddingHorizontal: 10,
                            borderWidth: 2,
                            borderColor: Colors.primary,
                            width: 95,
                        }}
                    />
                </ThemedView>       
            </ThemedView>
            <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedText fontWeight={500}>
                        Cook Time (mins)
                    </ThemedText>
                </ThemedView>
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedTextInput 
                        placeholder="30" 
                        value={cookTime} 
                        onChangeText={onChangeCookTime}
                        keyboardType="numeric" 
                        style={{
                            paddingLeft: 10,
                            paddingHorizontal: 10,
                            borderWidth: 2,
                            borderColor: Colors.primary,
                            width: 95,
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