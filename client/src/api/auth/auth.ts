import { resetUserDetails, setAuthDetails } from "@/src/utils/localstorage/localStorage";
import { axios_default } from "../axios-core";

type LoginDetails={
  email:string,
  password:string
}

type userDetails={
  _id?:string,
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
      _id:response.user._id,
      firstName: response.user.firstName,
      lastName: response.user.lastName,
      email: response.user.email,
      userType: response.user.userType,
      isLoggedIn:true,
    };
    setAuthDetails(response);
    return userData;

  } catch (error) {
    resetUserDetails();
    console.error(error);
    throw error; 
  }
}

export{
  postLogin
}