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
import { Button } from "../../components/ui";
import { MOCK_USERS } from "../../mock";

type Props = NativeStackScreenProps<HomeStackParamList, "WingRequest">;

export default function WingRequestScreen({ navigation, route }: Props) {
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);
  const [sent, setSent] = useState(false);

  const wing = MOCK_USERS.find((u) => u.id === route.params.wingId) ?? MOCK_USERS[1];
  const target = MOCK_USERS.find((u) => u.id === route.params.targetUserId) ?? MOCK_USERS[0];

  if (sent) {
    return (
      <View style={styles.sentContainer}>
        <LinearGradient
          colors={["#051414", Colors.bg.primary]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.sentIconWrap}>
          <Text style={styles.sentEmoji}>🤝</Text>
        </View>
        <Text style={styles.sentTitle}>Request sent to {wing.name}!</Text>
        <Text style={styles.sentSub}>
          If they agree to vouch, they'll make the intro. Keep an eye on your matches.
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
              <Text style={styles.headerTitle}>Request an Intro</Text>
              <View style={{ width: 40 }} />
            </View>

            {/* Flow diagram */}
            <View style={styles.flowRow}>
              <View style={styles.flowUser}>
                <View style={styles.flowPhotoWrap}>
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400" }}
                    style={styles.flowPhoto}
                  />
                </View>
                <Text style={styles.flowName}>You</Text>
              </View>

              <View style={styles.flowArrow}>
                <Ionicons name="arrow-forward" size={14} color={Colors.text.muted} />
                <View style={styles.flowMidBadge}>
                  <Text style={styles.flowMidText}>asks {wing.name}</Text>
                </View>
                <Ionicons name="arrow-forward" size={14} color={Colors.text.muted} />
              </View>

              <View style={styles.flowUser}>
                <View style={styles.flowPhotoWrap}>
                  <Image source={{ uri: target.photos[0] }} style={styles.flowPhoto} />
                </View>
                <Text style={styles.flowName}>{target.name}</Text>
              </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
              <Text style={styles.bodyTitle}>
                Why should {wing.name} vouch for you?
              </Text>
              <Text style={styles.bodySub}>
                Be genuine. {wing.name} is protective of {target.name}.
              </Text>

              <View style={[styles.inputWrap, focused && styles.inputWrapFocused]}>
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder={`Hey ${wing.name}, I noticed ${target.name} and...`}
                  placeholderTextColor={Colors.text.muted}
                  style={styles.messageInput}
                  multiline
                  maxLength={200}
                  autoFocus
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  selectionColor={Colors.brand.teal}
                />
              </View>

              <View style={styles.tipsBox}>
                <View style={styles.tipsHeader}>
                  <Ionicons name="bulb-outline" size={13} color={Colors.brand.teal} />
                  <Text style={styles.tipsTitle}>Tips for a good wing request</Text>
                </View>
                {[
                  "Be specific about what caught your attention",
                  "Keep it respectful and genuine",
                  "Don't be pushy — the wing decides",
                ].map((tip) => (
                  <View key={tip} style={styles.tip}>
                    <View style={styles.tipDot} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.footer}>
              <Button
                label={`Ask ${wing.name} to Vouch`}
                onPress={() => setSent(true)}
                fullWidth
                size="lg"
                style={{ backgroundColor: Colors.brand.teal }}
                icon={<Text style={{ fontSize: 16 }}>🤝</Text>}
              />
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

  flowRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 8,
  },
  flowUser: { alignItems: "center", gap: 8 },
  flowPhotoWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.brand.teal,
  },
  flowPhoto: { width: "100%", height: "100%" },
  flowName: { fontSize: 12, color: Colors.text.muted, fontWeight: "500" },
  flowArrow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
  flowMidBadge: {
    backgroundColor: `${Colors.brand.teal}20`,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: `${Colors.brand.teal}35`,
  },
  flowMidText: { fontSize: 11, fontWeight: "600", color: Colors.brand.teal },

  body: { flex: 1, paddingHorizontal: 20 },
  bodyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  bodySub: { fontSize: 13, color: Colors.text.muted, marginBottom: 14 },

  inputWrap: {
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    padding: 14,
    minHeight: 100,
    marginBottom: 16,
  },
  inputWrapFocused: {
    borderColor: Colors.brand.teal,
    backgroundColor: `${Colors.brand.teal}06`,
  },
  messageInput: {
    color: Colors.text.primary,
    fontSize: 15,
    minHeight: 70,
    textAlignVertical: "top",
    lineHeight: 22,
  },

  tipsBox: {
    backgroundColor: `${Colors.brand.teal}10`,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: `${Colors.brand.teal}25`,
    gap: 8,
  },
  tipsHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 },
  tipsTitle: { color: Colors.brand.teal, fontSize: 12, fontWeight: "600" },
  tip: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  tipDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.brand.teal,
    marginTop: 7,
  },
  tipText: { color: Colors.text.muted, fontSize: 12, lineHeight: 18, flex: 1 },

  footer: { paddingHorizontal: 20, paddingBottom: 32 },

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
    backgroundColor: `${Colors.brand.teal}15`,
    borderWidth: 1,
    borderColor: `${Colors.brand.teal}30`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  sentEmoji: { fontSize: 52 },
  sentTitle: {
    fontSize: 22,
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
