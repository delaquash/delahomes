import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import Button from "@/components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";
Button

const VerifyAccountScreen = () => {
  // Initialize the state with an array of empty strings for code input
  const [code, setCode] = useState(new Array(4).fill(""));

  // Create an array of refs for each TextInput using useRef
  const inputs = useRef([...Array(4)].map(() => React.createRef<TextInput>()));

  // Handle input changes for each TextInput
  const handleInput = (text: any, index: any) => {
    // Create a copy of the current code array
    const newCode = [...code];
    // Update the specific index with the new input
    newCode[index] = text;
    setCode(newCode); // Update the state with the new code array

    // If a character is entered and not on the last input, 
    // focus the next input
    if (text && index < 3) {
      inputs.current[index + 1].current?.focus();
    }
    // If character is deleted and not on the first input, 
    // focus the previous input
    if (text === "" && index > 0) {
      inputs.current[index - 1].current?.focus();
    }
  };
  
const handleSubmit =async () => {
  const otp = code.join("");
  const activation_token = await AsyncStorage.getItem("activation_token");
  await axios.post(`${SERVER_URI}/activate-user`, {
    activation_token,
    activation_code: otp
  })
  .then((res: any)=> {
    Toast.show("Account activated successfully...", {
      type: "success",
      duration: 6000
    })
    setCode(new Array(4).fill(""));
    router.push("/(routes)/login")
  }).catch((error)=> {
    Toast.show("Invalid or expired OTP",{ type: "danger"})
  })
}

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Verification Code</Text>
      <Text style={styles.subText}>
        We have sent the verification code to your email address
      </Text>
      <View style={styles.inputContainer}>
        {/* Render code inputs with FlatList */}
        <FlatList
          data={code} // Provide code array as data to FlatList
          keyExtractor={(_, index) => index.toString()} // Unique key for each item based on index
          horizontal // Render FlatList items horizontally in a row
          renderItem={({ item, index }) => (
            // Render a TextInput for each item in the code array
            <TextInput
              style={styles.inputBox} // Apply styling to each TextInput
              keyboardType="number-pad" // Set keyboard to number pad
              maxLength={1} // Limit input to one character
              onChangeText={(text) => handleInput(text, index)} // Handle text input for each TextInput
              value={item} // Set value to the current item in the code array
              ref={inputs.current[index]} // Assign the ref for each TextInput
              autoFocus={index === 0} // Auto-focus the first input on load
            />
          )}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Submit" 
        onPress={handleSubmit} 
        />
      </View>
      <View style={styles.loginLink}>
        <Text style={[styles.backText, { fontFamily: "Nunito_700Bold" }]}>
          Back To
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.loginText, { fontFamily: "Nunito_700Bold" }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  inputBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    marginRight: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  loginLink: {
    flexDirection: "row",
    marginTop: 30,
  },
  loginText: {
    color: "#3876EE",
    marginLeft: 5,
    fontSize: 16,
  },
  backText: { fontSize: 16 },
});

export default VerifyAccountScreen;
