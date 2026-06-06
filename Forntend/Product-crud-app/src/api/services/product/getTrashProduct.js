import AxiosInstance from "../../axios/axios";
import endPoints from "../../endPoints/endPoints";

export const getTrashProduct = async (data) => {
  return await AxiosInstance.get(
    endPoints.trashProduct

  );
};