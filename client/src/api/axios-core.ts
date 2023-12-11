import { getAuthToken,getUserType } from "../utils/localstorage/localStorage";

const axios = require('axios').default;

export const axios_default = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'X-Header-Key': getAuthToken(),
    'X-User-Type': getUserType(),
  }
});