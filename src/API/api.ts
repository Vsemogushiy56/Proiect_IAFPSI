import axios from "axios";

const $api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

$api.interceptors.request.use((config) => {
  config.headers.authorization = `${localStorage.getItem("token")}`;
  return config;
});

export const authApi = {
  async register(data: { email: string; username: string; password: string }) {
    return $api.post(`/user/create`, data);
  },
  async login(data: { email: string; password: string }) {
    return $api.post(`/user/login`, data);
  },
};

export const userApi = {
  async getUser(token: string | null) {
    return $api.get(`/user/me/${token}`);
  },
  async getAll() {
    return $api.get(`/user`);
  },
};
