import { axiosInstance } from "./axiosInstance";

export const BASE_API =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

// issue a book
export const IssueBook = async (payload) => {
    try {
      const response = await axiosInstance.post(`${BASE_API}/api/issues/issue-new-book`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

// get issues
export const GetIssues = async (payload) => {
    try {
      const response = await axiosInstance.post(`${BASE_API}/api/issues/get-issues`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}

// return a book
export const ReturnBook = async (payload) => {
    try {
      const response = await axiosInstance.post(`${BASE_API}/api/issues/return-book`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}

// delete an issue
export const DeleteIssue = async (payload) => {
    try {
      const response = await axiosInstance.post(`${BASE_API}/api/issues/delete-issue`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}

// edit an issue
export const EditIssue = async (payload) => {
    try {
      const response = await axiosInstance.post(`${BASE_API}/api/issues/edit-issue`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}