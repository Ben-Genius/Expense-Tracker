import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ColorValue,
} from "react-native";
import { SymbolView } from "expo-symbols";
import { COLOURS } from "@/constant/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface SettingsItemProps {
  title: string;
  subtitle?: string;
  icon: string;
  onPress?: () => void;
  color?: ColorValue;
  isLast?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  color = COLOURS.primary,
  isLast = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Convert color to string and add transparency
  const getBackgroundColor = (baseColor: ColorValue): string => {
    if (typeof baseColor === "string") {
      return `${baseColor}10`; // Add 10% opacity
    }
    return "rgba(0, 0, 0, 0.1)"; // Fallback
  };

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        { transform: [{ scale: scaleAnim }] },
        isLast && styles.lastItem,
      ]}
    >
      <TouchableOpacity
        style={styles.item}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.9}
      >
        <View style={styles.itemContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: getBackgroundColor(color) },
            ]}
          >
            <MaterialCommunityIcons name={icon} style={styles.icon} color={color} size={20} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color }]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: COLOURS.grey }]}>
                {subtitle}
              </Text>
            )}
          </View>

          <MaterialCommunityIcons name="chevron-right" style={styles.chevron} color={COLOURS.grey} size={20} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFF",
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    width: 22,
    height: 22,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  chevron: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  lastItem: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});

export default SettingsItem;
