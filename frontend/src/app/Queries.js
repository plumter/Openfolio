import axios from "axios";
import { QueryClient } from "react-query";

// Create a client
export const queryClient = new QueryClient()

const BASE_URL = process.env.REACT_APP_BASE_URL || "/v1";


export const signIn = data => {
    return axios.post(`${BASE_URL}/user/signin`, data)
}