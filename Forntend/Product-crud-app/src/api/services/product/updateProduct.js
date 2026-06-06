import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const updateProduct = async (id, data) => {
  return await AxiosInstance.put(
    `${endPoints.updateProduct}/${id}`,
    data
  );
};