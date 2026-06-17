import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button } from "../../components/ui";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Bio">;

const MAX = 160;

const SINGLE_PROMPTS = [
  "I'll know it's love if...",
  "The best way to win me over is...",
  "Two truths and a lie...",
  "Currently obsessed with...",
];

const WING_PROMPTS = [
  "They're the type who...",
  "You'll like them if you...",
  "Fair warning, they will...",
  "Best way to start a convo with them...",
];

export default function BioScreen({ navigation, route }: Props) {
  const [bio, setBio] = useState("");
  const [focused, setFocused] = useState(false);
  const remaining = MAX - bio.length;
  const isValid = bio.trim().length >= 10;
  const isWing = route.params.role === "wing";

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
            <View key={step} style={[styles.progressBar, styles.progressBarActive]} />
          ))}
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {isWing ? "Introduce your friend" : "Tell them something real"}
          </Text>
          <Text style={styles.subtitle}>
            {isWing
              ? "Give people a reason to walk over tonight."
              : "What would you want someone to know before saying hi?"}
          </Text>
        </View>

        {/* Text area */}
        <View style={[styles.textAreaWrap, focused && styles.textAreaFocused]}>
          <TextInput
            value={bio}
            onChangeText={(t) => t.length <= MAX && setBio(t)}
            placeholder={isWing ? "Tell people what makes your friend worth meeting..." : "Write something that sounds like you..."}
            placeholderTextColor={Colors.text.muted}
            multiline
            style={styles.textArea}
            autoFocus={Platform.OS !== "web"}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            selectionColor={Colors.brand.pink}
          />
          <Text
            style={[
              styles.counter,
              remaining < 20 && { color: Colors.brand.pink },
            ]}
          >
            {remaining}
          </Text>
        </View>

        {/* Prompt chips */}
        <View style={styles.promptsHeader}>
          <Ionicons name="sparkles" size={13} color={Colors.brand.teal} />
          <Text style={styles.promptsLabel}>Need a nudge?</Text>
        </View>

        <View style={styles.prompts}>
          {(isWing ? WING_PROMPTS : SINGLE_PROMPTS).map((prompt) => (
            <TouchableOpacity
              key={prompt}
              style={styles.promptChip}
              onPress={() => setBio(prompt + " ")}
            >
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            label="Let's go 🎉"
            onPress={() => (navigation as any).getParent()?.navigate("Main")}
            disabled={!isValid}
            fullWidth
            size="lg"
          />
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => (navigation as any).getParent()?.navigate("Main")}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
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

  progress: { flexDirection: "row", gap: 6, marginBottom: 32 },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border.subtle,
  },
  progressBarActive: { backgroundColor: Colors.brand.pink },

  textBlock: { gap: 10, marginBottom: 24 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 15, color: Colors.text.muted, lineHeight: 22 },

  textAreaWrap: {
    backgroundColor: Colors.bg.card,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    padding: 16,
    minHeight: 130,
    marginBottom: 20,
  },
  textAreaFocused: {
    borderColor: Colors.brand.pink,
    backgroundColor: `${Colors.brand.pink}06`,
  },
  textArea: {
    color: Colors.text.primary,
    fontSize: 15,
    lineHeight: 22,
    minHeight: 88,
    textAlignVertical: "top",
  },
  counter: {
    alignSelf: "flex-end",
    color: Colors.text.muted,
    fontSize: 11,
    fontWeight: "500",
    marginTop: 8,
  },

  promptsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  promptsLabel: { color: Colors.brand.teal, fontSize: 12, fontWeight: "600" },
  prompts: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 36 },
  promptChip: {
    backgroundColor: Colors.bg.elevated,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  promptText: { color: Colors.text.secondary, fontSize: 12, fontWeight: "500" },

  footer: { gap: 10 },
  skipBtn: { alignItems: "center", paddingVertical: 12 },
  skipText: { color: Colors.text.muted, fontSize: 14, fontWeight: "500" },
});
