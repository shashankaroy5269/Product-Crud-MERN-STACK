import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const deleteProduct = async (id) => {
  return await AxiosInstance.delete(
    `${endPoints.deleteProduct}/${id}`
  );
};