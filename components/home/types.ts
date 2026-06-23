export interface HomePlayer {
  ping: number;
  name: string;
  uuid: string;
  avatar: string;
}

export interface HomeWorldData {
  players: HomePlayer[];
  count: number;
}

export interface HomePlayerListData {
  lobby: HomeWorldData;
  survival: HomeWorldData;
}

export type HomeWorldType = keyof HomePlayerListData;
