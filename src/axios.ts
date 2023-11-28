import axios, { AxiosInstance } from "axios";
import { API_URL } from "./config";

const axiosService: AxiosInstance = axios.create({
    baseURL: API_URL
});

export async function fetcher(url: string): Promise<any> {
    const res = await axiosService.get(url);
    return res.data;
}

export default axiosService;