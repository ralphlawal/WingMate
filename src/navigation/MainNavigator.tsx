import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainTabParamList } from "../types";
import { Colors } from "../theme";
import HomeNavigator from "./HomeNavigator";
import ChatNavigator from "./ChatNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator<MainTabParamList>();

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

function TabItem({
  icon,
  label,
  focused,
  badge,
}: {
  icon: IoniconsName;
  label: string;
  focused: boolean;
  badge?: number;
}) {
  return (
    <View style={s.item}>
      <View style={{ position: "relative" }}>
        <Ionicons
          name={focused ? icon : (`${icon}-outline` as IoniconsName)}
          size={24}
          color={focused ? Colors.brand.pink : Colors.text.muted}
        />
        {badge && badge > 0 ? (
          <View style={s.badge}>
            <Text style={s.badgeText}>{badge > 9 ? "9+" : badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[s.label, focused && s.labelActive]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  item: { alignItems: "center", gap: 3, paddingTop: 6 },
  label: { fontSize: 10, fontWeight: "600", color: Colors.text.muted, letterSpacing: 0.3 },
  labelActive: { color: Colors.brand.pink },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: Colors.brand.pink,
    borderRadius: 9,
    minWidth: 17,
    height: 17,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: "#1C1C28",
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
});

export default function MainNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom > 0 ? insets.bottom + 8 : 24,
          left: 20,
          right: 20,
          backgroundColor: "#1C1C28",
          borderRadius: 28,
          borderWidth: 1,
          borderColor: Colors.border.default,
          height: 66,
          paddingBottom: 0,
          paddingTop: 0,
          elevation: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.55,
          shadowRadius: 22,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem icon="map" label="Discover" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem icon="heart" label="Matches" focused={focused} badge={2} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem icon="person" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
