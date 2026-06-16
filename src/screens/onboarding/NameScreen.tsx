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
  Image,
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
  const [photo, setPhoto] = useState<string | null>(null);
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

          <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.8}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={36} color={Colors.text.muted} />
              </View>
            )}
            <View style={styles.cameraBtn}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
            <Text style={styles.avatarLabel}>Add photo</Text>
          </TouchableOpacity>

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

  avatarWrap: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.bg.card,
    borderWidth: 2,
    borderColor: Colors.border.default,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  cameraBtn: {
    position: "absolute",
    bottom: 24,
    right: "50%",
    marginRight: -40,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.brand.pink,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.bg.primary,
  },
  avatarLabel: {
    marginTop: 8,
    fontSize: 13,
    color: Colors.brand.pink,
    fontWeight: "600",
  },

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
