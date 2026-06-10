import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types";
import { Colors, RoleConfig } from "../../theme";
import { RoleBadge, Button } from "../../components/ui";
import { MOCK_USERS } from "../../mock";

type Props = NativeStackScreenProps<HomeStackParamList, "UserProfile">;

const { width, height } = Dimensions.get("window");
const PHOTO_H = height * 0.62;

export default function UserProfileScreen({ navigation, route }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const user = MOCK_USERS.find((u) => u.id === route.params.userId) ?? MOCK_USERS[0];
  const config = RoleConfig[user.role];

  return (
    <View style={styles.container}>
      {/* Full-bleed photo */}
      <View style={[styles.photoArea, { height: PHOTO_H }]}>
        <Image source={{ uri: user.photos[photoIndex] }} style={styles.photo} />

        <LinearGradient
          colors={["rgba(0,0,0,0.45)", "transparent", "transparent", Colors.bg.primary]}
          locations={[0, 0.25, 0.6, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Top nav */}
        <SafeAreaView edges={["top"]} style={styles.topNav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Photo tap zones */}
        <View style={styles.photoTapRow}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setPhotoIndex(Math.max(0, photoIndex - 1))}
          />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              setPhotoIndex(Math.min(user.photos.length - 1, photoIndex + 1))
            }
          />
        </View>

        {/* Photo progress bars */}
        <View style={styles.progressBars}>
          {user.photos.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressBar,
                i <= photoIndex ? styles.progressBarFill : styles.progressBarEmpty,
              ]}
            />
          ))}
        </View>

        {/* Online pill */}
        <View style={styles.onlinePill}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Here now</Text>
        </View>
      </View>

      {/* Info panel */}
      <ScrollView
        style={styles.infoPanel}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoPanelContent}
      >
        {/* Identity */}
        <View style={styles.identityRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.age}>{user.age}</Text>
            </View>
            <RoleBadge role={user.role} size="lg" />
          </View>
        </View>

        {/* Wing banner */}
        {user.role === "wing" && (
          <View style={styles.wingBanner}>
            <View style={styles.wingBannerIcon}>
              <Text style={{ fontSize: 20 }}>🤝</Text>
            </View>
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={styles.wingBannerTitle}>Wing person tonight</Text>
              <Text style={styles.wingBannerSub}>
                {user.name} is here to help a friend connect. Ask them to make an intro.
              </Text>
            </View>
          </View>
        )}

        {/* Bio */}
        <Text style={styles.bio}>{user.bio}</Text>

        {/* Location chip */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Ionicons name="location-outline" size={13} color={Colors.text.muted} />
            <Text style={styles.chipText}>The Grotto • 0.2mi away</Text>
          </View>
          <View style={styles.chip}>
            <View style={styles.chipDot} />
            <Text style={styles.chipText}>20 min ago</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {user.role === "single" && (
            <>
              <TouchableOpacity
                style={styles.passBtn}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="close" size={24} color={Colors.text.muted} />
              </TouchableOpacity>
              <Button
                label="Signal Interest"
                onPress={() => navigation.navigate("Signal", { userId: user.id })}
                size="lg"
                style={styles.signalBtn}
                icon={<Text style={{ fontSize: 16 }}>💫</Text>}
              />
            </>
          )}
          {user.role === "wing" && (
            <Button
              label="Request an Intro"
              onPress={() =>
                navigation.navigate("WingRequest", {
                  wingId: user.id,
                  targetUserId: user.wingFor ?? user.id,
                })
              }
              fullWidth
              size="lg"
              style={{ backgroundColor: Colors.brand.teal }}
              icon={<Text style={{ fontSize: 16 }}>🤝</Text>}
            />
          )}
          {user.role === "taken" && (
            <View style={styles.takenCard}>
              <Text style={styles.takenEmoji}>💛</Text>
              <Text style={styles.takenText}>
                {user.name} is taken but loves playing cupid. Say hi — they might know someone.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg.primary },

  photoArea: { position: "relative" },
  photo: { width: "100%", height: "100%" },
  topNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  photoTapRow: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  progressBars: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 4,
  },
  progressBar: {
    flex: 1,
    height: 3,
    borderRadius: 1.5,
  },
  progressBarFill: { backgroundColor: "rgba(255,255,255,0.9)" },
  progressBarEmpty: { backgroundColor: "rgba(255,255,255,0.3)" },
  onlinePill: {
    position: "absolute",
    bottom: 20,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: `${Colors.status.online}40`,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.status.online,
  },
  onlineText: { color: Colors.status.online, fontSize: 12, fontWeight: "600" },

  infoPanel: { flex: 1 },
  infoPanelContent: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 40, gap: 16 },

  identityRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  nameRow: { flexDirection: "row", alignItems: "baseline", gap: 8, marginBottom: 8 },
  name: { fontSize: 28, fontWeight: "800", color: Colors.text.primary, letterSpacing: -0.5 },
  age: { fontSize: 22, color: Colors.text.secondary },

  wingBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: `${Colors.brand.teal}12`,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: `${Colors.brand.teal}30`,
  },
  wingBannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.brand.teal}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  wingBannerTitle: { fontSize: 14, fontWeight: "700", color: Colors.brand.teal },
  wingBannerSub: { fontSize: 13, color: Colors.text.muted, lineHeight: 18 },

  bio: { fontSize: 15, color: Colors.text.secondary, lineHeight: 24 },

  chipsRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.bg.elevated,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.status.online,
  },
  chipText: { color: Colors.text.muted, fontSize: 12, fontWeight: "500" },

  actions: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 20,
  },
  passBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.bg.elevated,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    alignItems: "center",
    justifyContent: "center",
  },
  signalBtn: { flex: 1 },
  takenCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  takenEmoji: { fontSize: 24 },
  takenText: { flex: 1, color: Colors.text.muted, fontSize: 13, lineHeight: 19 },
});
