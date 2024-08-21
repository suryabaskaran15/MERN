import axiosLib, { AxiosInstance } from "axios";
import * as api from "./apiClient"; // Adjust the import path

// Define the types for the API functions
type ApiFunction<T> = T;

const apiFunctions: Record<api.ApiKey, (axios: AxiosInstance) => ApiFunction<unknown>> = api as unknown as Record<
    api.ApiKey,
    (axios: AxiosInstance) => ApiFunction<unknown>
>;

type Client = {
    [key in api.ApiKey]: ReturnType<typeof api[key]>;
};

const axios = axiosLib.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

const client = Object.fromEntries(
    Object.entries(apiFunctions).map(([key, func]) => {
        const apiKey = key as api.ApiKey;
        return [apiKey, typeof func === "function" && func(axios)];
    })
) as Client;

export default client;
