import axios from "axios";

const baseURL = "http://localhost:4000";

const storedToken = localStorage.getItem("token");

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verify = async (endpoint) => {
  try {
    if (storedToken) {
      const response = await api.get(endpoint, {
        headers: {
          Authorization: storedToken,
        },
      });
      return response;
    } else return false;
  } catch (error) {
    throw error.response.data;
  }
};
