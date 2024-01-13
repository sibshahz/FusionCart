import { axios_default } from "../axios-core";

type LoginDetails={
  email:string,
  password:string
}

type userDetails={
  firstName?:string,
  lastName?:string,
  email?:string,
  userType?:string,
  isLoggedIn:boolean,
}

const postCart=async (details:LoginDetails)=>{
  try {
    const {data:response} = await axios_default.post(`/cart/`,details);
    
    return response;

  } catch (error) {
    console.error(error);
    throw error; 
  }
}

const getCartItem=async()=>{
 try {
  // const {data:response} = await axios_default.post(`/cart/`,details);
  // const userData: userDetails = {
  //   firstName: response.user.firstName,
  //   lastName: response.user.lastName,
  //   email: response.user.email,
  //   userType: response.user.userType,
  //   isLoggedIn:true,
  // };
  // return userData;
  
 } catch (error) {
  console.error(error);
  throw error;
 } 
}

const getAllCartItems=async(query)=>{
  const id=query.queryKey[1];
  try {
    const {data:response} = await axios_default.get(`/cart/${id}`);
    return response;
  } catch (error) {
   console.error(error);
   throw error;
  } 
 }

 const updateCartItem=async(cart)=>{
  try {
    const response = await axios_default.put(`/cart/${cart._id}`,{quantity:cart.quantity});
    // handle success
    return response.data; // Assuming you want to return the data property of the response

  } catch (error) {
   console.error(error);
   throw error;
  } 
 }

 const deleteCartItem=async(id:string)=>{
  try {
    const response = await axios_default.delete(`/cart/${id}`);
    return response.data;
  } catch (error) {
   console.error(error);
   throw error;
  } 
 }

export{
  postCart,
  getCartItem,
  getAllCartItems,
  updateCartItem,
  deleteCartItem
}