const axios = require('axios').default;

export const axios_default = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});