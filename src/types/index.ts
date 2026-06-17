export type UserRole = "single" | "wing";

export type Gender = "man" | "woman" | "non-binary" | "prefer-not-to-say";

export type User = {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  role: UserRole;
  gender: Gender;
  interestedIn: Gender[];
  venueId?: string;
  checkedInAt?: string;
  isOnline: boolean;
  wingFor?: string;
};

export type Venue = {
  id: string;
  name: string;
  type: "bar" | "club" | "restaurant" | "cafe" | "event";
  address: string;
  latitude: number;
  longitude: number;
  activeCount: number;
  singlesCount: number;
  wingsCount: number;
  thumbnail: string;
  vibe: string[];
};

export type Match = {
  id: string;
  userId: string;
  matchedUserId: string;
  createdAt: string;
  lastMessage?: Message;
  unreadCount: number;
  wingVouch?: WingVouch;
};

export type Message = {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  sentAt: string;
  read: boolean;
};

export type WingVouch = {
  wingId: string;
  wingName: string;
  message: string;
};

export type SignalRequest = {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: "interest" | "wing_request";
  status: "pending" | "accepted" | "declined";
  createdAt: string;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type OnboardingStackParamList = {
  Splash: undefined;
  Phone: undefined;
  OTP: { phone: string };
  Name: undefined;
  Role: undefined;
  Photo: { role: UserRole };
  Bio: { role: UserRole };
};

export type MainTabParamList = {
  Home: undefined;
  Matches: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMap: undefined;
  VenueDetail: { venueId: string };
  UserProfile: { userId: string };
  Signal: { userId: string };
  WingRequest: { wingId: string; targetUserId: string };
  MatchConfirmation: { matchId: string };
  MyQR: undefined;
  ScanQR: undefined;
};

export type ChatStackParamList = {
  MatchesList: undefined;
  ChatThread: { matchId: string; userName: string };
};

export type ProfileStackParamList = {
  MyProfile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  BlockReport: { userId: string };
};
