import { AuthEnum } from "@/enums/authEnums";
import { toast } from "@/utils/toastUtils";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const $axios = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY) || ''
    },
});
  
$axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        toast({
            type: 'error',
            message: error.response?.data.message || 'An error occurred',
        });
        return error.response
    },
);
  
export default $axios;
  