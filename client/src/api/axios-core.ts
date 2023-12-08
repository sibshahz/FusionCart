const axios = require('axios').default;

console.log("ENV: ", process.env.NEXT_PUBLIC_BASE_URL)
export const axios_default = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {'X-Custom-Header': 'foobar'}
});