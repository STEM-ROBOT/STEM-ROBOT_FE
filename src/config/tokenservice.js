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
  if (user) {
      user.accessToken = token;
      localStorage.setItem("user", JSON.stringify(user));
  }
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
  console.log(JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
};

const setUserName = (username) => {
  console.log(JSON.stringify(username));
  localStorage.setItem("username", JSON.stringify(username));
};

const setFormatId = (formatId) => {
  console.log(JSON.stringify(formatId));
  localStorage.setItem("formatId", JSON.stringify(formatId));
};

const removeUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("image");
  localStorage.removeItem("school");
  localStorage.removeItem("formatId");
};

const setUserId = (userId) => {
  localStorage.setItem("userId", JSON.stringify(userId));
};

const setUserRole = (role) => {
  localStorage.setItem("role", JSON.stringify(role));
};

const setUserImage = (image) => {
  localStorage.setItem("image", JSON.stringify(image));
};

const setSchoolName = (school) => {
  localStorage.setItem("school", JSON.stringify(school));
};

const getUserId = () => {
  return JSON.parse(localStorage.getItem("userId"));
};

const getUserName = () => {
  return JSON.parse(localStorage.getItem("username"));
};

const getUserRole = () => {
  return JSON.parse(localStorage.getItem("role"));
};

const getUserImage = () => {
  return JSON.parse(localStorage.getItem("image"));
};

const getSchoolName = () => {
  return JSON.parse(localStorage.getItem("school"));
};

const getFormatId = () => {
  const formatId = localStorage.getItem("formatId");

  if (!formatId || formatId === "undefined") {
      return null; 
  }
  return JSON.parse(formatId);
};
const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
  setUserId,
  getUserRole,
  setUserRole,
  getUserId,
  getUserName,
  setUserName,
  getUserImage,
  setUserImage,
  getSchoolName,
  setSchoolName,
  setFormatId,
  getFormatId,
};

export default TokenService;
