import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { COLOURS } from "@/constant/color";
import SettingsItem from "@/components/settings/settingsItem";

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  icon: string;
  onPress?: () => void;
  color?: string;
  isLast?: boolean;
}

const SettingsSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const Setting: React.FC = () => {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 80],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 1],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Text
          style={[styles.headerTitle, { opacity: headerTitleOpacity }]}
        >
          Settings
        </Animated.Text>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <SettingsSection title="Account">
          <SettingsItem
            title="Profile"
            subtitle="Edit user details & avatar"
            icon="account-circle"
            color={COLOURS.primary}
          />
        </SettingsSection>

        <SettingsSection title="App Settings">
          <SettingsItem
            title="Preferences"
            subtitle="Theme, Currency, Notifications"
            icon="cog"
          />
          <SettingsItem
            title="Privacy & Data"
            subtitle="Clear transactions, reset app, backup"
            icon="shield-lock"
          />
          <SettingsItem
            title="About"
            subtitle="App version, developer info"
            icon="information"
            isLast
          />
        </SettingsSection>

        <View style={styles.logoutContainer}>
          <SettingsItem
            title="Logout"
            subtitle="Sign out from the app"
            icon="logout"
            color={COLOURS.red}
            onPress={() => router.replace("/screens/logout")}
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOURS.grey,
    marginBottom: 12,
    marginLeft: 12,
  },
  sectionContent: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
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
    color: COLOURS.grey,
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
  logoutContainer: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
});

export default Setting;
