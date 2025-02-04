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

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.avatargreetings}>
        <View>
          <Avatar />
        </View>
        <IconSymbol name={"bell.badge"} color={COLOURS.primary} size={30} />
      </View>
      {/* <DebitCardUI
      /> */}
      <ScrollView>
        <Wallet />
        <AnalyticsCard />

       <RecentTransactions/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  avatargreetings: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 14, // Increased from 20
    margin: 20, // Increased from 16
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderBottomColor: COLOURS.lightGrey,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  viewButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  viewText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  analyticsIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#666666",
  },
});
