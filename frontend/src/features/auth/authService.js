import axios from "axios";

const API_URL = "/api/users/";

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

//update streak
const updateStreak = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "streak", userData, config);

  localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  updateStreak
};

export default authService;
