import { resetUserDetails, setAuthDetails } from "@/src/utils/localstorage/localStorage";
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
const postLogin=async (details:LoginDetails)=>{
  try {
    const {data:response} = await axios_default.post(`/auth/login`,details);
    const userData: userDetails = {
      firstName: response.user.firstName,
      lastName: response.user.lastName,
      email: response.user.email,
      userType: response.user.userType,
      isLoggedIn:true,
    };
    setAuthDetails(response);
    return userData;

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