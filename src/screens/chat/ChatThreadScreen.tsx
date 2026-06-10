import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatStackParamList, Message } from "../../types";
import { Colors } from "../../theme";
import { MOCK_MESSAGES, MOCK_MATCHES, MOCK_USERS } from "../../mock";

type Props = NativeStackScreenProps<ChatStackParamList, "ChatThread">;

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatThreadScreen({ navigation, route }: Props) {
  const { matchId, userName } = route.params;
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[matchId] ?? []);
  const [input, setInput] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const flatRef = useRef<FlatList>(null);

  const match = MOCK_MATCHES.find((m) => m.id === matchId);
  const otherUser = MOCK_USERS.find((u) => u.id === match?.matchedUserId);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      matchId,
      senderId: "me",
      text: input.trim(),
      sentAt: new Date().toISOString(),
      read: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 80);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={Colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerUser} activeOpacity={0.75}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: otherUser?.photos[0] }} style={styles.avatar} />
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.headerName}>{userName}</Text>
            <Text style={styles.headerStatus}>
              At The Grotto · Active now
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreBtn}>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Wing vouch banner */}
      {match?.wingVouch && (
        <View style={styles.vouchBanner}>
          <Text style={{ fontSize: 15 }}>🤝</Text>
          <Text style={styles.vouchText} numberOfLines={2}>
            <Text style={{ color: Colors.brand.teal, fontWeight: "600" }}>
              {match.wingVouch.wingName}
            </Text>
            {" says: "}
            {match.wingVouch.message}
          </Text>
        </View>
      )}

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={Keyboard.dismiss}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatRef.current?.scrollToEnd({ animated: false })
          }
          renderItem={({ item, index }) => {
            const isMe = item.senderId === "me";
            const prev = messages[index - 1];
            const showTime =
              !prev ||
              new Date(item.sentAt).getTime() - new Date(prev.sentAt).getTime() >
                5 * 60000;

            return (
              <View>
                {showTime && (
                  <Text style={styles.timeLabel}>{formatTime(item.sentAt)}</Text>
                )}
                <View
                  style={[
                    styles.bubbleRow,
                    isMe ? styles.bubbleRowRight : styles.bubbleRowLeft,
                  ]}
                >
                  {!isMe && (
                    <Image
                      source={{ uri: otherUser?.photos[0] }}
                      style={styles.bubbleAvatar}
                    />
                  )}
                  <View
                    style={[
                      styles.bubble,
                      isMe ? styles.bubbleMe : styles.bubbleThem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bubbleText,
                        isMe ? styles.bubbleTextMe : styles.bubbleTextThem,
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />

        {/* Input bar */}
        <View style={[styles.inputBar, inputFocused && styles.inputBarFocused]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={`Message ${userName}...`}
            placeholderTextColor={Colors.text.muted}
            style={styles.input}
            multiline
            maxLength={500}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            selectionColor={Colors.brand.pink}
          />
          <TouchableOpacity
            style={[styles.sendBtn, input.trim() && styles.sendBtnActive]}
            onPress={handleSend}
            disabled={!input.trim()}
          >
            <Ionicons
              name="arrow-up"
              size={17}
              color={input.trim() ? "#fff" : Colors.text.muted}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.primary },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
    gap: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerUser: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  avatarWrap: { position: "relative" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  onlineDot: {
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
  headerName: { fontSize: 16, fontWeight: "700", color: Colors.text.primary },
  headerStatus: { fontSize: 11, color: Colors.text.muted },
  moreBtn: { padding: 8 },

  vouchBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: `${Colors.brand.teal}12`,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.brand.teal}20`,
  },
  vouchText: { flex: 1, fontSize: 12, color: Colors.text.muted, lineHeight: 17 },

  messageList: { paddingHorizontal: 14, paddingVertical: 14, gap: 2 },
  timeLabel: {
    textAlign: "center",
    fontSize: 11,
    color: Colors.text.muted,
    marginVertical: 14,
    fontWeight: "500",
  },
  bubbleRow: { flexDirection: "row", marginBottom: 3, alignItems: "flex-end", gap: 6 },
  bubbleRowRight: { justifyContent: "flex-end" },
  bubbleRowLeft: { justifyContent: "flex-start" },
  bubbleAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginBottom: 2,
  },
  bubble: {
    maxWidth: "74%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bubbleMe: {
    backgroundColor: Colors.brand.pink,
    borderBottomRightRadius: 5,
  },
  bubbleThem: {
    backgroundColor: Colors.bg.elevated,
    borderBottomLeftRadius: 5,
  },
  bubbleText: { fontSize: 15, lineHeight: 20 },
  bubbleTextMe: { color: "#fff" },
  bubbleTextThem: { color: Colors.text.primary },

  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 24 : 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border.subtle,
    backgroundColor: Colors.bg.primary,
  },
  inputBarFocused: {
    borderTopColor: `${Colors.brand.pink}40`,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.bg.elevated,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: Colors.text.primary,
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bg.elevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  sendBtnActive: {
    backgroundColor: Colors.brand.pink,
    borderColor: Colors.brand.pink,
  },
});
