import { Product } from "@/product/product.types";
import { axios_default } from "../axios-core";

const getProductsList=async ()=>{
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
const getProduct=async (id:String)=>{
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

const postProduct = async (product:Product) => {
  try {
    const {data:response} = await axios_default.post(`/products`,product);
    console.table("PRODUCT POSTED: ", response);
    const productData: Product =await {
      _id:response._id,
      name:response.name,
      description:response.description ? response.description : '',
      price:response.price,
      salePrice:response.salePirce,
      status:response.status,
      attributes:response.attributes,
      category:response.category,
      crossSells:response.crossSells,
      featured:response.featured,
      featuredImages:response.featuredImages,
      images:response.images,
      stock:response.stock,
      tagline:response.tagline,
      tags:response.tags,
      upsells:response.crossSells
    };

    return productData;

  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}

const deleteProduct = async (id:String) => {
 try{
  const response = await axios_default.delete(`/products/${id}`);
  return response.data;
 }catch(error){
  console.error(error);
  throw error;
 }
}

const updateProduct=async (product:Product)=>{
  try {
    const response = await axios_default.put(`/products/${product._id}`,product);
    // handle success
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}

export{
  getProductsList,
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct
}