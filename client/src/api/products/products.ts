import { axios_default } from "../axios-core";

const getProducts=async ()=>{
  try {
    const response = await axios_default.get(`/products`);
    // handle success
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}
const getProduct=async (id:string)=>{
  try {
    const response = await axios_default.get(`/products/${id}`);
    // handle success
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}

export{
  getProducts,
  getProduct,
}