import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types";

import HomeScreen from "../screens/home/HomeScreen";
import VenueDetailScreen from "../screens/venue/VenueDetailScreen";
import UserProfileScreen from "../screens/profile/UserProfileScreen";
import SignalScreen from "../screens/venue/SignalScreen";
import WingRequestScreen from "../screens/venue/WingRequestScreen";
import MatchConfirmationScreen from "../screens/venue/MatchConfirmationScreen";
import MyQRScreen from "../screens/home/MyQRScreen";
import ScanQRScreen from "../screens/home/ScanQRScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}>
      <Stack.Screen name="HomeMap" component={HomeScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Signal" component={SignalScreen} />
      <Stack.Screen name="WingRequest" component={WingRequestScreen} />
      <Stack.Screen
        name="MatchConfirmation"
        component={MatchConfirmationScreen}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="MyQR"
        component={MyQRScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="ScanQR"
        component={ScanQRScreen}
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
}
