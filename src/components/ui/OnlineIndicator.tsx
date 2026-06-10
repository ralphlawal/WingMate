import React from "react";
import { View } from "react-native";
import { Colors } from "../../theme";

interface OnlineIndicatorProps {
  size?: number;
  borderColor?: string;
}

export default function OnlineIndicator({
  size = 12,
  borderColor = Colors.bg.card,
}: OnlineIndicatorProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: Colors.status.online,
        borderWidth: 2,
        borderColor,
      }}
    />
  );
}
