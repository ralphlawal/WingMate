import React from "react";
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
import { ProfileStackParamList } from "../../types";
import { Colors } from "../../theme";
import { RoleBadge } from "../../components/ui";
import { MOCK_CURRENT_USER } from "../../mock";

type Props = NativeStackScreenProps<ProfileStackParamList, "MyProfile">;

const { width } = Dimensions.get("window");
const CARD_W = width - 40;
const CARD_H = CARD_W * 0.82;
const GRID_PHOTO_SIZE = (CARD_W - 8) / 3;

const STATS = [
  { icon: "eye-outline" as const, value: "248", label: "Profile views", color: Colors.brand.teal },
  { icon: "flash-outline" as const, value: "14", label: "Signals sent", color: Colors.brand.pink },
  { icon: "heart" as const, value: "6", label: "Matches tonight", color: "#FFB547" },
];

const INTERESTS = ["Jazz", "Hiking", "Startups", "Coffee", "Art", "Pool"];

export default function MyProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile card */}
        <View style={styles.cardWrap}>
          <View style={styles.profileCard}>
            <Image source={{ uri: MOCK_CURRENT_USER.photos[0] }} style={styles.profilePhoto} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)", Colors.bg.primary]}
              locations={[0.35, 0.72, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.roleBadgePos}>
              <RoleBadge role={MOCK_CURRENT_USER.role} size="sm" />
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.profileName}>
                {MOCK_CURRENT_USER.name}, {MOCK_CURRENT_USER.age}
              </Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={12} color={Colors.brand.pink} />
                <Text style={styles.locationText}>Checked in · The Grotto</Text>
              </View>
            </View>
          </View>

          {/* Edit button */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("EditProfile")}
            activeOpacity={0.85}
          >
            <Ionicons name="pencil" size={15} color={Colors.text.primary} />
            <Text style={styles.editBtnText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        {/* Tonight's mode */}
        <View style={styles.modeCard}>
          <View style={styles.modeTitleRow}>
            <View style={styles.modeIconBox}>
              <Text style={{ fontSize: 16 }}>💫</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.modeTitle}>Tonight's Mode</Text>
              <Text style={styles.modeSub}>Single · Looking to meet someone</Text>
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modeDivider} />

          <View style={styles.visibilityRow}>
            <View style={styles.visIconBox}>
              <Ionicons name="eye-outline" size={14} color={Colors.brand.teal} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.visLabel}>Visible on map</Text>
              <Text style={styles.visSub}>Anyone at The Grotto can see you</Text>
            </View>
            <View style={styles.visActive}>
              <View style={styles.visActiveDot} />
              <Text style={styles.visActiveText}>ON</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statBox}>
              <View style={[styles.statIconWrap, { backgroundColor: `${s.color}18` }]}>
                <Ionicons name={s.icon} size={16} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Bio section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About</Text>
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
              <Ionicons name="pencil-outline" size={16} color={Colors.brand.pink} />
            </TouchableOpacity>
          </View>
          <Text style={styles.bioText}>{MOCK_CURRENT_USER.bio}</Text>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
              <Ionicons name="pencil-outline" size={16} color={Colors.brand.pink} />
            </TouchableOpacity>
          </View>
          <View style={styles.interestsRow}>
            {INTERESTS.map((tag) => (
              <View key={tag} style={styles.interestChip}>
                <Text style={styles.interestText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Photos grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.photoGrid}>
            {MOCK_CURRENT_USER.photos.map((uri, idx) => (
              <View key={uri} style={styles.photoCell}>
                <Image source={{ uri }} style={styles.gridPhoto} />
                {idx === 0 && (
                  <View style={styles.mainLabel}>
                    <Text style={styles.mainLabelText}>Main</Text>
                  </View>
                )}
              </View>
            ))}
            {MOCK_CURRENT_USER.photos.length < 6 && (
              <TouchableOpacity
                style={styles.addPhotoBtn}
                onPress={() => navigation.navigate("EditProfile")}
              >
                <View style={styles.addPhotoInner}>
                  <Ionicons name="add" size={24} color={Colors.text.muted} />
                  <Text style={styles.addPhotoText}>Add</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Quick links */}
        <View style={[styles.section, styles.sectionLast]}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.quickLinks}>
            {[
              { icon: "shield-checkmark-outline" as const, label: "Safety & privacy", color: Colors.brand.teal },
              { icon: "help-circle-outline" as const, label: "Help & support", color: Colors.text.muted },
              { icon: "log-out-outline" as const, label: "Log out", color: "#FF453A" },
            ].map((item, i, arr) => (
              <TouchableOpacity key={item.label} style={styles.quickRow} activeOpacity={0.7}>
                <View style={[styles.quickIcon, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon} size={16} color={item.color} />
                </View>
                <Text style={[styles.quickLabel, { color: item.label === "Log out" ? "#FF453A" : Colors.text.secondary }]}>
                  {item.label}
                </Text>
                {item.label !== "Log out" && (
                  <Ionicons name="chevron-forward" size={15} color={Colors.text.muted} />
                )}
                {i < arr.length - 1 && <View style={styles.quickDivider} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 28, fontWeight: "800", color: Colors.text.primary, letterSpacing: -0.5 },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.bg.elevated,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    alignItems: "center",
    justifyContent: "center",
  },

  scroll: { paddingHorizontal: 20, paddingBottom: 120, gap: 16 },

  // Profile card
  cardWrap: { gap: 12 },
  profileCard: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  profilePhoto: { width: "100%", height: "100%" },
  roleBadgePos: { position: "absolute", top: 14, right: 14 },
  cardFooter: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
    gap: 5,
  },
  profileName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.3,
  },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  locationText: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: "500" },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.bg.card,
    borderRadius: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: Colors.border.default,
  },
  editBtnText: { fontSize: 15, fontWeight: "600", color: Colors.text.primary },

  // Mode card
  modeCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    gap: 12,
  },
  modeTitleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  modeIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: `${Colors.brand.pink}18`,
    alignItems: "center",
    justifyContent: "center",
  },
  modeTitle: { fontSize: 15, fontWeight: "700", color: Colors.text.primary },
  modeSub: { fontSize: 12, color: Colors.text.muted, marginTop: 2 },
  changeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: Colors.bg.elevated,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  changeBtnText: { fontSize: 12, fontWeight: "600", color: Colors.text.secondary },
  modeDivider: { height: 1, backgroundColor: Colors.border.subtle },
  visibilityRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  visIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: `${Colors.brand.teal}18`,
    alignItems: "center",
    justifyContent: "center",
  },
  visLabel: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  visSub: { fontSize: 11, color: Colors.text.muted, marginTop: 1 },
  visActive: { flexDirection: "row", alignItems: "center", gap: 5 },
  visActiveDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: Colors.status.online },
  visActiveText: { fontSize: 11, fontWeight: "700", color: Colors.status.online, letterSpacing: 0.5 },

  // Stats
  statsRow: { flexDirection: "row", gap: 10 },
  statBox: {
    flex: 1,
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  statIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: { fontSize: 20, fontWeight: "800", color: Colors.text.primary },
  statLabel: { fontSize: 10, color: Colors.text.muted, textAlign: "center", lineHeight: 13 },

  // Sections
  section: {},
  sectionLast: {},
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: Colors.text.primary, letterSpacing: -0.2 },
  manageText: { fontSize: 13, color: Colors.brand.pink, fontWeight: "600" },

  bioText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 21,
    backgroundColor: Colors.bg.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },

  // Interests
  interestsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  interestChip: {
    backgroundColor: Colors.bg.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  interestText: { fontSize: 13, color: Colors.text.secondary, fontWeight: "500" },

  // Photo grid
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  photoCell: {
    width: GRID_PHOTO_SIZE,
    height: GRID_PHOTO_SIZE * 1.2,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  gridPhoto: { width: "100%", height: "100%" },
  mainLabel: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  mainLabelText: { color: "#fff", fontSize: 9, fontWeight: "700", letterSpacing: 0.3 },
  addPhotoBtn: {
    width: GRID_PHOTO_SIZE,
    height: GRID_PHOTO_SIZE * 1.2,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border.default,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoInner: { alignItems: "center", gap: 4 },
  addPhotoText: { fontSize: 11, color: Colors.text.muted, fontWeight: "500" },

  // Quick links
  quickLinks: {
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    overflow: "hidden",
    position: "relative",
  },
  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  quickIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: { flex: 1, fontSize: 15, fontWeight: "500" },
  quickDivider: {
    position: "absolute",
    bottom: 0,
    left: 60,
    right: 0,
    height: 1,
    backgroundColor: Colors.border.subtle,
  },
});
