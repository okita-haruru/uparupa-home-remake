import axios from "axios";
import { API_URL } from "@/config/apiconfig";

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    balance: 1000,
  },
];

interface PlayerInfo {
  uuid: string;
  name: string;
  avatar: string;
}

interface Player {
  ranking: number;
  playerInfo: PlayerInfo;
  balance: number;
}

export function fetchUsers(page = 1) {
  return axios.get(`${API_URL}/ranking/balance?page=${page}`).then((response) => {
    if (response.data.code === 200) {
      return response.data.data.map((player: Player) => ({
        id: player.ranking,
        ranking: player.ranking,
        name: player.playerInfo.name,
        avatar: player.playerInfo.avatar,
        balance: player.balance,
      }));
    }

    throw new Error("API request failed");
  });
}
