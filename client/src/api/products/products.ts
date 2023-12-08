import { axios_default } from "../axios-core";

const getProducts=()=>{
  return axios_default.get('/products');
}