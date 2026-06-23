import axios from "axios";
import { API_URL } from "@/config/apiconfig";

export const kills = [
  {
    id: 1,
    ranking: 1,
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    warden_kills: 0,
    ender_dragon_kills: 0,
    wither_kills: 0,
    ancient_guardian_kills: 0,
    phantom_kills: 0,
    piglin_brute_kills: 0,
    total_kills: 0,
  },
];

interface Player {
  ranking: number;
  player_id: string;
  player_name: string;
  ancient_guardian_kills: number;
  phantom_kills: number;
  piglin_brute_kills: number;
  ender_dragon_kills: number;
  wither_kills: number;
  warden_kills: number;
  total_kills: number;
  avatar: string;
}

export function fetchKills(method = "total", page = 1) {
  return axios.get(`${API_URL}/ranking/kills/${method}?page=${page}`).then((response) => {
    if (response.data.code === 200) {
      return response.data.data.map((player: Player) => ({
        id: player.ranking,
        ranking: player.ranking,
        name: player.player_name,
        avatar: player.avatar,
        warden_kills: player.warden_kills,
        ender_dragon_kills: player.ender_dragon_kills,
        wither_kills: player.wither_kills,
        ancient_guardian_kills: player.ancient_guardian_kills,
        phantom_kills: player.phantom_kills,
        piglin_brute_kills: player.piglin_brute_kills,
        total_kills: player.total_kills,
      }));
    }

    throw new Error("API request failed");
  });
}
