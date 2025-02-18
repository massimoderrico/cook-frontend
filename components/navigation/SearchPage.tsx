import { KeyboardAvoidingView } from "react-native"
import { ThemedScrollView } from "../ThemedScrollView"
import { useState } from "react"
import { ThemedTextInput } from "../ThemedTextInput"
import { Colors } from "@/constants/Colors"
import { ThemedView } from "../ThemedView"
import { ThemedText } from "../ThemedText"
import { ThemedDropdown } from "../ThemedDropdown"
import { ContentType } from "@/types/graphql"
import { CustomButton } from "../CustomButton"

export const SearchPage = ( ) => {
    const [searchQuery, onEnterSearchQuery] = useState<string>()
    const [contentType, setContentType] = useState<string>()

    return (
        <KeyboardAvoidingView behavior="position" >
            <ThemedScrollView style={{paddingHorizontal: 30}} showsVerticalScrollIndicator={false} >
                <ThemedTextInput 
                placeholder="Search Query"
                value={searchQuery}
                onChangeText={onEnterSearchQuery}
                style={{
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: Colors.primary,
                    paddingLeft: 10
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
                <CustomButton text="Search" bgProps={{style: {marginVertical: 30}, onPress: () => console.log(searchQuery, contentType)}} />
            </ThemedScrollView>
        </KeyboardAvoidingView>
    )
}