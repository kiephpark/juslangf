import axios from "axios";

export default axios.create({
  // baseURL: "http://api.localhost:8000/",
  baseURL: "http://api.juslang.ml:8000/",
  // baseURL: "https://api.sdi2nd.ml/",
  headers: {
    "Content-type": "application/json",
  }
});