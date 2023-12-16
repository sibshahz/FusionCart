import { resetUserDetails, setAuthDetails } from "@/src/utils/localstorage/localStorage";
import { axios_default } from "../axios-core";
import {Tag} from '../../../../common/tags/tags.types'


const postTag=async (tag:Tag)=>{
  try {
    const {data:response} = await axios_default.post(`/tags`,tag);
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
const getTagsList=async ()=>{
  try {
    const response = await axios_default.get(`/tags`);
    // handle success
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}

export{
  postTag,
  getTagsList
}