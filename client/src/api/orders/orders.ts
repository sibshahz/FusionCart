import { axios_default } from "../axios-core";



const getOrders=async (customerID:String)=>{
  try {
    const response = await axios_default.get(`/orders/${customerID}`);

    // handle success
    return response; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    console.error(error);
  }
}


export{
  getOrders,
}