import axios from "./axios";



export const getMagazines = async ({
    limit = 10,
}) => {
    return axios.get(`magazine/user?limit=${limit}`);
};


export const getMagazine = async (id: string) => {
    return axios.get(`magazine/user/${id}`);
};
