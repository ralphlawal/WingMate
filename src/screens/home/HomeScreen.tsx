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
import { Colors } from "../../theme";
import { RoleBadge } from "../../components/ui";
import { MOCK_VENUES, MOCK_USERS, MOCK_CURRENT_USER } from "../../mock";

type Props = NativeStackScreenProps<HomeStackParamList, "HomeMap">;

const { width, height } = Dimensions.get("window");
const MAP_H = Math.round(height * 0.28);

const MAP_DOTS = [
  { venueId: "venue-1", top: "45%", left: "38%", count: 89, color: Colors.brand.pink, name: "Café en Seine" },
  { venueId: "venue-2", top: "30%", left: "42%", count: 41, color: Colors.brand.pink, name: "Peruke & Periwig" },
  { venueId: "venue-3", top: "65%", left: "55%", count: 34, color: Colors.brand.teal, name: "Toners" },
  { venueId: "venue-4", top: "38%", left: "68%", count: 28, color: Colors.brand.teal, name: "O'Donoghues" },
  { venueId: "venue-5", top: "70%", left: "72%", count: 22, color: Colors.brand.pink, name: "The Ginger Man" },
];

const SCENE_STATS = [
  { icon: "business-outline" as const, value: "5", label: "venues active" },
  { icon: "people-outline" as const, value: "214", label: "people out" },
  { icon: "heart-outline" as const, value: "89", label: "singles nearby" },
];

