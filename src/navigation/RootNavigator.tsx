import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

import OnboardingNavigator from "./OnboardingNavigator";
import MainNavigator from "./MainNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // Toggle this to switch between onboarding and main app during development
  const [isOnboarded] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : null}
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}
