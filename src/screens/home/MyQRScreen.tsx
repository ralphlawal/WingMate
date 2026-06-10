import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types";
import { Colors } from "../../theme";
import { MOCK_CURRENT_USER } from "../../mock";
import QRCode from "qrcode";

type Props = NativeStackScreenProps<HomeStackParamList, "MyQR">;

const { width } = Dimensions.get("window");
const QR_SIZE = width - 96;

export default function MyQRScreen({ navigation }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(`wingmate://user/${MOCK_CURRENT_USER.id}`, {
      width: QR_SIZE * 2,
      margin: 2,
      color: { dark: "#0D0D14", light: "#FFFFFF" },
    }).then(setQrDataUrl);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My QR Code</Text>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={() =>
            Share.share({ message: `Scan my WingMate code: wingmate://user/${MOCK_CURRENT_USER.id}` })
          }
        >
          <Ionicons name="share-outline" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {/* Card */}
        <View style={styles.card}>
          {/* User info */}
          <View style={styles.userRow}>
            <Image source={{ uri: MOCK_CURRENT_USER.photos[0] }} style={styles.avatar} />
            <View>
              <Text style={styles.userName}>
                {MOCK_CURRENT_USER.name}, {MOCK_CURRENT_USER.age}
              </Text>
              <View style={styles.statusRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.statusText}>Active now · The Grotto</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* QR code */}
          <View style={styles.qrWrap}>
            {qrDataUrl ? (
              <Image
                source={{ uri: qrDataUrl }}
                style={{ width: QR_SIZE, height: QR_SIZE }}
              />
            ) : (
              <View style={[{ width: QR_SIZE, height: QR_SIZE }, styles.qrPlaceholder]}>
                <Ionicons name="qr-code-outline" size={60} color={Colors.border.default} />
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <Text style={styles.cardHint}>
            Let someone scan this to start a conversation — no number needed
          </Text>
        </View>

        {/* Scan button */}
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => navigation.replace("ScanQR")}
          activeOpacity={0.85}
        >
          <Ionicons name="scan-outline" size={18} color={Colors.brand.teal} />
          <Text style={styles.scanBtnText}>Scan someone else's code</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Scanning creates a private message thread.{"\n"}No phone numbers are ever shared.
        </Text>
      </View>
    </SafeAreaView>
  );
}

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
  shareBtn: { padding: 4 },

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    gap: 20,
    shadowColor: Colors.brand.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },

  userRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: Colors.brand.pink,
  },
  userName: { fontSize: 16, fontWeight: "700", color: "#0D0D14" },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: Colors.status.online },
  statusText: { fontSize: 12, color: "#6B6B80" },

  divider: { width: "100%", height: 1, backgroundColor: "#F0F0F5" },

  qrWrap: {
    borderRadius: 16,
    overflow: "hidden",
  },
  qrPlaceholder: {
    backgroundColor: "#F8F8FA",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },

  cardHint: {
    fontSize: 12,
    color: "#8B8B9E",
    textAlign: "center",
    lineHeight: 18,
  },

  scanBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: `${Colors.brand.teal}15`,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: `${Colors.brand.teal}30`,
    width: "100%",
    justifyContent: "center",
  },
  scanBtnText: { fontSize: 15, fontWeight: "600", color: Colors.brand.teal },

  footerNote: {
    fontSize: 12,
    color: Colors.text.muted,
    textAlign: "center",
    lineHeight: 18,
  },
});
