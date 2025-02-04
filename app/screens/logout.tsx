import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutScreen: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/screens/login"); // Redirect to login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to logout?</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  logoutButton: { backgroundColor: "red", padding: 15, borderRadius: 10 },
  logoutText: { color: "#FFF", fontWeight: "bold" },
});
