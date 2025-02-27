import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7221/api/",
  timeout: 5000,
  headers: {},
});
