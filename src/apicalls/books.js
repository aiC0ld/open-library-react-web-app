import { axiosInstance } from "./axiosInstance";

export const BASE_API =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

// add book
export const AddBook = async (payload) => {
  try {
    const response = await axiosInstance.post(`${BASE_API}/api/books/add-book`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all books
export const GetAllBooks = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_API}/api/books/get-all-books`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update book
export const UpdateBook = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `${BASE_API}/api/books/update-book/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete book
export const DeleteBook = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_API}/api/books/delete-book/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get book by id
export const GetBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_API}/api/books/get-book-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search external books
export const SearchExternalBooks = async (title) => {
  try {
    const response = await axiosInstance.get(`${BASE_API}/api/external-books/search`, {
      params: { query: title }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};




