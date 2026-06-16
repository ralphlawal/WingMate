import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button } from "../../components/ui";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Phone">;

export default function PhoneScreen({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const [focused, setFocused] = useState(false);
  const countryCode = "+353";

  const digits = phone.replace(/\D/g, "");
  const isValid = digits.length >= 6;

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableWithoutFeedback onPress={Platform.OS !== "web" ? Keyboard.dismiss : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.glow} />

          <View style={styles.iconWrap}>
            <Text style={styles.emoji}>📱</Text>
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>What's your number?</Text>
            <Text style={styles.subtitle}>We'll send a code.</Text>
          </View>

          <View style={[styles.inputRow, focused && styles.inputRowFocused]}>
            <TouchableOpacity style={styles.countryPicker}>
              <Text style={styles.flag}>🇮🇪</Text>
              <Text style={styles.countryCode}>{countryCode}</Text>
            </TouchableOpacity>
            <View style={styles.inputDivider} />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="083 000 0000"
              placeholderTextColor={Colors.text.muted}
              keyboardType="phone-pad"
              autoFocus={Platform.OS !== "web"}
              maxLength={14}
              style={styles.phoneInput}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              selectionColor={Colors.brand.pink}
            />
          </View>

          <Text style={styles.legal}>
            By continuing you agree to our{" "}
            <Text style={styles.link}>Terms</Text> &{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>

          <View style={styles.footer}>
            <Button
              label="Send Code"
              onPress={() => navigation.navigate("OTP", { phone: `${countryCode}${phone}` })}
              disabled={!isValid}
              fullWidth
              size="lg"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
  },
  glow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.brand.pink,
    opacity: 0.06,
    top: -60,
    right: -60,
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
    marginBottom: 28,
  },
  emoji: { fontSize: 36 },
  textBlock: { gap: 10, marginBottom: 36 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.text.primary,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.muted,
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    height: 60,
    marginBottom: 16,
  },
  inputRowFocused: {
    borderColor: Colors.brand.pink,
    backgroundColor: `${Colors.brand.pink}08`,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
  },
  flag: { fontSize: 18 },
  countryCode: {
    color: Colors.text.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  inputDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border.subtle,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    color: Colors.text.primary,
    fontSize: 17,
    fontWeight: "500",
  },
  legal: {
    color: Colors.text.muted,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 32,
  },
  link: { color: Colors.brand.pink, fontWeight: "600" },
  footer: {
    marginTop: 40,
    paddingTop: 16,
  },
});
