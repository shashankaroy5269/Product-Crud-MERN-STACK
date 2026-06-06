import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const createProduct = async (data) => {
  return await AxiosInstance.post(
    endPoints.createProduct,
    data
  );
};