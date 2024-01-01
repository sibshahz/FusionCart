import { Image } from "@/images/images.types";
import { axios_default } from "../axios-core";

const postImages = async (images) => {
  try {
    const {data:response} = await axios_default.post(`/images`,images);
    const tagData: Tag = {
      tagID:response._id,
      tagName:response.tagName,
      tagSlug:response.tagSlug,
      tagDescription:response.tagDescription ? response.tagDescription : ''
    };
    return tagData;

  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}

const updateImage=async (image:Image) => {
  try{  
    const response = await axios_default.put(`/images/${image._id}`,image);
    // handle success
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}

const getImagesList=async ()=>{
  try {
    const response = await axios_default.get(`/images`);
    // handle success
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}
const deleteImage=async (id)=>{
  try {
    const response = await axios_default.delete(`/images/${id}`);
    // handle success
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}

export{
  getImagesList,
  postImages,
  deleteImage,
  updateImage
}