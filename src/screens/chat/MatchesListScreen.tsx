import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatStackParamList } from "../../types";
import { Colors } from "../../theme";
import { MOCK_MATCHES, MOCK_USERS } from "../../mock";

type Props = NativeStackScreenProps<ChatStackParamList, "MatchesList">;
type Filter = "all" | "unread";

function timeAgo(isoString: string): string {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function MatchesListScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const matches = MOCK_MATCHES.filter((m) =>
    filter === "unread" ? m.unreadCount > 0 : true
  );
  const totalUnread = MOCK_MATCHES.reduce((s, m) => s + m.unreadCount, 0);
  const storiesMatches = MOCK_MATCHES.filter((m) => m.unreadCount > 0);

  const newTonight = matches.filter(
    (m) => (Date.now() - new Date(m.createdAt).getTime()) / 3600000 < 4
  );
  const olderMatches = matches.filter(
    (m) => (Date.now() - new Date(m.createdAt).getTime()) / 3600000 >= 4
  );

  type SectionItem =
    | { kind: "label"; text: string; id: string }
    | { kind: "match"; matchId: string; id: string };

  const listData: SectionItem[] = [];
  if (newTonight.length > 0) {
    listData.push({ kind: "label", text: "NEW TONIGHT", id: "label-new" });
    newTonight.forEach((m) => listData.push({ kind: "match", matchId: m.id, id: m.id }));
  }
  if (olderMatches.length > 0) {
    listData.push({ kind: "label", text: "CONVERSATIONS", id: "label-conv" });
    olderMatches.forEach((m) => listData.push({ kind: "match", matchId: m.id, id: m.id }));
  }
  if (matches.length === 0) {
    listData.push({ kind: "match", matchId: "__empty__", id: "__empty__" });
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Matches</Text>
          {totalUnread > 0 && (
            <Text style={styles.headerSub}>
              {totalUnread} new message{totalUnread > 1 ? "s" : ""}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="search-outline" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Stories row — unread matches */}
      {storiesMatches.length > 0 && (
        <View style={styles.storiesSection}>
          <View style={styles.storiesRow}>
            {storiesMatches.map((match) => {
              const user = MOCK_USERS.find((u) => u.id === match.matchedUserId);
              if (!user) return null;
              return (
                <TouchableOpacity
                  key={match.id}
                  style={styles.storyItem}
                  onPress={() =>
                    navigation.navigate("ChatThread", {
                      matchId: match.id,
                      userName: user.name,
                    })
                  }
                  activeOpacity={0.8}
                >
                  <View style={styles.storyRing}>
                    <Image source={{ uri: user.photos[0] }} style={styles.storyAvatar} />
                    {match.unreadCount > 0 && (
                      <View style={styles.storyBadge}>
                        <Text style={styles.storyBadgeText}>{match.unreadCount}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.storyName} numberOfLines={1}>{user.name}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.storyItem} activeOpacity={0.7}>
              <View style={[styles.storyRing, styles.storyRingDashed]}>
                <View style={styles.storyAvatarEmpty}>
                  <Ionicons name="add" size={22} color={Colors.text.muted} />
                </View>
              </View>
              <Text style={styles.storyName}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Filter tabs */}
      <View style={styles.filterBar}>
        {(["all", "unread"] as Filter[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterTabText, filter === f && styles.filterTabTextActive]}>
              {f === "all" ? "All matches" : "Unread"}
            </Text>
            {f === "unread" && totalUnread > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{totalUnread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          if (item.kind === "label") {
            return <Text style={styles.groupLabel}>{item.text}</Text>;
          }

          if (item.matchId === "__empty__") {
            return (
              <View style={styles.empty}>
                <View style={styles.emptyIcon}>
                  <Ionicons name="heart-outline" size={32} color={Colors.text.muted} />
                </View>
                <Text style={styles.emptyTitle}>
                  No {filter === "unread" ? "unread messages" : "matches yet"}
                </Text>
                <Text style={styles.emptySub}>
                  Signal someone at a venue to get the conversation started
                </Text>
              </View>
            );
          }

          const match = MOCK_MATCHES.find((m) => m.id === item.matchId);
          if (!match) return null;
          const user = MOCK_USERS.find((u) => u.id === match.matchedUserId);
          if (!user) return null;

          return (
            <TouchableOpacity
              style={[styles.matchRow, match.unreadCount > 0 && styles.matchRowUnread]}
              onPress={() =>
                navigation.navigate("ChatThread", {
                  matchId: match.id,
                  userName: user.name,
                })
              }
              activeOpacity={0.75}
            >
              <View style={styles.avatarWrap}>
                <Image source={{ uri: user.photos[0] }} style={styles.avatar} />
                {user.isOnline && <View style={styles.onlineDot} />}
              </View>

              <View style={styles.matchInfo}>
                <View style={styles.matchInfoTop}>
                  <Text style={[styles.matchName, match.unreadCount > 0 && styles.matchNameBold]}>
                    {user.name}, {user.age}
                  </Text>
                  <Text style={styles.matchTime}>
                    {match.lastMessage
                      ? timeAgo(match.lastMessage.sentAt)
                      : timeAgo(match.createdAt)}
                  </Text>
                </View>

                {match.wingVouch && (
                  <View style={styles.vouchRow}>
                    <Ionicons name="people" size={10} color={Colors.brand.teal} />
                    <Text style={styles.vouchText} numberOfLines={1}>
                      Vouched by {match.wingVouch.wingName}
                    </Text>
                  </View>
                )}

                <View style={styles.matchMsgRow}>
                  {match.lastMessage?.senderId === "me" && (
                    <Ionicons
                      name={match.lastMessage?.read ? "checkmark-done" : "checkmark"}
                      size={12}
                      color={match.lastMessage?.read ? Colors.brand.teal : Colors.text.muted}
                      style={{ marginRight: 3, marginTop: 1 }}
                    />
                  )}
                  <Text
                    style={[styles.matchMsg, match.unreadCount > 0 && styles.matchMsgUnread]}
                    numberOfLines={1}
                  >
                    {match.lastMessage?.text ?? "Say hello!"}
                  </Text>
                  {match.unreadCount > 0 && (
                    <View style={styles.unreadBubble}>
                      <Text style={styles.unreadCount}>{match.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 28, fontWeight: "800", color: Colors.text.primary, letterSpacing: -0.5 },
  headerSub: { fontSize: 12, color: Colors.brand.pink, fontWeight: "600", marginTop: 2 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.bg.elevated,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  storiesSection: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
    paddingBottom: 16,
    marginBottom: 8,
  },
  storiesRow: { flexDirection: "row", paddingHorizontal: 20, gap: 16 },
  storyItem: { alignItems: "center", gap: 6 },
  storyRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    padding: 2.5,
    borderWidth: 2.5,
    borderColor: Colors.brand.pink,
    position: "relative",
  },
  storyRingDashed: { borderColor: Colors.border.default, borderStyle: "dashed" },
  storyAvatar: { width: "100%", height: "100%", borderRadius: 28 },
  storyAvatarEmpty: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    backgroundColor: Colors.bg.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  storyBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.brand.pink,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.bg.primary,
  },
  storyBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  storyName: {
    fontSize: 11,
    color: Colors.text.secondary,
    fontWeight: "500",
    maxWidth: 62,
    textAlign: "center",
  },

  filterBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 6,
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  filterTabActive: { backgroundColor: `${Colors.brand.pink}15`, borderColor: Colors.brand.pink },
  filterTabText: { fontSize: 13, color: Colors.text.muted, fontWeight: "600" },
  filterTabTextActive: { color: Colors.brand.pink },
  filterBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.brand.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },

  list: { flex: 1 },
  listContent: { paddingBottom: 120, paddingHorizontal: 20 },

  groupLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.text.muted,
    letterSpacing: 1.2,
    paddingTop: 10,
    paddingBottom: 6,
  },

  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginHorizontal: -12,
  },
  matchRowUnread: { backgroundColor: Colors.bg.card },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.border.subtle,
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.status.online,
    borderWidth: 1.5,
    borderColor: Colors.bg.primary,
  },
  matchInfo: { flex: 1 },
  matchInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  matchName: { fontSize: 15, fontWeight: "600", color: Colors.text.secondary },
  matchNameBold: { fontWeight: "700", color: Colors.text.primary },
  matchTime: { fontSize: 11, color: Colors.text.muted },
  vouchRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 3 },
  vouchText: { fontSize: 11, color: Colors.brand.teal, fontWeight: "500" },
  matchMsgRow: { flexDirection: "row", alignItems: "center" },
  matchMsg: { flex: 1, fontSize: 13, color: Colors.text.muted, lineHeight: 18 },
  matchMsgUnread: { color: Colors.text.secondary, fontWeight: "500" },
  unreadBubble: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.brand.pink,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    marginLeft: 6,
  },
  unreadCount: { color: "#fff", fontSize: 10, fontWeight: "700" },

  empty: { paddingTop: 60, alignItems: "center", gap: 12, paddingHorizontal: 24 },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.bg.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: { fontSize: 17, fontWeight: "700", color: Colors.text.secondary, textAlign: "center" },
  emptySub: { fontSize: 13, color: Colors.text.muted, textAlign: "center", lineHeight: 19 },
});
