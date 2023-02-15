import axios from "axios";
import { QueryClient } from "react-query";

// Create a client
export const queryClient = new QueryClient()

const BASE_URL = process.env.REACT_APP_BASE_URL || "/v1";


export const signIn = data => {
    return axios.post(`${BASE_URL}/user/signin`, data);
}

export const fetchPublicProfile = async ({ queryKey }) => {
    const data = await axios.get(`${BASE_URL}/user/public/profile/${queryKey[1]}`);
    return data?.data?.data;
}

export const fetchMyProfile = async ({ queryKey }) => {
    const data = await axios.get(`${BASE_URL}/user/profile`, { headers: { "Authorization": `Bearer ${queryKey[1]}` } });
    return data?.data?.data;
}

