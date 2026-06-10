import React from "react";
import { View, ViewProps } from "react-native";
import { Colors } from "../../theme";

interface CardProps extends ViewProps {
  elevated?: boolean;
  noPadding?: boolean;
}

export default function Card({ elevated = false, noPadding = false, style, children, ...props }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: elevated ? Colors.bg.elevated : Colors.bg.card,
          borderRadius: 16,
          padding: noPadding ? 0 : 16,
          borderWidth: 1,
          borderColor: Colors.border.subtle,
          overflow: "hidden",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
