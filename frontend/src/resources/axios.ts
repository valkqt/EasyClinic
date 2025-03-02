import axios from "axios";

// defaults to remote API, change "baseURL" to the localhost URL in case the application is running locally, for example "http://localhost:7221"

export const api = axios.create({
  baseURL: "http://andreabuzzanca-001-site4.jtempurl.com/api/",
  timeout: 5000,
  headers: {},
});
