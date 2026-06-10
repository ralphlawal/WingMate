import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types";
import { Colors } from "../../theme";
import { MOCK_USERS } from "../../mock";

type Props = NativeStackScreenProps<HomeStackParamList, "ScanQR">;

const { width } = Dimensions.get("window");
const FRAME_SIZE = width - 80;

type ScanState = "scanning" | "found";

export default function ScanQRScreen({ navigation }: Props) {
  const [state, setState] = useState<ScanState>("scanning");
  const [foundUser] = useState(MOCK_USERS[0]);
  const scanAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the scan line
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(scanAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    );
    loop.start();

    // Simulate a successful scan after 3 seconds
    const timer = setTimeout(() => setState("found"), 3000);

    return () => {
      loop.stop();
      clearTimeout(timer);
    };
  }, []);

  const scanLineY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, FRAME_SIZE - 4],
  });

  if (state === "found") {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Code Scanned</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.foundBody}>
          <View style={styles.successRing}>
            <Ionicons name="checkmark" size={36} color={Colors.brand.teal} />
          </View>

          <Text style={styles.foundTitle}>Found!</Text>
          <Text style={styles.foundSub}>You scanned {foundUser.name}'s code</Text>

          {/* User card */}
          <View style={styles.userCard}>
            <Image source={{ uri: foundUser.photos[0] }} style={styles.userPhoto} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{foundUser.name}, {foundUser.age}</Text>
              <Text style={styles.userBio} numberOfLines={2}>{foundUser.bio}</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => {
                navigation.replace("HomeMap");
                // In a real app: navigate to the new chat thread
              }}
              activeOpacity={0.85}
            >
              <Ionicons name="chatbubble" size={16} color="#fff" />
              <Text style={styles.primaryBtnText}>Open chat with {foundUser.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.secondaryBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.privacyNote}>
            A private message thread is created.{"\n"}Your phone number stays private.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR Code</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.scanBody}>
        <Text style={styles.scanInstruction}>
          Point your camera at someone's WingMate code
        </Text>

        {/* Viewfinder */}
        <View style={styles.viewfinder}>
          {/* Dark overlay corners — simulated camera feed */}
          <View style={[styles.frame, { width: FRAME_SIZE, height: FRAME_SIZE }]}>
            {/* Corner marks */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Scan line */}
            <Animated.View
              style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]}
            />

            {/* Mock camera content */}
            <View style={styles.mockCamera}>
              <Ionicons name="scan" size={40} color="rgba(255,255,255,0.15)" />
            </View>
          </View>
        </View>

        <Text style={styles.scanHint}>
          Scanning…
        </Text>

        <TouchableOpacity
          style={styles.myQrBtn}
          onPress={() => navigation.replace("MyQR")}
        >
          <Ionicons name="qr-code-outline" size={16} color={Colors.text.secondary} />
          <Text style={styles.myQrBtnText}>Show my code instead</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const CORNER = 22;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  closeBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: "700", color: Colors.text.primary },

  // Scanning state
  scanBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    paddingHorizontal: 24,
  },
  scanInstruction: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 22,
  },
  viewfinder: {
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.bg.card,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  mockCamera: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  corner: {
    position: "absolute",
    width: CORNER,
    height: CORNER,
    borderColor: Colors.brand.pink,
    borderWidth: 3,
    zIndex: 2,
  },
  cornerTL: { top: 14, left: 14, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  cornerTR: { top: 14, right: 14, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  cornerBL: { bottom: 14, left: 14, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  cornerBR: { bottom: 14, right: 14, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },
  scanLine: {
    position: "absolute",
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: Colors.brand.pink,
    borderRadius: 1,
    opacity: 0.8,
    zIndex: 3,
    shadowColor: Colors.brand.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  scanHint: { color: Colors.text.muted, fontSize: 13 },
  myQrBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    backgroundColor: Colors.bg.card,
  },
  myQrBtnText: { fontSize: 14, color: Colors.text.secondary, fontWeight: "500" },

  // Found state
  foundBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 18,
  },
  successRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${Colors.brand.teal}18`,
    borderWidth: 2,
    borderColor: `${Colors.brand.teal}40`,
    alignItems: "center",
    justifyContent: "center",
  },
  foundTitle: { fontSize: 28, fontWeight: "800", color: Colors.text.primary, letterSpacing: -0.4 },
  foundSub: { fontSize: 15, color: Colors.text.muted, marginTop: -8 },

  userCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.bg.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  userPhoto: { width: 60, height: 60, borderRadius: 16 },
  userInfo: { flex: 1, gap: 4 },
  userName: { fontSize: 16, fontWeight: "700", color: Colors.text.primary },
  userBio: { fontSize: 13, color: Colors.text.muted, lineHeight: 18 },

  actionRow: { width: "100%", gap: 10 },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.brand.pink,
    borderRadius: 16,
    paddingVertical: 15,
  },
  primaryBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  secondaryBtn: { alignItems: "center", paddingVertical: 10 },
  secondaryBtnText: { fontSize: 14, color: Colors.text.muted, fontWeight: "500" },

  privacyNote: {
    fontSize: 12,
    color: Colors.text.muted,
    textAlign: "center",
    lineHeight: 18,
  },
});
