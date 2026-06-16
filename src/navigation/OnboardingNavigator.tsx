import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../types";

import SplashScreen from "../screens/onboarding/SplashScreen";
import PhoneScreen from "../screens/onboarding/PhoneScreen";
import OTPScreen from "../screens/onboarding/OTPScreen";
import NameScreen from "../screens/onboarding/NameScreen";
import RoleScreen from "../screens/onboarding/RoleScreen";
import PhotoScreen from "../screens/onboarding/PhotoScreen";
import BioScreen from "../screens/onboarding/BioScreen";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: Platform.OS === "web" ? "none" : "slide_from_right" }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Role" component={RoleScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
      <Stack.Screen name="Bio" component={BioScreen} />
    </Stack.Navigator>
  );
}
