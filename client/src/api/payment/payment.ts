import { axios_default } from "../axios-core";


const postOrder = async (order) => {
  try {
    const {data:response} = await axios_default.post(`/create-payment`,order);
    return response;

  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}


export{
  postOrder,
}