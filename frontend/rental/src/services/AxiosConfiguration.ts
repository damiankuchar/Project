import { authStore } from "../stores/auth.store";


const getToken = () => {
  if (!authStore.accessToken) {
    authStore.autoLogin();
  }
  return authStore.accessToken;
};

export const axiosConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
};