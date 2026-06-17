import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList, UserRole } from "../../types";
import { Colors, RoleConfig } from "../../theme";
import { Button } from "../../components/ui";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Role">;

const roles: UserRole[] = ["single", "wing"];

const ROLE_DETAIL: Partial<Record<UserRole, { tip: string }>> = {
  single: { tip: "Show up on map. Get signals. Match at venues." },
  wing: { tip: "Help a friend meet someone tonight. Play cupid." },
};

const WING_REASONS = [
  "Everyone deserves a little backup.",
  "to make the introduction easier.",
  "Some missions are better with a co-pilot.",
];

export default function RoleScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<UserRole | null>(null);
  const [wingReason, setWingReason] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="chevron-back" size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Progress */}
        <View style={styles.progress}>
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              style={[styles.progressBar, step <= 2 && styles.progressBarActive]}
            />
          ))}
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>Who are you tonight?</Text>
          <Text style={styles.subtitle}>You can change this any time.</Text>
        </View>

        <View style={styles.cards}>
          {roles.map((role) => {
            const config = RoleConfig[role];
            const detail = ROLE_DETAIL[role] ?? { tip: "" };
            const isSelected = selected === role;

            return (
              <TouchableOpacity
                key={role}
                onPress={() => setSelected(role)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={
                    isSelected
                      ? [`${config.color}22`, `${config.color}08`]
                      : [Colors.bg.card, Colors.bg.card]
                  }
                  style={[
                    styles.card,
                    {
                      borderColor: isSelected ? config.color : Colors.border.subtle,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                >
                  {/* Emoji block */}
                  <View
                    style={[
                      styles.emojiWrap,
                      { backgroundColor: `${config.color}18` },
                    ]}
                  >
                    <Text style={styles.emoji}>{config.emoji}</Text>
                  </View>

                  {/* Text */}
                  <View style={styles.cardText}>
                    <Text
                      style={[
                        styles.cardLabel,
                        isSelected && { color: config.color },
                      ]}
                    >
                      {config.label}
                    </Text>
                    <Text style={styles.cardDesc}>{config.description}</Text>
                    {isSelected && role === "wing" && (
                      <View style={styles.reasonBlock}>
                        <Text style={styles.reasonHeader}>I'm here because</Text>
                        {WING_REASONS.map((reason) => {
                          const active = wingReason === reason;
                          return (
                            <TouchableOpacity
                              key={reason}
                              style={[
                                styles.reasonChip,
                                active && {
                                  backgroundColor: `${config.color}22`,
                                  borderColor: config.color,
                                },
                              ]}
                              onPress={() => setWingReason(reason)}
                              activeOpacity={0.75}
                            >
                              {active && (
                                <Ionicons name="checkmark-circle" size={14} color={config.color} />
                              )}
                              <Text
                                style={[
                                  styles.reasonText,
                                  active && { color: config.color, fontWeight: "600" },
                                ]}
                              >
                                {reason}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                    {isSelected && role !== "wing" && (
                      <Text style={[styles.cardTip, { color: config.color }]}>
                        {detail.tip}
                      </Text>
                    )}
                  </View>

                  {/* Check */}
                  {isSelected && (
                    <View
                      style={[styles.check, { backgroundColor: config.color }]}
                    >
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Button
            label="This is me tonight"
            onPress={() => navigation.navigate("Photo")}
            disabled={!selected || (selected === "wing" && !wingReason)}
            fullWidth
            size="lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },
  back: { padding: 20, paddingBottom: 0 },
  scrollView: { flex: 1, width: "100%" },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 48,
  },

  progress: { flexDirection: "row", gap: 6, marginBottom: 36 },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border.subtle,
  },
  progressBarActive: { backgroundColor: Colors.brand.pink },

  textBlock: { gap: 10, marginBottom: 28 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 15, color: Colors.text.muted, lineHeight: 22 },

  cards: { gap: 12, marginBottom: 32 },
  card: {
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  emojiWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  emoji: { fontSize: 28 },
  cardText: { flex: 1, gap: 3 },
  cardLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.2,
  },
  cardDesc: { fontSize: 13, color: Colors.text.muted, lineHeight: 18 },
  cardTip: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
    marginTop: 4,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  reasonBlock: { marginTop: 10, gap: 7 },
  reasonHeader: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.text.muted,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  reasonChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    backgroundColor: Colors.bg.elevated,
  },
  reasonText: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
    flex: 1,
  },

  footer: {},
});
