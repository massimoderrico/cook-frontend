import { CustomButton } from "@/components/CustomButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Logo } from "@/components/Logo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView} from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { useSession } from "@/context";
import { useRouter } from "expo-router";




export default function SignIn() {
    const { login, signIn } = useSession();
    const {height, width} = useWindowDimensions();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>();
    const [username, setUsername] =  useState<string>();
    const [password, setPassword] =  useState<string>();
    const [confirmPassword, setConfirmPassword] =  useState<string>();
    const router = useRouter();


    const handleLogin = async () => {
        if (!email || !password) {
          Alert.alert('Error', 'Please enter both email and password');
          return;
        }
      
        try {
          await login(email, password);
          Alert.alert('Success', 'You are logged in!');
          router.replace('/(app)');
        } catch (error) {
          Alert.alert('Login Failed', 'Invalid credentials or server error');
        }
      };

    const handleSignUp = async () => {
        if (!email || !username || !password) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
        }
      
        try {
          await signIn(email, username, password);
          Alert.alert('Success', 'Account created! You are now logged in.');
          router.replace('/(app)'); // Navigate to home screen
        } catch (error) {
          Alert.alert('Sign-Up Failed', 'Error creating account. Please try again.');
        }
      };

    return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <ThemedScrollView contentContainerStyle={{alignItems: "center"}} style={{height: height, width: width, paddingTop: height/10}}>
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
                    <ThemedTextInput style={{ width: width/1.25, marginTop: 25}} placeholder="Email Address" value={email} onChangeText={setEmail}/>
                    <ThemedTextInput secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Password" value={password} onChangeText={setPassword}/>
                    <CustomButton text="Login" 
                        bgProps={{
                            onPress: () => {handleLogin},
                            style: {width: width/1.75, marginTop: 30 }}} />
                </ThemedView>
                :
                <ThemedView style={{ justifyContent: 'space-evenly', alignItems: "center" }}>
                    <ThemedTextInput style={{ width: width/1.25, marginTop: 25}} placeholder="Username" value={username} onChangeText={setUsername}/>
                    <ThemedTextInput style={{ width: width/1.25, marginTop: 25}} placeholder="Email Address" value={email} onChangeText={setEmail}/>
                    <ThemedTextInput secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Password" value={password} onChangeText={setPassword}/>
                    <ThemedTextInput secureTextEntry style={{ width: width/1.25, marginTop: 25}} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword}/>
                    <CustomButton 
                        text="Sign Up" 
                        bgProps={{
                            onPress: () => {handleSignUp},
                            style: {width: width/1.75, marginTop: 30 }
                        }} 
                    />
                </ThemedView>
                }
            </ThemedScrollView>
        </KeyboardAvoidingView>
    );

}
