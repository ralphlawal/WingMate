import React from "react";
import { View, Text } from "react-native";
import { UserRole } from "../../types";
import { RoleConfig } from "../../theme";

interface RoleBadgeProps {
  role: UserRole;
  size?: "sm" | "md" | "lg";
  showEmoji?: boolean;
}

const sizeMap = {
  sm: { fontSize: 10, px: 8, py: 3, radius: 6, emojiSize: 10 },
  md: { fontSize: 12, px: 10, py: 4, radius: 8, emojiSize: 12 },
  lg: { fontSize: 14, px: 14, py: 6, radius: 10, emojiSize: 14 },
};

export default function RoleBadge({ role, size = "md", showEmoji = true }: RoleBadgeProps) {
  const config = RoleConfig[role];
  const s = sizeMap[size];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: config.bg,
        paddingHorizontal: s.px,
        paddingVertical: s.py,
        borderRadius: s.radius,
        alignSelf: "flex-start",
      }}
    >
      {showEmoji ? (
        <Text style={{ fontSize: s.emojiSize }}>{config.emoji}</Text>
      ) : null}
      <Text
        style={{
          color: config.color,
          fontSize: s.fontSize,
          fontWeight: "600",
          letterSpacing: 0.3,
        }}
      >
        {config.label}
      </Text>
    </View>
  );
}
