import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth/`;

const register = (nom, prenom, email, password) => {
  return axios.post(API_URL + "signup", {
    nom,
    prenom,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("admin");
};

export default {
  register,
  login,
  logout,
};