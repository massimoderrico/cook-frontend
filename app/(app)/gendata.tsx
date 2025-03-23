import { SafeAreaView, TouchableOpacity } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import dummyRecipes from "@/constants/dummyRecipes.json";
import { Recipe, RecipeCreatedirectionsInput, RecipeCreateingredientsInput, RecipeCreateInput } from "@/types/graphql";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const dummyRecipeList: RecipeCreateInput[] = dummyRecipes as RecipeCreateInput[]; 

const users = [
    { 
        "username" : "massimo",
        "password" : "massimo",
        "email" : "massimo@gmail.com",
    },
    { 
        "username" : "letao",
        "password" : "letao",
        "email" : "letao@gmail.com",
    },
    {   
        "username" : "lawrence",
        "password" : "lawrence",
        "email" : "lawrence@gmail.com",
    },
    {   
        "username" : "kristian",
        "password" : "kristian",
        "email" : "kristian@gmail.com",
    },
    {   
        "username" : "nicolas",
        "password" : "nicolas",
        "email" : "nicolas@gmail.com",
    },
]



export const CREATE_RECIPE = gql`
  mutation CreateRecipe($data: RecipeCreateInput!) {
    createRecipe(data: $data) {
      id
      name
      description
    }
  }
`;

const SIGNIN = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signup(data: { email: $email, username: $username, password: $password }) {
      accessToken
      userId
      email
      username
    }
  }
`;

const CREATE_COOKBOOK = gql`
    mutation CreateCookbook($data: CookbookCreateInput!) {
        createCookbook(data: $data) {
            id
            name
            description
        }
    }
`;



export default function genData() {
    const [createRecipe, { loading, data, error }] = useMutation(CREATE_RECIPE);
    const [createCookbook, { loading: cookbookLoading, data: cookbookData, error: cookbookError }] = useMutation(CREATE_COOKBOOK);
    const [signInMutation, { loading: signInLoading }] = useMutation(SIGNIN);
    const backgroundColor = useThemeColor("background")
    const [userIDs, setUserIDs] = useState<number[]>([])
    const numRecipesPerUser = 2;
    
    const createDummyRecipes = async () => {
        for (var user = 0; user < users.length; user++) {
            try {
            await signInMutation({ variables: { email: users[user].email, username: users[user].username, password: users[user].password } }).then(async (result) => {
            const userId = result.data.signup.userId;
            setUserIDs([...userIDs, userId]);
            for (var i = 0; i < numRecipesPerUser; i++) {
                const recipeNum  = user * numRecipesPerUser + i
                const recipe = dummyRecipeList[recipeNum];
                try {
                    await createRecipe({ variables: { data: { ...recipe, user: { connect: { id: userId } } } } });
                } catch (e) {
                    console.error(e);
                }
            }
        })} catch (e) {
            console.error(e);
        }
    }}

    return (
        <SafeAreaView
        style={{backgroundColor:backgroundColor}}>
            <TouchableOpacity onPress={() => createDummyRecipes()}>
                <ThemedText>Generate Dummy Data</ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    )
}