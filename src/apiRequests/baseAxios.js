import axios from "axios";
import { BASE_URL } from "./apiConstants";

export default axios.create({
  baseURL: BASE_URL,
  // headers: {
  //     Authorization: 'Bearer API_Key'
  // }
});
