// useChartData.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { API_REQUEST_TIMEOUT_MS, API_URL } from "@/config/apiconfig";

export const useChartData = () => {
    const [data, setData] = useState<{ login_time: string; count: number }[]>([]);

    const fetchData = () => {
        axios.get(API_URL+'/login_count', { timeout: API_REQUEST_TIMEOUT_MS })
            .then(response => {
                if (response.data.code === 200) {
                    setData(response.data.data);
                } else {
                    console.error('API request failed');
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, refetch: fetchData };
};
