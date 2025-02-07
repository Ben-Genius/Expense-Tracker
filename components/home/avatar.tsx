import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOURS } from "@/constant/color";
import { IMAGES } from "@/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Avatar = () => {
  const [userName, setUserName] = useState(""); // State to store the username
  const { width } = useWindowDimensions();

  useEffect(() => {
    // Fetch the stored username from AsyncStorage
    const fetchUserName = async () => {
      const name = await AsyncStorage.getItem("userName");
      if (name) {
        setUserName(name);
      }
    };

    fetchUserName();
  }, []);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,

      }}
    >
      <View style={styles.container}>
        <View style={styles.container2}>
          <Image
            source={IMAGES.react}
            style={[
              styles.image,
              { width: width * 0.13, height: width * 0.25 },
            ]}
          />
        </View>
      </View>
      <View>
        <Text
          style={{ fontSize: 20, fontWeight: "500", color: COLOURS.primary }}
        >
          {getGreeting()} 👋🏼
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLOURS.darkGrey,
            marginVertical: 3,
            fontWeight: "500",
          }}
        >
          {userName || "Guest"}{" "}
          {/* Display the username or "Guest" if not available */}
        </Text>
      </View>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.primary,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  container2: {
    backgroundColor: COLOURS.white,
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
    padding: 4,
  },
});
