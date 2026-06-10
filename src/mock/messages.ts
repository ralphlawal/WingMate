import { Match, Message } from "../types";

export const MOCK_MATCHES: Match[] = [
  {
    id: "match-1",
    userId: "me",
    matchedUserId: "user-1",
    createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    unreadCount: 2,
    lastMessage: {
      id: "msg-3",
      matchId: "match-1",
      senderId: "user-1",
      text: "Okay that was actually hilarious 😂 you're terrible at pool",
      sentAt: new Date(Date.now() - 8 * 60000).toISOString(),
      read: false,
    },
    wingVouch: undefined,
  },
  {
    id: "match-2",
    userId: "me",
    matchedUserId: "user-3",
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    unreadCount: 0,
    lastMessage: {
      id: "msg-6",
      matchId: "match-2",
      senderId: "me",
      text: "Yeah The Grotto has the best old fashioneds in the area",
      sentAt: new Date(Date.now() - 25 * 60000).toISOString(),
      read: true,
    },
    wingVouch: {
      wingId: "user-2",
      wingName: "Marcus",
      message: "Priya is genuinely one of the coolest people I know. Also she'll roast you mercilessly if you're boring.",
    },
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "match-1": [
    {
      id: "msg-1",
      matchId: "match-1",
      senderId: "me",
      text: "Hey! I saw you across the bar — love your energy. Down for a game of pool?",
      sentAt: new Date(Date.now() - 90 * 60000).toISOString(),
      read: true,
    },
    {
      id: "msg-2",
      matchId: "match-1",
      senderId: "user-1",
      text: "Haha I'm literally awful at pool but yes. Challenge accepted.",
      sentAt: new Date(Date.now() - 85 * 60000).toISOString(),
      read: true,
    },
    {
      id: "msg-3",
      matchId: "match-1",
      senderId: "user-1",
      text: "Okay that was actually hilarious 😂 you're terrible at pool",
      sentAt: new Date(Date.now() - 8 * 60000).toISOString(),
      read: false,
    },
  ],
  "match-2": [
    {
      id: "msg-4",
      matchId: "match-2",
      senderId: "user-2",
      text: "Hey — I'm Marcus, Priya's wing. She's too cool to signal herself but she thinks you're cute. You in?",
      sentAt: new Date(Date.now() - 50 * 60000).toISOString(),
      read: true,
    },
    {
      id: "msg-5",
      matchId: "match-2",
      senderId: "me",
      text: "Ha, love the confidence. Tell her to come say hi!",
      sentAt: new Date(Date.now() - 45 * 60000).toISOString(),
      read: true,
    },
    {
      id: "msg-6",
      matchId: "match-2",
      senderId: "me",
      text: "Yeah The Grotto has the best old fashioneds in the area",
      sentAt: new Date(Date.now() - 25 * 60000).toISOString(),
      read: true,
    },
  ],
};
