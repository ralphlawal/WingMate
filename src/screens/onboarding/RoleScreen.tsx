import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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

export default function RoleScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<UserRole | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="chevron-back" size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.container}>
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
          <Text style={styles.subtitle}>
            You can change this any time.
          </Text>
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
                    {isSelected && (
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
            disabled={!selected}
            fullWidth
            size="lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },
  back: { padding: 20, paddingBottom: 0 },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },

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

  cards: { gap: 12 },
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

  footer: { position: "absolute", bottom: 36, left: 24, right: 24 },
});
