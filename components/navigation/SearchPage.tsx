import { KeyboardAvoidingView, Platform } from "react-native"
import { ThemedScrollView } from "../ThemedScrollView"
import { useContext, useState } from "react"
import { ThemedTextInput } from "../ThemedTextInput"
import { Colors } from "@/constants/Colors"
import { ThemedView } from "../ThemedView"
import { ThemedText } from "../ThemedText"
import { ThemedDropdown } from "../ThemedDropdown"
import { CustomButton } from "../CustomButton"
import { gql, useLazyQuery } from "@apollo/client"
import { RecipeCard } from "../RecipeCard"
import { useSession } from "@/context"
import { Searchbar } from "../Searchbar"
import { ContentType } from "@/constants/Data"
import { Cookbook, Recipe } from "@/types/graphql"
import { CookbookCard } from "../CookbookCard"


const SEARCH_COOKBOOK = gql`
  query SearchCookbook($query: String!) {
    searchCookbook(query: $query) {
      id
      name
      description
      isPublic
      isMainCookbook
      rating
      recipes {
        id
        name
        image
        description
        ingredients
        directions
        cookTime
        prepTime
        rating
        isPublic
      }
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
      isPublic
    }
  }
`;


export const SearchPage = ( ) => {
    const [searchQuery, onEnterSearchQuery] = useState<string>()
    const [contentType, setContentType] = useState<string>()
    const [searchCookbooks, {loading: cookbookLoading, data: cookbookData, error: cookbookError}] = useLazyQuery(SEARCH_COOKBOOK, {
        fetchPolicy: 'network-only',
      });
    const [searchRecipes, {loading: recipeLoading, data: recipeData, error: recipeError}] = useLazyQuery(SEARCH_RECIPES, {
        fetchPolicy: 'network-only', 
      });
    const [hasSearched, setHasSearched] = useState(false);

    const searchContent = () => {
        setHasSearched(true);
        if (contentType === "Cookbook") {
            searchCookbooks({ variables: { query: searchQuery } })
            console.log(cookbookData?.searchCookbook)
        } else if (contentType === "Recipe") {
            searchRecipes({ variables: { query: searchQuery } })
            console.log(recipeData?.searchRecipes)
        }
    }

    const isRecipe = contentType === "Recipe";
    const data = isRecipe ? recipeData?.searchRecipes : cookbookData?.searchCookbook;

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ThemedView style={{paddingHorizontal: 30}} >
                <Searchbar 
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
            <ThemedScrollView style={{ paddingHorizontal: 20, flex: 1 }} contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false} keyboardDismissMode="on-drag">
        {recipeLoading || cookbookLoading ? (
          <ThemedText>Loading...</ThemedText>
        ) : data?.length ? (
            isRecipe ? (
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ThemedView style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>
                    {data.map((item: Recipe) => (
                <ThemedView key={item.id} style={{ marginBottom: 10 }}>
              <RecipeCard recipe={item as Recipe} key={item.id} />
              </ThemedView>
              ))}
              </ThemedView>
            </ThemedView>
            ) : (
                <ThemedView style={{justifyContent: 'center', alignItems: 'center'}}>
                    {data.map((item: Cookbook) => (
                <ThemedView key={item.id} style={{ marginBottom: 10 }}>
              <CookbookCard cookbook={item as Cookbook} key={item.id} />
              </ThemedView>
                    ))}
              </ThemedView>
            )
        ) : hasSearched ? (
            <ThemedText>No results found.</ThemedText>
          ) : null}
        </ThemedScrollView>
        </KeyboardAvoidingView>
    )
}
