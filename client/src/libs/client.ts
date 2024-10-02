import axiosLib, { type AxiosInstance } from "axios";
import * as api from "./apiClient"; // Adjust the import path
import { toast } from "@/hooks/use-toast";

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

// Add an interceptor to include the auth token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle status codes
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Assuming you have a function to navigate to the login page
            window.location.href = '/login';
        }
        toast({
            variant: "destructive",
            description: `${error?.response.data.message ?? error?.message}`,
        })
        return Promise.reject(error);
    }
);

const client = Object.fromEntries(
    Object.entries(apiFunctions).map(([key, func]) => {
        const apiKey = key as api.ApiKey;
        return [apiKey, typeof func === "function" && func(axios)];
    })
) as Client;

export default client;
