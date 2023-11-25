import axios from "axios";

const getToken = () => {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return null;
  }
  return storedToken;
};

const token = getToken();
let headers;
if (token) {
  headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Preload",
    common: {
      Authorization: `Bearer ${token}`,
    },
  };
} else {
  headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Preload",
  };
}

const api = axios.create({
  baseURL: "http://localhost:5000/api", // replace with your API base URL
  headers, // headers
});

export default api;
