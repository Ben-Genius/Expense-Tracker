import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Avatar from "@/components/home/avatar";
import { IconSymbol } from "@/components/IconSymbol.ios";
import { COLOURS } from "@/constant/color";
import DebitCardUI from "@/components/home/debitCard";
import Wallet from "@/components/home/wallet";
import AnalyticsCard from "@/components/home/analytics";
import RecentTransactions from "../screens/recentTransactions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <>
      <StatusBar style="dark"/>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.avatargreetings}>
          <View>
            <Avatar />
          </View>
          <MaterialCommunityIcons
            name="bell-outline"
            color={COLOURS.grey}
            size={24}
          />
        </View>
        {/* <DebitCardUI
      /> */}
        <ScrollView>
          <Wallet />
          <AnalyticsCard />

          <RecentTransactions />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  avatargreetings: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    paddingTop: 20,
  },
});