export default function HomeScreen({ navigation }: Props) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "single" | "wing">("all");

  const nearbyUsers = MOCK_USERS.filter((u) =>
    activeFilter === "all" ? true : u.role === activeFilter
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfile", { userId: MOCK_CURRENT_USER.id })
            }
          >
            <Image source={{ uri: MOCK_CURRENT_USER.photos[0] }} style={styles.headerAvatar} />
            <View style={styles.avatarOnline} />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Good evening 🌙</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={12} color={Colors.brand.pink} />
              <Text style={styles.locationText}>Dawson St, Dublin 2</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search-outline" size={20} color={Colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={20} color={Colors.text.secondary} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tonight's scene stats */}
      <View style={styles.sceneBar}>
        {SCENE_STATS.map((s, i) => (
          <React.Fragment key={s.label}>
            <View style={styles.sceneItem}>
              <Text style={styles.sceneNum}>{s.value}</Text>
              <Text style={styles.sceneLabel}>{s.label}</Text>
            </View>
            {i < SCENE_STATS.length - 1 && <View style={styles.sceneDivider} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Map */}
        <View style={styles.mapOuter}>
          <LinearGradient
            colors={["#060B14", "#0C1525", "#08101A"]}
            style={[styles.map, { height: MAP_H }]}
          >
            {/* Street grid */}
            {(["26%", "50%", "72%"] as const).map((t) => (
              <View key={t} style={[styles.gridH, { top: t } as any]} />
            ))}
            {(["18%", "40%", "60%", "80%"] as const).map((l) => (
              <View key={l} style={[styles.gridV, { left: l } as any]} />
            ))}

            {/* Venue dots */}
            {MAP_DOTS.map((dot) => (
              <TouchableOpacity
                key={dot.venueId}
                style={[styles.dotWrap, { top: dot.top, left: dot.left } as any]}
                onPress={() => navigation.navigate("VenueDetail", { venueId: dot.venueId })}
                activeOpacity={0.75}
              >
                <View style={[styles.dotHalo, { backgroundColor: `${dot.color}25` }]} />
                <View style={[styles.dotCore, { backgroundColor: dot.color }]}>
                  <Text style={styles.dotCount}>{dot.count}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* User pin */}
            <View style={styles.userPin}>
              <View style={styles.userPinPulse} />
              <View style={styles.userPinRing} />
              <View style={styles.userPinDot} />
            </View>

            {/* Map legend */}
            <View style={styles.mapLegend}>
              <Ionicons name="locate" size={11} color={Colors.brand.pink} />
              <Text style={styles.mapLegendText}>You · Tap a dot to see who's there</Text>
            </View>
          </LinearGradient>

          {/* QR connect bar */}
          <View style={styles.qrBar}>
            <TouchableOpacity
              style={styles.qrBtn}
              onPress={() => navigation.navigate("MyQR")}
              activeOpacity={0.85}
            >
              <View style={styles.qrBtnIcon}>
                <Ionicons name="qr-code-outline" size={18} color={Colors.brand.pink} />
              </View>
              <View style={styles.qrBtnText}>
                <Text style={styles.qrBtnLabel}>My QR</Text>
                <Text style={styles.qrBtnSub}>Show to connect</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.qrDivider} />

            <TouchableOpacity
              style={styles.qrBtn}
              onPress={() => navigation.navigate("ScanQR")}
              activeOpacity={0.85}
            >
              <View style={[styles.qrBtnIcon, { backgroundColor: `${Colors.brand.teal}18` }]}>
                <Ionicons name="scan-outline" size={18} color={Colors.brand.teal} />
              </View>
              <View style={styles.qrBtnText}>
                <Text style={styles.qrBtnLabel}>Scan QR</Text>
                <Text style={styles.qrBtnSub}>Approach someone</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Role filters + nearby people */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby right now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Filter pills */}
          <View style={styles.filterRow}>
            {(["all", "single", "wing"] as const).map((f) => {
              const active = activeFilter === f;
              const color = f === "all" ? Colors.brand.pink : f === "single" ? Colors.role.single : Colors.role.wing;
              const label = f === "all" ? "Everyone" : f === "single" ? "💫 Singles" : "🤝 Wings";
              return (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterChip, active && { backgroundColor: `${color}20`, borderColor: color }]}
                  onPress={() => setActiveFilter(f)}
                >
                  <Text style={[styles.filterText, active && { color }]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.usersRow}
          >
            {nearbyUsers.length > 0 ? nearbyUsers.map((user) => (
              <TouchableOpacity
                key={user.id}
                style={styles.userCard}
                onPress={() => navigation.navigate("UserProfile", { userId: user.id })}
                activeOpacity={0.85}
              >
                <View style={styles.userPhotoWrap}>
                  <Image source={{ uri: user.photos[0] }} style={styles.userPhoto} />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={styles.userGradient}
                  />
                  <View style={styles.onlineDot} />
                  <View style={styles.userBottom}>
                    <Text style={styles.userName} numberOfLines={1}>{user.name}, {user.age}</Text>
                    <RoleBadge role={user.role} size="sm" />
                  </View>
                </View>
              </TouchableOpacity>
            )) : (
              <View style={styles.emptyUsersState}>
                <Text style={styles.emptyUsersText}>No one with this role nearby</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Featured venue */}
        {MOCK_VENUES[0] && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Trending tonight</Text>
                <View style={styles.fireBadge}>
                  <Text style={styles.fireBadgeText}>🔥 HOT</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => navigation.navigate("VenueDetail", { venueId: MOCK_VENUES[0].id })}
              activeOpacity={0.88}
            >
              <Image source={{ uri: MOCK_VENUES[0].thumbnail }} style={styles.featuredImg} />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.85)"]}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.featuredContent}>
                <View style={styles.featuredTop}>
                  <View style={styles.liveTag}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                </View>
                <View style={styles.featuredBottom}>
                  <Text style={styles.featuredName}>{MOCK_VENUES[0].name}</Text>
                  <Text style={styles.featuredAddr}>{MOCK_VENUES[0].address}</Text>
                  <View style={styles.featuredStats}>
                    <View style={styles.featuredStat}>
                      <Text style={[styles.featuredStatNum, { color: Colors.brand.pink }]}>
                        {MOCK_VENUES[0].singlesCount}
                      </Text>
                      <Text style={styles.featuredStatLabel}>singles</Text>
                    </View>
                    <View style={styles.featuredStatDiv} />
                    <View style={styles.featuredStat}>
                      <Text style={[styles.featuredStatNum, { color: Colors.brand.teal }]}>
                        {MOCK_VENUES[0].wingsCount}
                      </Text>
                      <Text style={styles.featuredStatLabel}>wings</Text>
                    </View>
                    <View style={styles.featuredStatDiv} />
                    <View style={styles.featuredStat}>
                      <Text style={styles.featuredStatNum}>{MOCK_VENUES[0].activeCount}</Text>
                      <Text style={styles.featuredStatLabel}>total</Text>
                    </View>
                  </View>
                  <View style={styles.vibes}>
                    {MOCK_VENUES[0].vibe.map((v) => (
                      <View key={v} style={styles.vibeChip}>
                        <Text style={styles.vibeText}>{v}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* All venues */}
        <View style={[styles.section, styles.sectionLast]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All spots nearby</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Map view</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.venueList}>
            {MOCK_VENUES.map((venue) => (
              <TouchableOpacity
                key={venue.id}
                style={styles.venueCard}
                onPress={() => navigation.navigate("VenueDetail", { venueId: venue.id })}
                activeOpacity={0.85}
              >
                <View style={styles.venueThumbnailWrap}>
                  <Image source={{ uri: venue.thumbnail }} style={styles.venueThumbnail} />
                </View>
                <View style={styles.venueInfo}>
                  <View style={styles.venueInfoTop}>
                    <Text style={styles.venueName} numberOfLines={1}>{venue.name}</Text>
                    <View style={styles.venueCountPill}>
                      <View style={styles.venueCountDot} />
                      <Text style={styles.venueCountText}>{venue.activeCount}</Text>
                    </View>
                  </View>
                  <Text style={styles.venueAddr} numberOfLines={1}>{venue.address}</Text>
                  <View style={styles.vibeRowSmall}>
                    {venue.vibe.slice(0, 2).map((v) => (
                      <View key={v} style={styles.vibeChipSmall}>
                        <Text style={styles.vibeTextSmall}>{v}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.venueFooter}>
                    <Text style={[styles.venueRoleNum, { color: Colors.brand.pink }]}>
                      {venue.singlesCount} singles
                    </Text>
                    <Text style={styles.venueDot}>·</Text>
                    <Text style={[styles.venueRoleNum, { color: Colors.brand.teal }]}>
                      {venue.wingsCount} wings
                    </Text>
                  </View>
                </View>
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

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerRight: { flexDirection: "row", gap: 6 },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.brand.pink,
  },
  avatarOnline: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: Colors.status.online,
    borderWidth: 2,
    borderColor: Colors.bg.primary,
  },
  greeting: { fontSize: 13, fontWeight: "700", color: Colors.text.primary },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 1 },
  locationText: { fontSize: 12, color: Colors.text.muted },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.bg.elevated,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.brand.pink,
    borderWidth: 1.5,
    borderColor: Colors.bg.elevated,
  },

  // Scene stats
  sceneBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: Colors.bg.card,
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  sceneItem: { alignItems: "center", gap: 2 },
  sceneNum: { fontSize: 18, fontWeight: "800", color: Colors.text.primary },
  sceneLabel: { fontSize: 10, color: Colors.text.muted, fontWeight: "500" },
  sceneDivider: { width: 1, height: 28, backgroundColor: Colors.border.subtle },

  scroll: { paddingBottom: 120 },

  // Map
  mapOuter: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 26,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  map: {
    position: "relative",
    justifyContent: "flex-end",
    paddingBottom: 12,
    alignItems: "center",
  },
  gridH: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  gridV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  dotWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    height: 54,
    marginLeft: -27,
    marginTop: -27,
  },
  dotHalo: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  dotCore: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  dotCount: { color: "#fff", fontSize: 12, fontWeight: "700" },
  userPin: {
    position: "absolute",
    top: "48%",
    left: "46%",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    marginLeft: -23,
    marginTop: -23,
  },
  userPinPulse: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: `${Colors.brand.pink}12`,
  },
  userPinRing: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: `${Colors.brand.pink}55`,
  },
  userPinDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.brand.pink,
    borderWidth: 2.5,
    borderColor: "#fff",
  },
  mapLegend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mapLegendText: { color: Colors.text.muted, fontSize: 10, fontWeight: "500" },

  qrBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border.subtle,
  },
  qrBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  qrBtnIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${Colors.brand.pink}18`,
    alignItems: "center",
    justifyContent: "center",
  },
  qrBtnText: { gap: 1 },
  qrBtnLabel: { fontSize: 13, fontWeight: "700", color: Colors.text.primary },
  qrBtnSub: { fontSize: 11, color: Colors.text.muted },
  qrDivider: { width: 1, height: 36, backgroundColor: Colors.border.subtle },

  // Sections
  section: { marginBottom: 26 },
  sectionLast: { marginBottom: 0 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: Colors.text.primary, letterSpacing: -0.2 },
  fireBadge: {
    backgroundColor: "#FF6B3510",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#FF6B3530",
  },
  fireBadgeText: { fontSize: 9, fontWeight: "700", color: "#FF6B35" },
  seeAll: { fontSize: 13, color: Colors.brand.pink, fontWeight: "600" },

  // Filter pills
  filterRow: { flexDirection: "row", gap: 8, paddingHorizontal: 20, marginBottom: 12 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    backgroundColor: Colors.bg.card,
  },
  filterText: { fontSize: 12, fontWeight: "600", color: Colors.text.muted },

  // User cards
  usersRow: { paddingHorizontal: 20, gap: 10 },
  userCard: {},
  userPhotoWrap: {
    width: 120,
    height: 160,
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
  },
  userPhoto: { width: "100%", height: "100%" },
  userGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  onlineDot: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Colors.status.online,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.4)",
  },
  userBottom: {
    position: "absolute",
    bottom: 9,
    left: 9,
    right: 9,
    gap: 4,
  },
  userName: { fontSize: 12, fontWeight: "700", color: "#fff" },
  emptyUsersState: {
    width: width - 40,
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyUsersText: { color: Colors.text.muted, fontSize: 13 },

  // Featured card
  featuredCard: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  featuredImg: { width: "100%", height: "100%" },
  featuredContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: "space-between",
  },
  featuredTop: { flexDirection: "row" },
  featuredBottom: { gap: 4 },
  featuredName: { fontSize: 22, fontWeight: "800", color: "#fff", letterSpacing: -0.3 },
  featuredAddr: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 },
  featuredStats: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  featuredStat: { flexDirection: "row", alignItems: "baseline", gap: 3 },
  featuredStatNum: { fontSize: 15, fontWeight: "700", color: "#fff" },
  featuredStatLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)" },
  featuredStatDiv: { width: 1, height: 12, backgroundColor: "rgba(255,255,255,0.2)" },
  vibes: { flexDirection: "row", gap: 6 },
  vibeChip: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  vibeText: { fontSize: 10, color: "#fff", fontWeight: "500" },
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: `${Colors.status.online}25`,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: `${Colors.status.online}40`,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.status.online },
  liveText: { fontSize: 10, fontWeight: "700", color: Colors.status.online, letterSpacing: 0.5 },

  // Venue list
  venueList: { paddingHorizontal: 20, gap: 10 },
  venueCard: {
    flexDirection: "row",
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  venueThumbnailWrap: { width: 84 },
  venueThumbnail: { width: 84, height: "100%", minHeight: 90 },
  venueInfo: { flex: 1, padding: 12, gap: 4 },
  venueInfoTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  venueName: { fontSize: 14, fontWeight: "700", color: Colors.text.primary, flex: 1 },
  venueCountPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.bg.elevated,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  venueCountDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: Colors.status.online },
  venueCountText: { fontSize: 11, fontWeight: "600", color: Colors.text.secondary },
  venueAddr: { fontSize: 11, color: Colors.text.muted },
  vibeRowSmall: { flexDirection: "row", gap: 5 },
  vibeChipSmall: {
    backgroundColor: Colors.bg.elevated,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  vibeTextSmall: { fontSize: 9, color: Colors.text.secondary, fontWeight: "500" },
  venueFooter: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  venueRoleNum: { fontSize: 11, fontWeight: "600" },
  venueDot: { color: Colors.text.muted, fontSize: 11 },
});
