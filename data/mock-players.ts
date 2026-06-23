import { PlayerInfo } from "@/app/api";

export const mockPlayers: Record<string, PlayerInfo> = {
  admin: {
    uuid: "00000000-0000-0000-0000-000000000001",
    name: "admin",
    avatar: "https://mc-heads.net/avatar/admin",
    states: {
      totalFishing: {
        rank: 1,
        value: 512,
      },
      fishing: [],
      balance: {
        rank: 1,
        value: 4096,
      },
      death: {
        rank: 3,
        value: 12,
      },
      kills: {
        warden: {
          rank: 2,
          value: 4,
        },
        enderDragon: {
          rank: 1,
          value: 8,
        },
        wither: {
          rank: 2,
          value: 6,
        },
        ancientGuardian: {
          rank: 5,
          value: 11,
        },
        phantom: {
          rank: 9,
          value: 28,
        },
        piglinBrute: {
          rank: 4,
          value: 14,
        },
      },
    },
    join: 1704067200,
    lastSeen: 1717200000,
    playTime: 864000,
    isOnline: true,
  },
};

export const getMockPlayer = (username: string | null | undefined) => {
  if (!username) {
    return null;
  }

  return mockPlayers[username.trim().toLowerCase()] ?? null;
};
