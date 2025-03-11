import { KeyboardAvoidingView } from "react-native"
import { ThemedScrollView } from "../ThemedScrollView"
import { useContext, useState } from "react"
import { ThemedTextInput } from "../ThemedTextInput"
import { Colors } from "@/constants/Colors"
import { ThemedView } from "../ThemedView"
import { ThemedText } from "../ThemedText"
import { ThemedDropdown } from "../ThemedDropdown"
import { ContentType, Recipe } from "@/types/graphql"
import { CustomButton } from "../CustomButton"
import { gql, useLazyQuery } from "@apollo/client"
import { RecipeCard } from "../RecipeCard"
import { useSession } from "@/context"


const SEARCH_COOKBOOK = gql`
  query SearchCookbook($query: String!) {
    searchCookbook(query: $query) {
      id
      name
      description
    }
  }
`;

const SEARCH_RECIPES = gql`
  query SearchRecipes($query: String!) {
    searchRecipes(query: $query) {
      id
      name
      description
      ingredients
      directions
      prepTime
      cookTime
      rating
      image
    }
  }
`;


export const SearchPage = ( ) => {
    const [searchQuery, onEnterSearchQuery] = useState<string>()
    const [contentType, setContentType] = useState<string>()
    const [searchCookbooks, {loading: cookbookLoading, data: cookbookData, error: cookbookError}] = useLazyQuery(SEARCH_COOKBOOK)
    const [searchRecipes, {loading: recipeLoading, data: recipeData, error: recipeError}] = useLazyQuery(SEARCH_RECIPES)

    const searchContent = () => {
        if (contentType === "Cookbook") {
            searchCookbooks({ variables: { query: searchQuery } })
            console.log(cookbookData?.searchCookbook)
        } else if (contentType === "Recipe") {
            searchRecipes({ variables: { query: searchQuery } })
            console.log(recipeData?.searchRecipes)
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" >
            <ThemedView style={{paddingHorizontal: 30}} >
                <ThemedTextInput 
                iconProps={{name: "search", color: Colors.primary}}
                placeholder="Search Query"
                value={searchQuery}
                onChangeText={onEnterSearchQuery}
                style={{
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: Colors.primary,
                }} 
                />
                <ThemedView style= {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                    <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                        <ThemedText fontWeight={500}>
                            Content Type
                        </ThemedText>
                    </ThemedView>
                    <ThemedDropdown
                        textAlign="center" 
                        data={ContentType} 
                        labelField={"label"} 
                        valueField={"value"} 
                        onChange={(item) => setContentType(item.value)}
                        style={{ paddingLeft: 10, minWidth: 160, alignContent: 'center', alignItems: 'center'}}
                        placeholder="Select"
                        maxHeight={225}
                    />
                </ThemedView>
                <CustomButton 
                text="Search" 
                bgProps={{style: {marginVertical: 30}, 
                onPress: () => {searchContent()}
                }} />
            </ThemedView>
            <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} >
                { recipeData && recipeData?.searchRecipes.map((recipe: Recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
                ))}
            </ThemedScrollView>
        </KeyboardAvoidingView>
    )
}
