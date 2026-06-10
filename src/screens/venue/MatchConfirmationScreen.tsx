import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types";
import { Colors } from "../../theme";
import { Button } from "../../components/ui";
import { MOCK_USERS, MOCK_CURRENT_USER } from "../../mock";

type Props = NativeStackScreenProps<HomeStackParamList, "MatchConfirmation">;

const { width } = Dimensions.get("window");

export default function MatchConfirmationScreen({ navigation }: Props) {
  const matchedUser = MOCK_USERS[0];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#12061A", "#0D0D14", "#0D0D14"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Glow orbs */}
      <View style={[styles.orb, styles.orbPink]} />
      <View style={[styles.orb, styles.orbTeal]} />
      <View style={[styles.orb, styles.orbPinkSmall]} />

      {/* Match label */}
      <View style={styles.topLabel}>
        <Text style={styles.matchEmoji}>🎉</Text>
        <Text style={styles.matchTitle}>It's a Match!</Text>
        <Text style={styles.matchSub}>
          You and {matchedUser.name} both signaled interest
        </Text>
      </View>

      {/* Overlapping photos */}
      <View style={styles.photosRow}>
        <View style={[styles.photoWrap, styles.photoLeft]}>
          <Image source={{ uri: MOCK_CURRENT_USER.photos[0] }} style={styles.matchPhoto} />
          <View style={[styles.photoBorder, { borderColor: Colors.brand.pink }]} />
          <View style={styles.photoLabelWrap}>
            <Text style={styles.photoLabel}>You</Text>
          </View>
        </View>

        <View style={styles.heartBadge}>
          <Text style={{ fontSize: 24 }}>💫</Text>
        </View>

        <View style={[styles.photoWrap, styles.photoRight]}>
          <Image source={{ uri: matchedUser.photos[0] }} style={styles.matchPhoto} />
          <View style={[styles.photoBorder, { borderColor: Colors.brand.teal }]} />
          <View style={styles.photoLabelWrap}>
            <Text style={styles.photoLabel}>{matchedUser.name}</Text>
          </View>
        </View>
      </View>

      {/* Venue pill */}
      <View style={styles.venuePill}>
        <Ionicons name="location" size={13} color={Colors.brand.pink} />
        <Text style={styles.venueText}>Both at The Grotto right now</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          label={`Message ${matchedUser.name}`}
          onPress={() => navigation.navigate("HomeMap")}
          fullWidth
          size="lg"
          icon={<Text style={{ fontSize: 16 }}>💬</Text>}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeMap")}
          style={styles.keepBtn}
        >
          <Text style={styles.keepText}>Keep browsing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PHOTO_SIZE = 148;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D14",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  orb: { position: "absolute", borderRadius: 999 },
  orbPink: {
    width: 320,
    height: 320,
    backgroundColor: Colors.brand.pink,
    opacity: 0.08,
    top: "10%",
    left: "-20%",
  },
  orbTeal: {
    width: 260,
    height: 260,
    backgroundColor: Colors.brand.teal,
    opacity: 0.07,
    bottom: "15%",
    right: "-15%",
  },
  orbPinkSmall: {
    width: 160,
    height: 160,
    backgroundColor: Colors.brand.pink,
    opacity: 0.05,
    bottom: "35%",
    left: "30%",
  },

  topLabel: {
    alignItems: "center",
    gap: 10,
    marginBottom: 44,
  },
  matchEmoji: { fontSize: 52 },
  matchTitle: {
    fontSize: 38,
    fontWeight: "800",
    color: Colors.text.primary,
    letterSpacing: -1,
  },
  matchSub: {
    fontSize: 15,
    color: Colors.text.muted,
    textAlign: "center",
  },

  photosRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    width: "100%",
  },
  photoWrap: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE * 1.2,
    borderRadius: 22,
    overflow: "visible",
    position: "relative",
  },
  photoLeft: {
    transform: [{ rotate: "-6deg" }],
    zIndex: 1,
  },
  photoRight: {
    transform: [{ rotate: "6deg" }],
    zIndex: 1,
    marginLeft: -28,
  },
  matchPhoto: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE * 1.2,
    borderRadius: 22,
  },
  photoBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 22,
    borderWidth: 3,
  },
  photoLabelWrap: {
    position: "absolute",
    bottom: -26,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  photoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.muted,
  },
  heartBadge: {
    zIndex: 2,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.bg.primary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: -14,
    borderWidth: 2,
    borderColor: Colors.border.default,
    elevation: 10,
    shadowColor: Colors.brand.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },

  venuePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.bg.elevated,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 44,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  venueText: { color: Colors.text.secondary, fontSize: 13, fontWeight: "500" },

  actions: { width: "100%", gap: 14 },
  keepBtn: { alignItems: "center", paddingVertical: 8 },
  keepText: { color: Colors.text.muted, fontSize: 15, fontWeight: "500" },
});
