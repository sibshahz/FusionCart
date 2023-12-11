import { resetUserDetails, setAuthDetails } from "@/src/utils/localstorage/localStorage";
import { axios_default } from "../axios-core";
type LoginDetails={
  email:string,
  password:string
}
const postLogin=async (details:LoginDetails)=>{
  try {
    const {data:response} = await axios_default.post(`/auth/login`,details);
    // handle success
    setAuthDetails(response);
    // return response; // Assuming you want to return the data property of the response
  } catch (error) {
    // handle error
    resetUserDetails();
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
}

export{
  postLogin
}