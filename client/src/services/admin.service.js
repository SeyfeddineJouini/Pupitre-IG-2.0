import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}/api/test/`;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getAdminBoard,
};