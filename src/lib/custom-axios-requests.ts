import axios from "axios";

const customAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default customAxios;
