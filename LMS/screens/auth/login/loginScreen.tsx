import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useState } from "react";
import { commonStyles } from "@/styles/Common/Common.stylesheet";
import { router } from "expo-router";
import axios from "axios";
// import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URI } from "@/utils/uri";
import React from "react";

const LoginScreen = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: "",
  });

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handlePasswordValidation = (value: string) => {
    const password = value; // Stores the input password value.
    
    // Regular expression to check for at least one special character.
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    // Regular expression to check for at least one numeric digit.
    const passwordOneNumber = /(?=.*[0-9])/;
    // Regular expression to ensure the password is at least 6 characters long.
    const passwordSixValue = /(?=.{6,})/;

    // Validates if the password contains a special character.
    if (!passwordSpecialCharacter.test(password)) {
      // Sets an error message if no special character is found.
      setError({
        ...error, // Keeps existing error state.
        password: "Write at least one special character", // Error message for special character requirement.
      });
      setUserInfo({ ...userInfo, password: "" }); // Clears the password field in userInfo.
    } 
    // Validates if the password contains a number.
    else if (!passwordOneNumber.test(password)) {
      // Sets an error message if no number is found.
      setError({
        ...error, // Keeps existing error state.
        password: "Write at least one number", // Error message for number requirement.
      });
      setUserInfo({ ...userInfo, password: "" }); // Clears the password field in userInfo.
    } 
    // Validates if the password is at least 6 characters long.
    else if (!passwordSixValue.test(password)) {
      // Sets an error message if the password is too short.
      setError({
        ...error, // Keeps existing error state.
        password: "Write at least 6 characters", // Error message for length requirement.
      });
      setUserInfo({ ...userInfo, password: "" }); // Clears the password field in userInfo.
    } 
    // If all validations pass:
    else {
      // Clears any password error messages.
      setError({
        ...error, // Keeps existing error state.
        password: "", // Clears password-specific error message.
      });
      setUserInfo({ ...userInfo, password: value }); // Sets the valid password in userInfo.
    }
  };

const handleSignin = async () => {
    await axios.post(`${SERVER_URI}/registeruser`, {
      email: userInfo.email,
      password: userInfo.password
      })
      .then(async (res)=> {
        await AsyncStorage.setItem("access_token", res.data.accessToken);
        await AsyncStorage.setItem("refresh_token", res.data.refreshToken);
        router.push("/(tabs)/home");
      })
      .catch((error)=> {
        Toast.show("Login failed", {type:"danger"})
      })
}
  


  return (
    <LinearGradient
    colors={["#E5ECF9", "#F6F7F9"]}
    style={{ flex: 1, paddingTop: 20 }}
  >
    <ScrollView>
      <Image
        style={styles.signInImage}
        source={require("@/assets/sign-in/sign_in.png")}
      />
      <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
        Welcome Back!
      </Text>
      <Text style={styles.learningText}>
        Login to your existing account of Becodemy
      </Text>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={[styles.input, { paddingLeft: 40 }]}
            keyboardType="email-address"
            value={userInfo.email}
            placeholder="support@becodemy.com"
            onChangeText={(value) =>
              setUserInfo({ ...userInfo, email: value })
            }
          />
          <Fontisto
            style={{ position: "absolute", left: 26, top: 17.8 }}
            name="email"
            size={20}
            color={"#A1A1A1"}
          />
          {required && (
            <View style={commonStyles.errorContainer}>
              <Entypo name="cross" size={18} color={"red"} />
            </View>
          )}
          <View style={{ marginTop: 15 }}>
            <TextInput
              style={commonStyles.input}
              keyboardType="default"
              secureTextEntry={!isPasswordVisible}
              defaultValue=""
              placeholder="********"
              onChangeText={handlePasswordValidation}
            />
            <TouchableOpacity
              style={styles.visibleIcon}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <Ionicons
                  name="eye-off-outline"
                  size={23}
                  color={"#747474"}
                />
              ) : (
                <Ionicons name="eye-outline" size={23} color={"#747474"} />
              )}
            </TouchableOpacity>
            <SimpleLineIcons
              style={styles.icon2}
              name="lock"
              size={20}
              color={"#A1A1A1"}
            />
          </View>
          {error.password && (
            <View style={[commonStyles.errorContainer, { top: 145 }]}>
              <Entypo name="cross" size={18} color={"red"} />
              <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                {error.password}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => router.push("/(routes)/forgotpassword")}
          >
            <Text
              style={[
                styles.forgotSection,
                { fontFamily: "Nunito_600SemiBold" },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 16,
              borderRadius: 8,
              marginHorizontal: 16,
              backgroundColor: "#2467EC",
              marginTop: 15,
            }}
            // onPress={handleSignIn}
          >
            {buttonSpinner ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: "Raleway_700Bold",
                }}
              >
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              gap: 10,
            }}
          >
            <TouchableOpacity>
              <FontAwesome name="google" size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="github" size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.signupRedirect}>
            <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(routes)/signup")}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Raleway_600SemiBold",
                  color: "#2467EC",
                  marginLeft: 5,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  </LinearGradient>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 50
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },
  learningText: {
    textAlign:"center",
    fontSize: 15,
    marginTop: 5,
    color: "#575757"
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  icon2: {
    position: "absolute",
    left: 23,
    top: 17.8,
    marginTop: -2,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
  },
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
})