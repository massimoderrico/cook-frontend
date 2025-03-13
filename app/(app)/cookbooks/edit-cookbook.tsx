import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useSession } from "@/context";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Switch } from "react-native";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/CustomButton";

const EDIT_COOKBOOK = gql`
    mutation EditCookbook($cookbookId: Int!, $data: CookbookUpdateManyMutationInput!) {
        editCookbook(cookbookId: $cookbookId, data: $data) {
            id
            name
            description
        }
    }
`;

export default function EditCookbook() {
  const { selectedCookbook } = useSession();
  const { userId } = useSession();
  if (!selectedCookbook) {
    return <ThemedText>No Cookbook Found</ThemedText>;
    }
  const backgroundColor = useThemeColor("background");
  const [cookbookName, onChangeCookbookName ] = useState<string>(selectedCookbook?.name || "");
  const [description, onChangeDescription ] = useState<string>(selectedCookbook?.description || "");
  const [isPublic, setIsPublic ] = useState<boolean>(selectedCookbook?.isPublic || false);
  
  const router = useRouter();
  const [editCookbook, { loading, data, error }] = useMutation(EDIT_COOKBOOK);
  
  const handleSaveCookbook = async () => { 
      if (!userId) return;
      try {
        const { data } = await editCookbook({
            variables: {
                cookbookId: parseInt(selectedCookbook.id),
                data: {
                  name: { set: cookbookName },
                  description: { set: description },
                  isPublic: { set: isPublic },
                },
            },
        });
        console.log("Cookbook updated:", data);
        router.push("/(app)/cookbooks");
        } catch (err) {
          console.error("Error updating cookbook:", err);
        }
    };

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <ThemedText style={{ padding: 20, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>Create Cookbook</ThemedText>
      <KeyboardAvoidingView behavior="position" >
          <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} >
              <ThemedTextInput 
                placeholder="Cookbook Name" 
                value={cookbookName} 
                onChangeText={onChangeCookbookName}
                style={{marginTop: 10,
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
                <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                    <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                        <ThemedText fontWeight={500} >
                            Public Cookbook
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
                <CustomButton text="Save Cookbook" bgProps={{style: {marginVertical: 30}, onPress: () => {handleSaveCookbook()}}} />
            </ThemedScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}