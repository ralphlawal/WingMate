import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  icon,
  rightElement,
  style,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ gap: 6 }}>
      {label ? (
        <Text
          style={{
            color: Colors.text.secondary,
            fontSize: 13,
            fontWeight: "500",
            marginBottom: 2,
          }}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.bg.card,
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: error
            ? "#FF453A"
            : focused
            ? Colors.brand.pink
            : Colors.border.subtle,
          paddingHorizontal: 16,
          height: 56,
          gap: 10,
        }}
      >
        {icon ? (
          <Ionicons name={icon} size={18} color={focused ? Colors.brand.pink : Colors.text.muted} />
        ) : null}

        <TextInput
          style={[
            {
              flex: 1,
              color: Colors.text.primary,
              fontSize: 15,
              fontWeight: "400",
            },
            style,
          ]}
          placeholderTextColor={Colors.text.muted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {rightElement}
      </View>

      {error ? (
        <Text style={{ color: "#FF453A", fontSize: 12, marginTop: 2 }}>{error}</Text>
      ) : hint ? (
        <Text style={{ color: Colors.text.muted, fontSize: 12, marginTop: 2 }}>{hint}</Text>
      ) : null}
    </View>
  );
}
