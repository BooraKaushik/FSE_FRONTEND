import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000";

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

export const createUser = (user) =>
  axios.post(`${USERS_API}`, user).then((response) => response.data);

export const findAllUsers = async () => {
  const data = await axios.get(USERS_API).then((response) => response.data);
  return data;
};

export const findUserById = (uid) =>
  axios.get(`${USERS_API}/${uid}`).then((response) => response.data);

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`).then((response) => response.data);

export const deleteUsersByUsername = (username) =>
  axios
    .get(`${USERS_API}/username/${username}/delete`)
    .then((response) => response.data);

export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials).then((response) => response.data);

const service = {
  findAllUsers,
};

export default service;
