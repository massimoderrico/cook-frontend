import { CustomButton } from "@/components/CustomButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Logo } from "@/components/Logo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView} from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, TouchableOpacity, useWindowDimensions, View, Text } from "react-native";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { useSession } from "@/context";
import { useRouter } from "expo-router";
import { Fonts } from "@/constants/Fonts";

export default function SignIn() {
    const { login, signIn } = useSession();
    const {height, width} = useWindowDimensions();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>();
    const [username, setUsername] =  useState<string>();
    const [password, setPassword] =  useState<string>();
    const [confirmPassword, setConfirmPassword] =  useState<string>();
    const [displayError, setDisplayError] = useState<string>("");
    const router = useRouter();

    const handleLogin = async () => {
        if (email && password) {
            try {
                await login(email, password);
                Alert.alert('Success', 'You are logged in!');
                router.replace('/(app)');
            } catch (error) {
                Alert.alert('Login Failed', 'Invalid credential');
            }
      }}

    const handleSignUp = async () => {
        if (email && username && password) {
            try {
                await signIn(email, username, password);
                Alert.alert('Success', 'Account created! You are now logged in.');
                router.replace('/(app)'); 
            } catch (error) {
                Alert.alert('Sign-Up Failed', 'Error creating account. Please try again.');
            }
      }}

      const handleDisplayError = () => {
        if(isLogin){
            if(!email || !password){
                setDisplayError("Must input email and password")
            }
            else{
                handleLogin()
            }
        }
        else{
            if( !email || !username || !password || !confirmPassword){
                setDisplayError("Fields cannot be empty")
            }
            else if(password !== confirmPassword){
                setDisplayError("Passwords do not match")
            }
            else{
                handleSignUp()
            }
    }}

    return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <ThemedScrollView contentContainerStyle={{alignItems: "center"}} style={{height: height, width: width, paddingTop: height/10}}>
                <Logo width={width/2} height={width/2.5}/>
                <ThemedText type="title">
                    CooK
                </ThemedText>
                <ThemedView style={{marginTop: 30, flexDirection: "row", justifyContent: 'space-evenly', width: width}}>
                    <TouchableOpacity style={{width: width/3}} onPress={() => {setIsLogin(true); setDisplayError("")}}>
                        <ThemedText style={{ textAlign: "center"}} type={"tabtitle"}>
                            Login
                        </ThemedText>
                        <View style={{marginTop: 5, height: 5, backgroundColor: isLogin ? Colors.primary: "transparent" }}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: width/3}} onPress={() => {setIsLogin(false); setDisplayError("")}}>
                        <ThemedText style={{ textAlign: "center"}} type={"tabtitle"}>
                            Sign up
                        </ThemedText>
                        <View style={{marginTop: 5, height: 5, backgroundColor: isLogin ? "transparent" : Colors.primary}}/>
                    </TouchableOpacity>
                </ThemedView>
                {isLogin ?
                <ThemedView style={{ justifyContent: 'space-evenly', alignItems: "center" }}>
                    <ThemedTextInput style={{ width: width/1.25, marginTop: 25}} placeholder="Email Address" value={email} onChangeText={setEmail}/>
                    <ThemedTextInput secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Password" value={password} onChangeText={setPassword}/>
                    <CustomButton text="Login" 
                        bgProps={{
                            onPress: () => handleDisplayError(),
                            style: {width: width/1.75, marginTop: 30 }}} />
                </ThemedView>
                :
                <ThemedView style={{ justifyContent: 'space-evenly', alignItems: "center" }}>
                    <ThemedTextInput style={{ width: width/1.25, marginTop: 25}} placeholder="Username" value={username} onChangeText={setUsername}/>
                    <ThemedTextInput style={{ width: width/1.25, marginTop: 25}} placeholder="Email Address" value={email} onChangeText={setEmail}/>
                    <ThemedTextInput secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Password" value={password} onChangeText={setPassword}/>
                    <ThemedTextInput secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword}/>
                    <Text style={{color: Colors.error, fontSize: 16, marginTop: 10, fontFamily: Fonts(600) }}>
                        { displayError? displayError : ""}
                    </Text>
                    <CustomButton 
                        text="Sign Up" 
                        bgProps={{
                            onPress: () => handleDisplayError(),
                            style: {width: width/1.75, marginTop: 10}
                        }} 
                    />
                </ThemedView>
                }
            </ThemedScrollView>
        </KeyboardAvoidingView>
    );

}
