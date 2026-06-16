import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button } from "../../components/ui";

type Props = NativeStackScreenProps<OnboardingStackParamList, "OTP">;

export default function OTPScreen({ navigation, route }: Props) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
    if (!digit && index > 0) inputs.current[index - 1]?.focus();
  };

  const fillDemo = () => {
    setCode(["1", "2", "3", "4", "5", "6"]);
  };

  const isFilled = code.every((d) => d !== "");

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="chevron-back" size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrap}>
          <Text style={styles.emoji}>🔐</Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>Enter the code</Text>
          <Text style={styles.subtitle}>
            Sent to{" "}
            <Text style={styles.phone}>{route.params.phone}</Text>
          </Text>
        </View>

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              value={digit}
              onChangeText={(t) => handleChange(t, i)}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={i === 0 && Platform.OS !== "web"}
              style={[styles.codeBox, digit ? styles.codeBoxFilled : null]}
              selectionColor={Colors.brand.pink}
            />
          ))}
        </View>

        {Platform.OS === "web" && (
          <TouchableOpacity style={styles.demoBtn} onPress={fillDemo}>
            <Text style={styles.demoBtnText}>Tap to fill demo code</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.resend}>
          <Text style={styles.resendText}>
            Didn't get it?{" "}
            <Text style={styles.resendLink}>Resend code</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Button
            label="Verify & Continue"
            onPress={() => { if (isFilled) navigation.navigate("Name"); }}
            disabled={!isFilled}
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
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

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

  textBlock: { gap: 10, marginBottom: 40 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.text.primary,
    letterSpacing: -0.6,
  },
  subtitle: { fontSize: 15, color: Colors.text.muted },
  phone: { color: Colors.text.primary, fontWeight: "600" },

  codeRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  codeBox: {
    flex: 1,
    height: 62,
    backgroundColor: Colors.bg.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  codeBoxFilled: {
    borderColor: Colors.brand.pink,
    backgroundColor: `${Colors.brand.pink}12`,
  },

  demoBtn: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: `${Colors.brand.pink}15`,
    borderWidth: 1,
    borderColor: `${Colors.brand.pink}30`,
    marginBottom: 16,
  },
  demoBtnText: {
    color: Colors.brand.pink,
    fontSize: 13,
    fontWeight: "600",
  },

  resend: { alignItems: "center", marginBottom: 40 },
  resendText: { color: Colors.text.muted, fontSize: 14 },
  resendLink: { color: Colors.brand.pink, fontWeight: "600" },

  footer: { marginTop: "auto" },
});
