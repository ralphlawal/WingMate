import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../types";
import { Colors } from "../../theme";

type Props = NativeStackScreenProps<ProfileStackParamList, "Settings">;
type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

type SettingRow =
  | { type: "toggle"; key: string; label: string; sub?: string; icon: IoniconsName; defaultValue: boolean }
  | { type: "link"; label: string; sub?: string; icon: IoniconsName; value?: string };

const SECTIONS: { title: string; rows: SettingRow[] }[] = [
  {
    title: "Visibility",
    rows: [
      { type: "toggle", key: "map", label: "Show me on map", sub: "Others can see you at venues", icon: "location-outline", defaultValue: true },
      { type: "toggle", key: "role", label: "Show my role", sub: "Singles & wings see your badge", icon: "person-outline", defaultValue: true },
      { type: "link", label: "Who can signal me", sub: "Everyone", icon: "radio-outline" },
    ],
  },
  {
    title: "Notifications",
    rows: [
      { type: "toggle", key: "matches", label: "Match alerts", icon: "heart-outline", defaultValue: true },
      { type: "toggle", key: "signals", label: "New signals", icon: "flash-outline", defaultValue: true },
      { type: "toggle", key: "messages", label: "Messages", icon: "chatbubble-outline", defaultValue: true },
      { type: "toggle", key: "nearby", label: "Nearby friends checked in", icon: "people-outline", defaultValue: false },
    ],
  },
  {
    title: "Account",
    rows: [
      { type: "link", label: "Phone number", sub: "+1 (555) 000-0000", icon: "call-outline" },
      { type: "link", label: "Blocked users", icon: "ban-outline" },
      { type: "link", label: "Privacy policy", icon: "shield-checkmark-outline" },
      { type: "link", label: "Terms of service", icon: "document-text-outline" },
    ],
  },
];

export default function SettingsScreen({ navigation }: Props) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    map: true,
    role: true,
    matches: true,
    signals: true,
    messages: true,
    nearby: false,
  });

  const flip = (key: string) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.rows.map((row, i) => (
                <View key={row.label}>
                  <View style={styles.row}>
                    <View style={styles.iconWrap}>
                      <Ionicons name={row.icon} size={16} color={Colors.brand.pink} />
                    </View>
                    <View style={styles.rowContent}>
                      <Text style={styles.rowLabel}>{row.label}</Text>
                      {row.sub ? <Text style={styles.rowSub}>{row.sub}</Text> : null}
                    </View>
                    {row.type === "toggle" ? (
                      <Switch
                        value={toggles[row.key]}
                        onValueChange={() => flip(row.key)}
                        trackColor={{ false: Colors.bg.elevated, true: Colors.brand.pink }}
                        thumbColor="#fff"
                        ios_backgroundColor={Colors.bg.elevated}
                      />
                    ) : (
                      <View style={styles.linkRight}>
                        {row.value ? (
                          <Text style={styles.linkValue}>{row.value}</Text>
                        ) : null}
                        <Ionicons name="chevron-forward" size={15} color={Colors.text.muted} />
                      </View>
                    )}
                  </View>
                  {i < section.rows.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color="#FF453A" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>WingMate v0.1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  backBtn: { padding: 4 },
  title: { fontSize: 17, fontWeight: "700", color: Colors.text.primary },

  scroll: { padding: 20, paddingBottom: 60, gap: 24 },

  section: { gap: 10 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 4,
  },
  sectionCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${Colors.brand.pink}18`,
    alignItems: "center",
    justifyContent: "center",
  },
  rowContent: { flex: 1, gap: 2 },
  rowLabel: { fontSize: 15, color: Colors.text.primary, fontWeight: "500" },
  rowSub: { fontSize: 12, color: Colors.text.muted },
  divider: { height: 1, backgroundColor: Colors.border.subtle, marginLeft: 62 },
  linkRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  linkValue: { fontSize: 13, color: Colors.text.muted },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FF453A15",
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#FF453A25",
  },
  logoutText: { color: "#FF453A", fontSize: 15, fontWeight: "600" },
  version: { textAlign: "center", color: Colors.text.muted, fontSize: 12 },
});
