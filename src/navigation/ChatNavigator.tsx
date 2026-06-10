import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatStackParamList } from "../types";

import MatchesListScreen from "../screens/chat/MatchesListScreen";
import ChatThreadScreen from "../screens/chat/ChatThreadScreen";

const Stack = createNativeStackNavigator<ChatStackParamList>();

export default function ChatNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MatchesList" component={MatchesListScreen} />
      <Stack.Screen
        name="ChatThread"
        component={ChatThreadScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}
