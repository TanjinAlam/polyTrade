import axios from "./axios";

export const subscribeMagazine = async (id: number) => {
    return axios.post(`/users/subscriptions`, {magazineId: +id});
}

export const getSubscriptions = async () => {
    return axios.get(`/users/subscriptions`);
}

export const cancelSubscription = async (id: number) => {
    return axios.post(`/users/cancel-subscriptions`, {magazineId: +id});
}