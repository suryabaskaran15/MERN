import { toast } from "@/hooks/use-toast";
import axios from "axios";


const CLIENT = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL, withCredentials: true });

// Add an interceptor to include the auth token
CLIENT.interceptors.request.use(
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
CLIENT.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Assuming you have a function to navigate to the login page
            // window.location.href = '/login';
        }
        toast({
            variant: "destructive",
            description: `${error?.response.data.message ?? error?.message}`,
        })
        return Promise.reject(error);
    }
);

export default CLIENT;

