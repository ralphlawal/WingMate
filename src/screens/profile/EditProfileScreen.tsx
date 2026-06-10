import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button } from "../../components/ui";
import { MOCK_CURRENT_USER } from "../../mock";

type Props = NativeStackScreenProps<ProfileStackParamList, "EditProfile">;

export default function EditProfileScreen({ navigation }: Props) {
  const user = MOCK_CURRENT_USER;
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [nameFocused, setNameFocused] = useState(false);
  const [bioFocused, setBioFocused] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <Button
          label="Save"
          variant="ghost"
          onPress={() => navigation.goBack()}
          size="sm"
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>First name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={[styles.input, nameFocused && styles.inputFocused]}
              placeholderTextColor={Colors.text.muted}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              selectionColor={Colors.brand.pink}
            />
          </View>

          <View style={styles.field}>
            <View style={styles.fieldLabelRow}>
              <Text style={styles.fieldLabel}>About me</Text>
              <Text style={styles.counter}>{160 - bio.length} left</Text>
            </View>
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={[styles.input, styles.textArea, bioFocused && styles.inputFocused]}
              multiline
              maxLength={160}
              placeholderTextColor={Colors.text.muted}
              textAlignVertical="top"
              onFocus={() => setBioFocused(true)}
              onBlur={() => setBioFocused(false)}
              selectionColor={Colors.brand.pink}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Preferences</Text>
            <View style={styles.selectGroup}>
              {[
                { label: "Show me to", value: "Women" },
                { label: "Gender", value: "Man" },
                { label: "Interested in", value: "Women" },
              ].map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.selectRow,
                    i < 2 && { borderBottomWidth: 1, borderBottomColor: Colors.border.subtle },
                  ]}
                >
                  <View>
                    <Text style={styles.selectLabel}>{item.label}</Text>
                    <Text style={styles.selectValue}>{item.value}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.text.muted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  backBtn: { padding: 4 },
  title: { fontSize: 17, fontWeight: "700", color: Colors.text.primary },

  scroll: { padding: 20, gap: 24, paddingBottom: 60 },

  field: { gap: 10 },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  fieldLabelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  counter: { fontSize: 11, color: Colors.text.muted },

  input: {
    backgroundColor: Colors.bg.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: Colors.text.primary,
    fontSize: 15,
  },
  inputFocused: {
    borderColor: Colors.brand.pink,
    backgroundColor: `${Colors.brand.pink}06`,
  },
  textArea: { minHeight: 100, paddingTop: 14 },

  selectGroup: {
    backgroundColor: Colors.bg.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
    overflow: "hidden",
  },
  selectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  selectLabel: { fontSize: 11, color: Colors.text.muted, marginBottom: 3 },
  selectValue: { fontSize: 15, fontWeight: "500", color: Colors.text.primary },
});
