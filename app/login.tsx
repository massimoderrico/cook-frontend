import { CustomButton } from "@/components/CustomButton";
import { InputTextbox } from "@/components/InputTextbox";
import { Logo } from "@/components/Logo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView} from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { StyleSheet } from "react-native";


export const Login = () => {
    const {height, width} = useWindowDimensions();
    const [isLogin, setIsLogin] = useState(false);
    return (
        <ThemedView style={{height: height, width: width, alignItems: "center", paddingTop: height/7}}>
            <Logo width={width/2} height={width/2.5}/>
            <ThemedText type="title">
                CooK
            </ThemedText>
            <ThemedView style={{marginTop: 30, flexDirection: "row", justifyContent: 'space-evenly', width: width}}>
                <TouchableOpacity style={{width: width/3}} onPress={() => setIsLogin(true)}>
                    <ThemedText style={{ textAlign: "center"}} type={"tabtitle"}>
                        Login
                    </ThemedText>
                    <View style={{marginTop: 5, height: 5, backgroundColor: isLogin ? Colors.primary: "transparent" }}/>
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/3}} onPress={() => setIsLogin(false)}>
                    <ThemedText style={{ textAlign: "center"}} type={"tabtitle"}>
                        Sign up
                    </ThemedText>
                    <View style={{marginTop: 5, height: 5, backgroundColor: isLogin ? "transparent" : Colors.primary}}/>
                </TouchableOpacity>
                
            </ThemedView>
            {isLogin ?
            <ThemedView style={{ justifyContent: 'space-evenly', alignItems: "center" }}>
                <InputTextbox style={{ width: width/1.25, marginTop: 25}} placeholder="Email Address"/>
                <InputTextbox secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Password"/>
                <CustomButton text="Login" bgProps={{style: {width: width/1.75, marginTop: 30 }}} />
            </ThemedView>
            :
            <ThemedView style={{ justifyContent: 'space-evenly', alignItems: "center" }}>
                <InputTextbox style={{ width: width/1.25, marginTop: 25}} placeholder="Username"/>
                <InputTextbox style={{ width: width/1.25, marginTop: 25}} placeholder="Email Address"/>
                <InputTextbox secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Password"/>
                <InputTextbox secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Confirm Password"/>
                <CustomButton text="Sign Up" bgProps={{style: {width: width/1.75, marginTop: 30 }}} />
            </ThemedView>
            }
        </ThemedView>
    );

}

// const styles = StyleSheet.create({
//     inputText: {
//         width: width/1.25, 
//         marginTop: 25
//     }
// })