const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  };
  
  const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  };

  
  const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const setUser = (user) => {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  const removeUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };

  const setUserId = (userId)=>{
    localStorage.setItem("userId", JSON.stringify(userId));
  }

  const setUserRole = (role)=>{
    localStorage.setItem("role", JSON.stringify(role));
  }

  const getUserId = () => {
    return JSON.parse(localStorage.getItem("userId"));
  };
  const getUserRole = () => {
    return JSON.parse(localStorage.getItem("role"));
  };

  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
    setUserId,
    setUserRole,
    getUserId,
  };
  
  export default TokenService;