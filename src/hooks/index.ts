import { useQuery } from "react-query";
import { endPoints } from "../constants";
import { getOutlets } from "../util/api";

export const useGetOutlets = () => useQuery(endPoints.FETCH_OUTLETS, getOutlets) 