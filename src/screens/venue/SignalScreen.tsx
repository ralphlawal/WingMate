import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button, RoleBadge } from "../../components/ui";
import { MOCK_USERS } from "../../mock";

type Props = NativeStackScreenProps<HomeStackParamList, "Signal">;

const QUICK_SIGNALS = [
  "You look like someone I should know 👀",
  "Your vibe is immaculate ✨",
  "Want to grab a drink?",
  "You're giving main character energy",
];

export default function SignalScreen({ navigation, route }: Props) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);
  const user = MOCK_USERS.find((u) => u.id === route.params.userId) ?? MOCK_USERS[0];

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      navigation.navigate("MatchConfirmation", { matchId: "match-new" });
    }, 1400);
  };

  if (sent) {
    return (
      <View style={styles.sentContainer}>
        <LinearGradient
          colors={["#0D0814", Colors.bg.primary]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.sentIconWrap}>
          <Text style={styles.sentEmoji}>💫</Text>
        </View>
        <Text style={styles.sentTitle}>Signal sent!</Text>
        <Text style={styles.sentSub}>
          If {user.name} signals back, you'll match instantly.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={20} color={Colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Signal Interest</Text>
              <View style={{ width: 40 }} />
            </View>

            {/* Target user card */}
            <View style={styles.targetCard}>
              <Image source={{ uri: user.photos[0] }} style={styles.targetPhoto} />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.75)"]}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.targetInfo}>
                <Text style={styles.targetName}>
                  {user.name}, {user.age}
                </Text>
                <RoleBadge role={user.role} size="sm" />
              </View>
            </View>

            {/* Message area */}
            <View style={styles.body}>
              <View style={styles.bodyHeader}>
                <Text style={styles.bodyTitle}>Add a message</Text>
                <Text style={styles.bodyOptional}>optional</Text>
              </View>
              <Text style={styles.bodySub}>
                They won't see it until they signal back.
              </Text>

              <View style={[styles.inputWrap, focused && styles.inputWrapFocused]}>
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Say something memorable..."
                  placeholderTextColor={Colors.text.muted}
                  style={styles.messageInput}
                  multiline
                  maxLength={120}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  selectionColor={Colors.brand.pink}
                />
              </View>

              <View style={styles.quickList}>
                {QUICK_SIGNALS.map((q) => (
                  <TouchableOpacity
                    key={q}
                    style={[styles.quickChip, message === q && styles.quickChipActive]}
                    onPress={() => setMessage(q)}
                  >
                    <Text
                      style={[
                        styles.quickText,
                        message === q && styles.quickTextActive,
                      ]}
                    >
                      {q}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Button
                label={`Signal ${user.name} 💫`}
                onPress={handleSend}
                fullWidth
                size="lg"
              />
              <Text style={styles.footerNote}>
                They'll see your profile. Message revealed only after mutual match.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: { fontSize: 17, fontWeight: "700", color: Colors.text.primary },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.bg.elevated,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    alignItems: "center",
    justifyContent: "center",
  },

  targetCard: {
    marginHorizontal: 20,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    marginBottom: 22,
  },
  targetPhoto: { width: "100%", height: "100%" },
  targetInfo: {
    position: "absolute",
    bottom: 14,
    left: 14,
    gap: 6,
  },
  targetName: { fontSize: 20, fontWeight: "800", color: "#fff" },

  body: { flex: 1, paddingHorizontal: 20 },
  bodyHeader: { flexDirection: "row", alignItems: "baseline", gap: 8, marginBottom: 4 },
  bodyTitle: { fontSize: 16, fontWeight: "700", color: Colors.text.primary },
  bodyOptional: {
    fontSize: 11,
    color: Colors.text.muted,
    fontWeight: "500",
    backgroundColor: Colors.bg.elevated,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  bodySub: { fontSize: 13, color: Colors.text.muted, marginBottom: 14 },

  inputWrap: {
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    padding: 14,
    minHeight: 90,
    marginBottom: 14,
  },
  inputWrapFocused: {
    borderColor: Colors.brand.pink,
    backgroundColor: `${Colors.brand.pink}06`,
  },
  messageInput: {
    color: Colors.text.primary,
    fontSize: 15,
    minHeight: 60,
    textAlignVertical: "top",
    lineHeight: 22,
  },

  quickList: { gap: 8 },
  quickChip: {
    backgroundColor: Colors.bg.elevated,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  quickChipActive: {
    borderColor: Colors.brand.pink,
    backgroundColor: `${Colors.brand.pink}12`,
  },
  quickText: { color: Colors.text.secondary, fontSize: 13 },
  quickTextActive: { color: Colors.brand.pink },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 10,
  },
  footerNote: { color: Colors.text.muted, fontSize: 11, textAlign: "center" },

  sentContainer: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 40,
  },
  sentIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${Colors.brand.pink}15`,
    borderWidth: 1,
    borderColor: `${Colors.brand.pink}30`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  sentEmoji: { fontSize: 52 },
  sentTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.text.primary,
    textAlign: "center",
  },
  sentSub: {
    fontSize: 15,
    color: Colors.text.muted,
    textAlign: "center",
    lineHeight: 22,
  },
});
