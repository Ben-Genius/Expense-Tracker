import { Image, Text, View } from "react-native";
import { IMAGES } from "../assets/images/index";
import Onboarding from "@/app/screens/onboarding/onboarding";
import { COLOURS } from "@/constant/color";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOURS.white,
      }}
    >
      <Onboarding />
    </View>
  );
}
