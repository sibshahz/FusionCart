export function setAuthDetails(response){
  localStorage.setItem("header-Key",response.token)
  localStorage.setItem("user-type",response.user.userType);
}

export function getAuthToken(){
  try {
    if (typeof localStorage !== 'undefined') {
      const key = localStorage.getItem('header-Key');
      return key;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
}

export function getUserType() {
  try {
    if (typeof localStorage !== 'undefined') {
      const userType = localStorage.getItem('user-type');
      return userType;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
}

export function resetUserDetails(){
  const response={
    key:undefined,
    user:{
      userType:undefined
    }
  }
  localStorage.removeItem("header-Key")
  localStorage.removeItem("user-type");
}