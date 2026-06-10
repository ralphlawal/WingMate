import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types";
import { Colors } from "../../theme";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Splash">;

const { width } = Dimensions.get("window");

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Phone"), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#08080F", "#0D0D1A", "#08080F"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Pink glow orb — upper left */}
      <View style={[styles.orb, styles.orbPink]} />

      {/* Teal glow orb — lower right */}
      <View style={[styles.orb, styles.orbTeal]} />

      {/* Center content */}
      <View style={styles.centerContent}>
        <View style={styles.iconWrap}>
          <Text style={styles.wing}>🪽</Text>
        </View>

        <Text style={styles.wordmark}>WingMate</Text>
        <Text style={styles.tagline}>Your night. Your crew. Your match.</Text>
      </View>

      {/* Loading dots */}
      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === 0 && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Bottom label */}
      <Text style={styles.bottomLabel}>FIND YOUR MATCH TONIGHT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08080F",
    alignItems: "center",
    justifyContent: "center",
  },
  orb: {
    position: "absolute",
    borderRadius: 999,
  },
  orbPink: {
    width: 280,
    height: 280,
    backgroundColor: Colors.brand.pink,
    opacity: 0.07,
    top: "15%",
    left: "-10%",
  },
  orbTeal: {
    width: 220,
    height: 220,
    backgroundColor: Colors.brand.teal,
    opacity: 0.06,
    bottom: "20%",
    right: "-5%",
  },
  centerContent: {
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: `${Colors.brand.pink}15`,
    borderWidth: 1,
    borderColor: `${Colors.brand.pink}30`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  wing: { fontSize: 52 },
  wordmark: {
    fontSize: 46,
    fontWeight: "800",
    color: Colors.text.primary,
    letterSpacing: -1.5,
  },
  tagline: {
    fontSize: 14,
    color: Colors.text.muted,
    letterSpacing: 0.5,
  },
  dotsRow: {
    position: "absolute",
    bottom: 72,
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border.default,
  },
  dotActive: {
    backgroundColor: Colors.brand.pink,
    width: 22,
    borderRadius: 3,
  },
  bottomLabel: {
    position: "absolute",
    bottom: 44,
    fontSize: 10,
    fontWeight: "600",
    color: Colors.text.muted,
    letterSpacing: 2.5,
  },
});
