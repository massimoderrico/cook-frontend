import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/context";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { RecipeCard } from "@/components/RecipeCard";
import { CustomButton } from "@/components/CustomButton";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Colors } from "@/constants/Colors";

const DELETE_COOKBOOK = gql`
  mutation DeleteCookbook($cookbookId: Int!, $userId: Int!) {
    deleteCookbook(cookbookId: $cookbookId, userId: $userId)
  }
`;

const GET_USER_ID_BY_EMAIL = gql`
  query GetUserIdByEmail($email: String!) {
    getUserIdByEmail(email: $email)
  }
`;

const CREATE_PERMISSION = gql`
  mutation CreatePermission($data: PermissionCreateInput!) {
    createPermission(data: $data) {
      userId
      permissionLevel
      resourceId
      resourceType
    }
  }
`;

const DELETE_PERMISSION = gql`
  mutation DeletePermission($data: PermissionWhereInput!) {
    deletePermission(data: $data) {
      id
    }
  }
`;

export default function ViewCookbook() {
  const { selectedCookbook } = useSession();
  const { setSelectedCookbook } = useSession();
  const backgroundColor = useThemeColor("background");
  const router = useRouter();
  const { userId } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [deleteCookbookMutation, { loading, data, error }] = useMutation(DELETE_COOKBOOK);
  const [getUserIdByEmail] = useLazyQuery(GET_USER_ID_BY_EMAIL);
  const [createPermissionMutation] = useMutation(CREATE_PERMISSION);
  const [deletePermissionMutation] = useMutation(DELETE_PERMISSION);

  if (!selectedCookbook) {
    return <ThemedText>No Cookbook Found</ThemedText>;
  }

  const addUserToCookbook = () => {
    setMenuVisible(false);
    setAddUserModalVisible(true);
  };

  const submitUser = async () => {
    if (!userEmail) return;
    try {
      const { data } = await getUserIdByEmail({
        variables: {
            email: userEmail
        },
      });
      if (!data?.getUserIdByEmail) {
        console.error("User not found");
        return;
      } else if (data?.getUserIdByEmail === userId) {
        setUserEmail("");
        return;
      }
      await createPermissionMutation({
        variables: {
          data: {
            userId: data?.getUserIdByEmail,
            permissionLevel: "EDITOR",
            resourceId: parseInt(selectedCookbook.id),
            resourceType: "COOKBOOK",
          },
        },
      });
      setAddUserModalVisible(false);
      setUserEmail("");
    } catch (err) {
      console.error("Error adding user to cookbook:", err);
    }
  };

  const removeUser = async () => {
    if (!userEmail) return;
    try {
      const { data } = await getUserIdByEmail({
        variables: {
            email: userEmail
        },
      });
      const removeUserId = data?.getUserIdByEmail;
      if (!removeUserId) {
        console.error("User not found");
        return;
      }
      await deletePermissionMutation({
        variables: {
          data: {
            userId: { equals: removeUserId },
            permissionLevel: { equals: "EDITOR" },
            resourceId: { equals: parseInt(selectedCookbook.id) },
            resourceType: { equals: "COOKBOOK" },
          },
        },
      });
      setAddUserModalVisible(false);
      setUserEmail("");
    } catch (err) {
      console.error("Error adding user to cookbook:", err);
    }
  };

  const addRecipesToCookbook = () => {
    setMenuVisible(false);
    router.replace({
      pathname: "/(app)/cookbooks/add-recipes-to-cookbook",
      params: {id: selectedCookbook.id},
    });
  }

  const removeRecipesFromCookbook = () => {
    setMenuVisible(false);
    setSelectedCookbook(selectedCookbook);
    router.replace({
      pathname: "/(app)/cookbooks/remove-recipes-from-cookbook",
      params: {id: selectedCookbook.id},
    });
  }
  
  const editCookbook = () => {
    setMenuVisible(false);
    setSelectedCookbook(selectedCookbook);
    router.replace("/(app)/cookbooks/edit-cookbook");
  };

  const deleteCookbook = async () => {
    setMenuVisible(false);
    if (!userId) return;
    try {
      const { data } = await deleteCookbookMutation({
        variables: { 
          cookbookId: parseInt(selectedCookbook.id),
          userId 
        },
      });
      router.replace("/(app)/cookbooks");
    } catch (err) {
      console.error("Error deleting cookbook:", err);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      {/* Add user modal */}
      <Modal
          visible={addUserModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setAddUserModalVisible(false)}
      >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}
            onPress={() => setAddUserModalVisible(false)}
          >
              <ThemedView style={{ padding: 20, borderRadius: 10, width: 300 }}>
                  <ThemedText style={{ fontSize: 20, marginBottom: 10, alignContent: "center"}}>Enter User Email</ThemedText>
                  <ThemedTextInput
                      value={userEmail}
                      onChangeText={setUserEmail}
                      placeholder="user@gmail.com"
                      style={{ height: 70, padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 5 }}
                  />
                  <TouchableOpacity onPress={submitUser} style={{ marginTop: 10, padding: 10, backgroundColor: Colors.primary, borderRadius: 15 }}>
                      <ThemedText style={{ color: "white", textAlign: "center" }}>Add User</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={removeUser} style={{ marginTop: 10, padding: 10, backgroundColor: "red", borderRadius: 15 }}>
                      <ThemedText style={{ color: "white", textAlign: "center" }}>Remove User</ThemedText>
                  </TouchableOpacity>
              </ThemedView>
          </TouchableOpacity>
      </Modal>
      <ThemedView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10 }}>
      <ThemedText style={{ 
                      fontWeight: 700, 
                      textAlign: 'center', 
                      marginTop: 5, 
                      paddingVertical: 10, 
                      paddingHorizontal: 10, 
                      fontSize: 30, 
                      lineHeight: 30,
                      }}>
                          {selectedCookbook.name}
                  </ThemedText>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <ThemedText style={{ fontSize: 20 }}>⋮</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}
          onPress={() => setMenuVisible(false)}
        >
          <ThemedView style={{ padding: 20, borderRadius: 10, width: 200 }}>
            <TouchableOpacity onPress={addUserToCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText>Add/Remove User</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={editCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText>Edit Cookbook</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={addRecipesToCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText>Add Recipes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeRecipesFromCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText>Remove Recipes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteCookbook} style={{ paddingVertical: 10 }}>
              <ThemedText style={{color: "red"}}>Delete Cookbook</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </TouchableOpacity>
      </Modal>
      <ThemedScrollView style={{paddingHorizontal: 20}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                  <ThemedText style={{ 
                      fontWeight: 400, 
                      textAlign: 'center',
                      marginBottom: 10, 
                      paddingBottom: 10, 
                      fontSize: 20
                      }}>
                          {selectedCookbook.description}
                  </ThemedText>
                  <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                      <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                          {selectedCookbook.recipes?.map((recipe) => (
                              <ThemedView key={recipe.id} style={{ marginBottom: 10 }}>
                                  <RecipeCard recipe={recipe} />
                              </ThemedView>
                          ))}
                      </ThemedView>
                  </ThemedView>
                  <CustomButton text="Add Recipes" bgProps={{style: {marginVertical: 20}, onPress: addRecipesToCookbook}} />
              </ThemedScrollView>
    </SafeAreaView>
  );
}
