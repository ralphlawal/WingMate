import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button } from "../../components/ui";
import { MOCK_USERS } from "../../mock";

type Props = NativeStackScreenProps<ProfileStackParamList, "BlockReport">;

const REASONS = [
  "Inappropriate messages",
  "Fake profile",
  "Harassment",
  "Spam",
  "Underage",
  "Other",
];

export default function BlockReportScreen({ navigation, route }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const user = MOCK_USERS.find((u) => u.id === route.params.userId) ?? MOCK_USERS[0];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Block or Report</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* User row */}
        <View style={styles.userCard}>
          <Image source={{ uri: user.photos[0] }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userSub}>@{user.name.toLowerCase()}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>WHY ARE YOU REPORTING?</Text>

        <View style={styles.reasons}>
          {REASONS.map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.reasonRow,
                selected === r && styles.reasonRowSelected,
              ]}
              onPress={() => setSelected(r)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.reasonText,
                  selected === r && { color: Colors.text.primary },
                ]}
              >
                {r}
              </Text>
              {selected === r ? (
                <Ionicons name="checkmark-circle" size={20} color={Colors.brand.pink} />
              ) : (
                <View style={styles.radio} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={`Report ${user.name}`}
          variant="danger"
          disabled={!selected}
          fullWidth
          size="md"
          onPress={() => navigation.goBack()}
        />
        <Button
          label={`Block ${user.name}`}
          variant="secondary"
          fullWidth
          size="md"
          onPress={() => navigation.goBack()}
          icon={<Ionicons name="ban-outline" size={16} color={Colors.text.secondary} />}
        />
      </View>
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
  closeBtn: { padding: 4 },
  title: { fontSize: 17, fontWeight: "700", color: Colors.text.primary },

  scroll: { padding: 20, paddingBottom: 160 },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    marginBottom: 24,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  userName: { fontSize: 16, fontWeight: "700", color: Colors.text.primary },
  userSub: { fontSize: 13, color: Colors.text.muted, marginTop: 2 },

  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.text.muted,
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 2,
  },

  reasons: { gap: 8 },
  reasonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bg.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  reasonRowSelected: {
    borderColor: Colors.brand.pink,
    backgroundColor: `${Colors.brand.pink}10`,
  },
  reasonText: { fontSize: 15, color: Colors.text.secondary, fontWeight: "500" },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
  },

  footer: {
    position: "absolute",
    bottom: 36,
    left: 20,
    right: 20,
    gap: 10,
  },
});
