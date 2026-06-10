export const Colors = {
  bg: {
    primary: "#0D0D14",
    secondary: "#16161F",
    card: "#1E1E2A",
    elevated: "#252533",
  },
  brand: {
    pink: "#FF3B6F",
    teal: "#4ECDC4",
    muted: "#8B8B9E",
    pinkDim: "#FF3B6F33",
    tealDim: "#4ECDC433",
  },
  role: {
    single: "#FF3B6F",
    wing: "#4ECDC4",
    taken: "#8B8B9E",
    singleBg: "#FF3B6F20",
    wingBg: "#4ECDC420",
    takenBg: "#8B8B9E20",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B0B0C3",
    muted: "#6B6B80",
  },
  border: {
    subtle: "#2A2A3A",
    default: "#3A3A4A",
    active: "#FF3B6F",
  },
  status: {
    online: "#4ADE80",
    away: "#FBBF24",
    offline: "#6B6B80",
  },
} as const;

export const RoleConfig = {
  single: {
    label: "Single",
    color: Colors.role.single,
    bg: Colors.role.singleBg,
    emoji: "💫",
    description: "I'm looking to meet someone tonight",
  },
  wing: {
    label: "Wing",
    color: Colors.role.wing,
    bg: Colors.role.wingBg,
    emoji: "🤝",
    description: "I'm helping my friend find someone",
  },
  taken: {
    label: "Taken",
    color: Colors.role.taken,
    bg: Colors.role.takenBg,
    emoji: "💛",
    description: "Here for the vibes and helping out",
  },
} as const;
