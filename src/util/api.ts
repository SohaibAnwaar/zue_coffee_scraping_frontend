import axios from "axios";
import { endPoints } from "../constants";

export const getOutlets = async() => {
const data = await axios.get(import.meta.env.VITE_APP_DEV_URL + endPoints.FETCH_OUTLETS);
return data.data?.results;

} 