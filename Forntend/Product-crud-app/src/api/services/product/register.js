import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const registerUser = async (data) => {
  return await AxiosInstance.post(
    endPoints.register,
    data
  );
};