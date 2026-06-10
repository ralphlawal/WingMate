import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button } from "../../components/ui";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Name">;

export default function NameScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const isValid = name.trim().length >= 2;

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="chevron-back" size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* Progress */}
          <View style={styles.progress}>
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                style={[styles.progressBar, step === 1 && styles.progressBarActive]}
              />
            ))}
          </View>

          <View style={styles.iconWrap}>
            <Text style={styles.emoji}>👋</Text>
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>What do people call you?</Text>
            <Text style={styles.subtitle}>
              First name only — keep it casual.
            </Text>
          </View>

          {/* Name input */}
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="First name"
            placeholderTextColor={Colors.text.muted}
            autoCapitalize="words"
            autoFocus
            maxLength={30}
            style={[styles.input, focused && styles.inputFocused]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            selectionColor={Colors.brand.pink}
          />

          <View style={styles.footer}>
            <Button
              label="Continue"
              onPress={() => navigation.navigate("Role")}
              disabled={!isValid}
              fullWidth
              size="lg"
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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

  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: `${Colors.brand.pink}15`,
    borderWidth: 1,
    borderColor: `${Colors.brand.pink}25`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emoji: { fontSize: 36 },

  textBlock: { gap: 10, marginBottom: 32 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 15, color: Colors.text.muted },

  input: {
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    height: 60,
    paddingHorizontal: 18,
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  inputFocused: {
    borderColor: Colors.brand.pink,
    backgroundColor: `${Colors.brand.pink}08`,
  },

  footer: {
    position: "absolute",
    bottom: 36,
    left: 24,
    right: 24,
  },
});
