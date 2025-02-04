import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Text,
} from "react-native";
import React from "react";
import { COLOURS } from "@/constant/color";
import { IMAGES } from "@/assets/images";

const Avatar = () => {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const { width } = useWindowDimensions();
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
                      // textAlign: "center",
            marginVertical:3,
            fontWeight: "500",
          }}
        >
          Azay Genius
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
    //   padding: 2,
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
