import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const LIKES_API = `${BASE_URL}/api`;

const api = axios.create({
  withCredentials: true,
});

export const userTogglesTuitLikes = (uid, tid) =>
  api.put(`${USERS_API}/${uid}/likes/${tid}`).then((response) => response.data);

export const getLikeCount = (tid) =>
  api.get(`${LIKES_API}/likecount/${tid}`).then((response) => response.data);

export const getDislikeCount = (tid) =>
  api.get(`${LIKES_API}/dislikecount/${tid}`).then((response) => response.data);
  

export const createLike = (uid, tid) =>
api
  .post(`${USERS_API}/${uid}/likes/${tid}`)
  .then((response) => response.data);

export const createDislike = (uid, tid) =>
  api
    .post(`${USERS_API}/${uid}/dislikes/${tid}`)
    .then((response) => response.data);

export const findAllTuitsLikedByUser = (userId) =>
  api.get(`${USERS_API}/${userId}/likes`).then((response) => response.data);
