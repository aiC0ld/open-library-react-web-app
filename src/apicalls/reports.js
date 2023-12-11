import { axiosInstance } from "./axiosInstance";

export const BASE_API =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

export const GetReports = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_API}/api/reports/get-reports`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
