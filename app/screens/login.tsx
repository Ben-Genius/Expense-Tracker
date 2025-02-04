import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { IMAGES } from "../../assets/images/index";
import React from "react";
import { useRouter } from "expo-router";

const Login = () => {
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  const handleSignIn = () => {
    router.replace("/(tabs)/home"); // Redirect to the home page in the bottomTab folder
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
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
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
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
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
});
