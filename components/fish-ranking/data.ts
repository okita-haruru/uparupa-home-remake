import axios from "axios";
import { API_URL } from "@/config/apiconfig";

export const data_for_size = [
  {
    id: 1,
    ranking: 1,
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    size: 0,
  },
];

export const data_for_amount = [
  {
    id: 1,
    ranking: 1,
    name: "Tony Reichert",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    amount: 0,
  },
];

interface RecordForAmount {
  ranking: number;
  player_id: string;
  player_name: string;
  avatar: string;
  amount: number;
}

interface RecordForSize {
  ranking: number;
  player_id: string;
  player_name: string;
  avatar: string;
  size: number;
}

export function fetchSize(fish: string, page = 1) {
  return axios
    .get(`${API_URL}/ranking/fish/size?fish=${fish}&page=${page}`)
    .then((response) => {
      if (response.data.code === 200 && response.data.data !== null) {
        return response.data.data.map((data: RecordForSize) => ({
          id: data.ranking,
          ranking: data.ranking,
          name: data.player_name,
          avatar: data.avatar,
          size: data.size,
        }));
      }

      if (response.data.data == null) {
        return [];
      }

      throw new Error("API request failed");
    });
}

export function fetchAmount(fish: string, page = 1) {
  return axios
    .get(`${API_URL}/ranking/fish/amount?fish=${fish}&page=${page}`)
    .then((response) => {
      if (response.data.code === 200 && response.data.data !== null) {
        return response.data.data.map((data: RecordForAmount) => ({
          id: data.ranking,
          ranking: data.ranking,
          name: data.player_name,
          avatar: data.avatar,
          amount: data.amount,
        }));
      }

      if (response.data.data == null) {
        return [];
      }

      throw new Error("API request failed");
    });
}

export function fetchTotalAmount(page = 1) {
  return axios.get(`${API_URL}/ranking/fish/total_amount?page=${page}`).then((response) => {
    if (response.data.code === 200) {
      return response.data.data.map((data: RecordForAmount) => ({
        id: data.ranking,
        ranking: data.ranking,
        name: data.player_name,
        avatar: data.avatar,
        amount: data.amount,
      }));
    }

    throw new Error("API request failed");
  });
}

export function fetchFishes() {
  return axios.get(`${API_URL}/fish`).then((response) => {
    if (response.data.code !== 200) {
      throw new Error("API request failed");
    }

    const map = new Map<string, string>();

    response.data.data.forEach((item: { key: string; name: string }) => {
      map.set(item.key, item.name);
    });

    return map;
  });
}
