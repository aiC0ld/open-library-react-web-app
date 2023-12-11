import { axiosInstance } from "./axiosInstance";

export const BASE_API =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

// register a user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(`${BASE_API}/api/users/register`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// login a user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(`${BASE_API}/api/users/login`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get user details

export const GetLoggedInUserDetails = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_API}/api/users/get-logged-in-user`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get all users
export const GetAllUsers = async (role) => {
  try {
    const response = await axiosInstance.get(`${BASE_API}/api/users/get-all-users/${role}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// get user by id

export const GetUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_API}/api/users/get-user-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// update user profile
export const UpdateUser = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `${BASE_API}/api/users/update-user/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};