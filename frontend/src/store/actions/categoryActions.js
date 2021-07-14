import axios from "axios";
const api = "http://localhost:5000/api/categories/";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createCategory = (cat) => async (dispatch) => {
  try {
    const { data } = await axios.post(api, cat, config);
    if (!data.error) dispatch({ type: "updateCategoryList", data });
    return data;
  } catch (error) {
    return { error: "Failed to Create Category" };
  }
};

export const updateCategory = (cat, id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${api}${id}`, cat, config);
    if (!data.error) dispatch({ type: "updateCategoryList", data });
    return data;
  } catch (error) {
    return { error: "Failed to Update Category" };
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${api}${id}`, config);
    if (!data.error) dispatch({ type: "updateCategoryList", data });
    return data;
  } catch (error) {
    return { error: "Failed to Delete Category" };
  }
};

export const getAllCategories = () => async (dispatch) => {
  try {
    const { data } = await axios.get(api, config);
    if (!data.error) dispatch({ type: "updateCategoryList", data });
    return data;
  } catch (error) {
    return { error: "Failed to Fetch Categories" };
  }
};
