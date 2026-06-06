import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const restoreProduct = async (id) => {
  return await AxiosInstance.get(
    `${endPoints.restoreProduct}/${id}`
  );
};