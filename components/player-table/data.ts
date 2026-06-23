import {API_URL} from "@/config/apiconfig";

export const columns = [
   {name: 'No.', uid: 'num'},
   {name: '玩家', uid: 'name'},

];
export const kills = [
   {
       id: 1,
       ranking: 1,
       name: 'Tony Reichert',
       avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
   },
];
import axios from 'axios';

interface Player {
    ranking: number,
    player_id: string,
    player_name: string,
    ancient_guardian_kills: number,
    phantom_kills: number,
    piglin_kills: number,
    ender_dragon_kills: number,
    wither_kills: number,
    warden_kills: number,
    total_kills: number,
    avatar: string
}

export function fetchKills(method: string = "total",page: number = 1) {
    return axios.get(API_URL+'/ranking/kills/'+method+'?page='+page)
        .then(response => {
            if (response.data.code === 200) {
                return response.data.data.map((player: Player) => ({
                    id: player.ranking,
                    ranking: player.ranking,
                    name: player.player_name,
                    avatar: player.avatar,
                    warden_kills: player.warden_kills,
                    ender_dragon_kills: player.ender_dragon_kills,
                    wither_kills:  player.wither_kills,
                    ancient_guardian_kills: player.ancient_guardian_kills,
                    phantom_kills: player.phantom_kills,
                    piglin_kills: player.piglin_kills,
                    total_kills: player.total_kills,
                }));
            } else {
                throw new Error('API request failed');
            }
        });
}