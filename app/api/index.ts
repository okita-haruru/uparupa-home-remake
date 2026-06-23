export interface PlayerInfo {
    uuid: string;
    name: string;
    avatar: string;
    states: {
        totalFishing: Ranking;
        fishing: FishingRanking[];
        balance: Ranking;
        death: Ranking;
        kills: KillRanking;
    },
    join: number;
    lastSeen: number;
    playTime: number;
    isOnline: boolean;
}

export interface Ranking {
    rank: number;
    value: number;
}

export interface FishingRanking {
    name: string;
    amount: Ranking;
    maxSize: Ranking
}

export interface KillRanking {
    warden: Ranking;
    enderDragon: Ranking;
    wither: Ranking;
    ancientGuardian: Ranking;
    phantom: Ranking;
    piglinBrute: Ranking;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
