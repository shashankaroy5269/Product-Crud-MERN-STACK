import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const getSingleProduct = async (id) => {
  return await AxiosInstance.get(
    `${endPoints.getSingleProduct}/${id}`
  );
};