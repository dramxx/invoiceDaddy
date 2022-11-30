import axios from "axios";

export const saveJwt = (token) => {
  localStorage.setItem("moustache", token);
};

export const getJwt = () => {
  return localStorage.getItem("moustache");
};

export const removeJwt = () => {
  localStorage.removeItem("moustache");
};

export const isLoggedIn = () => {
  return !!getJwt();
};

export const httpGetData = (url) => {
  const token = getJwt();
  const header = {
    "auth-token": token,
    "content-type": "application/json",
    Accept: "application/json",
  };

  return axios.get(url, { headers: header });
};

export const httpPostData = (url, data) => {
  const token = getJwt();
  const header = {
    "auth-token": token,
    "content-type": "application/json",
    Accept: "application/json",
  };

  return axios.post(url, data, { headers: header });
};
