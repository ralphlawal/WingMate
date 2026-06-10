import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Colors } from "../../theme";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, { bg: string; text: string; border?: string }> = {
  primary: { bg: Colors.brand.pink, text: "#FFFFFF" },
  secondary: { bg: Colors.bg.elevated, text: Colors.text.primary, border: Colors.border.default },
  ghost: { bg: "transparent", text: Colors.text.secondary },
  danger: { bg: "#FF453A20", text: "#FF453A", border: "#FF453A40" },
};

const sizeStyles: Record<Size, { height: number; px: number; fontSize: number; radius: number }> = {
  sm: { height: 36, px: 16, fontSize: 13, radius: 10 },
  md: { height: 52, px: 24, fontSize: 15, radius: 14 },
  lg: { height: 60, px: 32, fontSize: 17, radius: 16 },
};

export default function Button({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        {
          backgroundColor: v.bg,
          height: s.height,
          paddingHorizontal: s.px,
          borderRadius: s.radius,
          borderWidth: v.border ? 1 : 0,
          borderColor: v.border,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: isDisabled ? 0.5 : 1,
          alignSelf: fullWidth ? "stretch" : "auto",
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.text} />
      ) : (
        <>
          {icon && <View>{icon}</View>}
          <Text
            style={{
              color: v.text,
              fontSize: s.fontSize,
              fontWeight: "600",
              letterSpacing: 0.2,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
