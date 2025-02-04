import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { IMAGES } from "../../assets/images/index";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS } from "@/constant/color";

const Login = () => {
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const [username, setUsername] = useState(""); // State to store username input
  const [error, setError] = useState(""); // State to store error message

  const handleSignIn = async () => {
    // Validate the username field
    if (!username.trim()) {
      setError("Username is required"); // Set error message if username is empty
      return;
    }

    // Clear any previous error
    setError("");

    // Store the username in AsyncStorage
    await AsyncStorage.setItem("userName", username);
    router.replace("/(tabs)/home"); // Redirect to the home page
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Image */}
      <Image
        source={IMAGES.extrac}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />

      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.subText}>Sign in to your account</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter any username to sign. No auth"
            placeholderTextColor={COLOURS.grey}
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => {
              setUsername(text); // Update username state
              setError(""); // Clear error when user starts typing
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={[
            styles.signInButton,
            !username.trim() && styles.disabledButton, // Disable button if username is empty
          ]}
          onPress={handleSignIn}
          disabled={!username.trim()} // Disable button if username is empty
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  image: {
    height: 150,
    marginTop: 20,
  },
  welcomeContainer: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 23,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  signInButton: {
    backgroundColor: "#38bdf8",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#a0d8f5", // Lighter color when disabled
  },
  signInButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 17,
    color: "#38bdf8",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  signUpText: {
    fontSize: 17,
    color: "#666",
  },
  signUpLink: {
    fontSize: 14,
    color: "#38bdf8",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
});
