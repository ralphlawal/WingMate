import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button } from "../../components/ui";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Photo">;

const { width } = Dimensions.get("window");
// Cap at 480 for web so the photo doesn't balloon on desktop
const PHOTO_SIZE = Math.min(width, 480) - 48;

const MOCK_PHOTO = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600";

export default function PhotoScreen({ navigation, route }: Props) {
  const [photo, setPhoto] = useState<string | null>(MOCK_PHOTO);
  const { role } = route.params;

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
              style={[styles.progressBar, step <= 3 && styles.progressBarActive]}
            />
          ))}
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>Add your photo</Text>
          <Text style={styles.subtitle}>One photo. Make it count.</Text>
        </View>

        {/* Single photo slot */}
        <TouchableOpacity
          style={styles.slot}
          onPress={() => setPhoto(photo ? null : MOCK_PHOTO)}
          activeOpacity={0.88}
        >
          {photo ? (
            <>
              <Image source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.45)"]}
                style={styles.slotGradient}
              />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => setPhoto(null)}
              >
                <Ionicons name="close" size={16} color="#fff" />
              </TouchableOpacity>
              <View style={styles.changeRow}>
                <Ionicons name="camera" size={14} color="#fff" />
                <Text style={styles.changeText}>Tap to change</Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyContent}>
              <View style={styles.cameraCircle}>
                <Ionicons name="camera-outline" size={34} color={Colors.text.muted} />
              </View>
              <Text style={styles.emptyTitle}>Add a photo</Text>
              <Text style={styles.emptyHint}>This is what people will see first</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Button
            label="Continue"
            onPress={() => navigation.navigate("Bio", { role })}
            disabled={!photo}
            fullWidth
            size="lg"
          />
          <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate("Bio")}>
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

  progress: { flexDirection: "row", gap: 6, marginBottom: 28 },
  progressBar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: Colors.border.subtle },
  progressBarActive: { backgroundColor: Colors.brand.pink },

  textBlock: { gap: 8, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: "800", color: Colors.text.primary, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: Colors.text.muted },

  slot: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE * 1.1,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: Colors.bg.card,
    borderWidth: 2,
    borderColor: Colors.border.default,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    alignSelf: "center",
    marginBottom: 28,
  },
  photo: { width: "100%", height: "100%", position: "absolute" },
  slotGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "35%",
  },
  removeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  changeRow: {
    position: "absolute",
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  changeText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  emptyContent: { alignItems: "center", gap: 12 },
  cameraCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: { fontSize: 17, fontWeight: "600", color: Colors.text.secondary },
  emptyHint: { fontSize: 13, color: Colors.text.muted },

  footer: { gap: 10 },
  skipBtn: { alignItems: "center", paddingVertical: 12 },
  skipText: { color: Colors.text.muted, fontSize: 14, fontWeight: "500" },
});
