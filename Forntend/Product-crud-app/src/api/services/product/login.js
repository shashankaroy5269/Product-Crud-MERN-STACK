import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const loginUser = async (data) => {
  return await AxiosInstance.post(
    endPoints.login,
    data
  );
};