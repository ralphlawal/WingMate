import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types";

import MyProfileScreen from "../screens/profile/MyProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import BlockReportScreen from "../screens/settings/BlockReportScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="BlockReport" component={BlockReportScreen} options={{ animation: "slide_from_right" }} />
    </Stack.Navigator>
  );
}
