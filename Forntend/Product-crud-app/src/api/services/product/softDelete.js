import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const softDeleteProduct = async (id) => {
  return await AxiosInstance.get(
    `${endPoints.softDeleteProduct}/${id}`,
    
  );
};