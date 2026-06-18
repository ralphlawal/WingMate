import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList, UserRole } from "../../types";
import { Colors, RoleConfig } from "../../theme";
import { RoleBadge, Button } from "../../components/ui";
import { MOCK_VENUES, MOCK_USERS } from "../../mock";

type Props = NativeStackScreenProps<HomeStackParamList, "VenueDetail">;
type FilterTab = "all" | UserRole;

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "Everyone" },
  { key: "single", label: "Singles" },
  { key: "wing", label: "Wings" },
];

export default function VenueDetailScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [checkedIn, setCheckedIn] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const venue = MOCK_VENUES.find((v) => v.id === route.params.venueId) ?? MOCK_VENUES[0];
  const users = MOCK_USERS.filter((u) => u.venueId === venue.id);
  const filtered = activeTab === "all" ? users : users.filter((u) => u.role === activeTab);

  const handleCheckIn = () => {
    setVerifying(true);
    // Simulate GPS location verification
    setTimeout(() => {
      setVerifying(false);
      setCheckedIn(true);
    }, 1800);
  };

  return (
    <View style={styles.container}>
      {/* Hero */}
      <View style={styles.heroWrap}>
        <Image source={{ uri: venue.thumbnail }} style={styles.heroImg} />
        <LinearGradient
          colors={["rgba(0,0,0,0.55)", "transparent", Colors.bg.primary]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView edges={["top"]} style={styles.heroNav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn}>
            <Ionicons name="share-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyContent}
      >
        {/* Venue header */}
        <View style={styles.venueHeader}>
          <View style={{ flex: 1, gap: 5 }}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <View style={styles.addrRow}>
              <Ionicons name="location-outline" size={13} color={Colors.text.muted} />
              <Text style={styles.venueAddr}>{venue.address}</Text>
            </View>
          </View>
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {/* Stats — always visible so you know it's worth going */}
        <View style={styles.statsRow}>
          {[
            { label: "Here now", value: venue.activeCount, color: Colors.text.primary },
            { label: "Singles", value: venue.singlesCount, color: Colors.role.single },
            { label: "Wings", value: venue.wingsCount, color: Colors.role.wing },
          ].map((s) => (
            <View key={s.label} style={styles.statBox}>
              <Text style={[styles.statNum, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Vibes */}
        <View style={styles.vibesRow}>
          {venue.vibe.map((v) => (
            <View key={v} style={styles.vibeChip}>
              <Text style={styles.vibeText}>{v}</Text>
            </View>
          ))}
        </View>

        {/* Check-in */}
        <View style={styles.checkinSection}>
          {checkedIn ? (
            <View style={styles.checkedInBanner}>
              <View style={styles.checkedInDot} />
              <Text style={styles.checkedInText}>You're checked in here</Text>
              <TouchableOpacity onPress={() => setCheckedIn(false)}>
                <Text style={styles.checkoutLink}>Check out</Text>
              </TouchableOpacity>
            </View>
          ) : verifying ? (
            <View style={styles.verifyingBanner}>
              <ActivityIndicator size="small" color={Colors.brand.pink} />
              <View style={{ flex: 1 }}>
                <Text style={styles.verifyingText}>Verifying your location…</Text>
                <Text style={styles.verifyingSub}>Making sure you're actually here</Text>
              </View>
            </View>
          ) : (
            <>
              <Button
                label="Check in here"
                onPress={handleCheckIn}
                fullWidth
                size="md"
                icon={<Ionicons name="location" size={16} color="#fff" />}
              />
              <Text style={styles.checkinHint}>
                GPS required · Check in to see who's here
              </Text>
            </>
          )}
        </View>

        {/* Who's here */}
        <View style={styles.whoSection}>
          <Text style={styles.whoTitle}>Who's here</Text>

          {checkedIn ? (
            <>
              {/* Filter tabs */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabs}
              >
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.key;
                  const color =
                    tab.key === "all"
                      ? Colors.brand.pink
                      : RoleConfig[tab.key as UserRole]?.color ?? Colors.brand.pink;
                  return (
                    <TouchableOpacity
                      key={tab.key}
                      onPress={() => setActiveTab(tab.key)}
                      style={[
                        styles.tabChip,
                        isActive && {
                          backgroundColor: `${color}20`,
                          borderColor: color,
                        },
                      ]}
                    >
                      <Text style={[styles.tabText, isActive && { color }]}>
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* User grid */}
              <View style={styles.userGrid}>
                {filtered.map((user) => (
                  <TouchableOpacity
                    key={user.id}
                    style={styles.userCard}
                    onPress={() =>
                      navigation.navigate("UserProfile", { userId: user.id })
                    }
                    activeOpacity={0.85}
                  >
                    <View style={styles.userPhotoWrap}>
                      <Image source={{ uri: user.photos[0] }} style={styles.userPhoto} />
                      <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.8)"]}
                        style={StyleSheet.absoluteFill}
                      />
                      <View style={styles.userBottom}>
                        <Text style={styles.cardName}>{user.name}, {user.age}</Text>
                        <RoleBadge role={user.role} size="sm" />
                      </View>
                      <View style={styles.onlineDot} />
                    </View>
                  </TouchableOpacity>
                ))}

                {filtered.length === 0 && (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No one here with this filter yet</Text>
                  </View>
                )}
              </View>
            </>
          ) : (
            /* Locked state — blurred placeholder grid */
            <View style={styles.lockedWrap}>
              <View style={styles.lockedGrid}>
                {[...Array(4)].map((_, i) => (
                  <View key={i} style={styles.lockedCard} />
                ))}
              </View>
              <View style={styles.lockedOverlay}>
                <View style={styles.lockedIconWrap}>
                  <Ionicons name="location-outline" size={28} color={Colors.brand.pink} />
                </View>
                <Text style={styles.lockedTitle}>Check in to see profiles</Text>
                <Text style={styles.lockedSub}>
                  We verify you're actually here — no remote browsing.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg.primary },

  heroWrap: { height: 300, position: "relative" },
  heroImg: { width: "100%", height: "100%" },
  heroNav: {
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

  body: { flex: 1, marginTop: -32 },
  bodyContent: { paddingBottom: 120 },

  venueHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
    marginBottom: 16,
  },
  venueName: { fontSize: 26, fontWeight: "800", color: Colors.text.primary, letterSpacing: -0.4 },
  addrRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  venueAddr: { color: Colors.text.muted, fontSize: 13 },
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: `${Colors.status.online}18`,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: `${Colors.status.online}35`,
  },
  liveDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: Colors.status.online },
  liveText: { color: Colors.status.online, fontSize: 11, fontWeight: "700", letterSpacing: 1 },

  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.bg.card,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    gap: 3,
  },
  statNum: { fontSize: 24, fontWeight: "800" },
  statLabel: { fontSize: 11, color: Colors.text.muted },

  vibesRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  vibeChip: {
    backgroundColor: Colors.bg.elevated,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  vibeText: { color: Colors.text.secondary, fontSize: 12, fontWeight: "500" },

  checkinSection: { paddingHorizontal: 20, marginBottom: 28 },
  checkedInBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: `${Colors.status.online}12`,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: `${Colors.status.online}35`,
  },
  checkedInDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.status.online },
  checkedInText: { flex: 1, color: Colors.text.primary, fontSize: 14, fontWeight: "500" },
  checkoutLink: { color: Colors.brand.pink, fontSize: 13, fontWeight: "600" },

  verifyingBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: `${Colors.brand.pink}10`,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: `${Colors.brand.pink}25`,
  },
  verifyingText: { color: Colors.text.primary, fontSize: 14, fontWeight: "600" },
  verifyingSub: { color: Colors.text.muted, fontSize: 12, marginTop: 2 },

  checkinHint: {
    textAlign: "center",
    color: Colors.text.muted,
    fontSize: 12,
    marginTop: 10,
  },

  whoSection: { paddingBottom: 24 },
  whoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.primary,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  tabs: { paddingHorizontal: 20, gap: 8, marginBottom: 16 },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    backgroundColor: Colors.bg.card,
  },
  tabText: { fontSize: 13, fontWeight: "600", color: Colors.text.muted },

  userGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
  },
  userCard: { width: "47%" },
  userPhotoWrap: {
    height: 200,
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
  },
  userPhoto: { width: "100%", height: "100%" },
  userBottom: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    gap: 5,
  },
  cardName: { fontSize: 14, fontWeight: "700", color: "#fff" },
  onlineDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.status.online,
    borderWidth: 2,
    borderColor: Colors.bg.card,
  },
  emptyState: {
    width: "100%",
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: { color: Colors.text.muted, fontSize: 14 },

  // Locked state
  lockedWrap: {
    marginHorizontal: 20,
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },
  lockedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    opacity: 0.15,
  },
  lockedCard: {
    width: "47%",
    height: 200,
    borderRadius: 18,
    backgroundColor: Colors.bg.elevated,
  },
  lockedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 32,
  },
  lockedIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${Colors.brand.pink}15`,
    borderWidth: 1,
    borderColor: `${Colors.brand.pink}30`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  lockedTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.primary,
    textAlign: "center",
  },
  lockedSub: {
    fontSize: 13,
    color: Colors.text.muted,
    textAlign: "center",
    lineHeight: 19,
  },
});
