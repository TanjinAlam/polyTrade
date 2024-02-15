import axios from "./axios"

export const register = async (data: any) => {
    return await axios.post('/auth/registration', data)
}

export const login = async (data: any) => {
    return await axios.post('/auth/login', data)
}