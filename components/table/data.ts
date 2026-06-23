import axios from "axios";

export const users = [
  {
    id: 1,
    ranking: 1,
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    balance: "1000",
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

export function fetchUsers() {
  return axios.get("http://127.0.0.1:8080/ranking/balance?page=1").then((response) => {
    if (response.data.code === 200) {
      return response.data.data.map((player: Player) => ({
        id: player.ranking,
        ranking: player.ranking,
        name: player.playerInfo.name,
        avatar: player.playerInfo.avatar,
        balance: `❀${player.balance.toString()}`,
      }));
    }

    throw new Error("API request failed");
  });
}
