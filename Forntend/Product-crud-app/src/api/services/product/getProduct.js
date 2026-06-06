import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const getProducts = async () => {
  return await AxiosInstance.get(
    endPoints.getProducts
  );
};