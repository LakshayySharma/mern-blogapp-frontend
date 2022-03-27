import axios from "axios";
import { loadUser } from "./user";
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://mern-blogapp-api.herokuapp.com/api/posts"
    );
    dispatch({
      type: "POSTS_LOADED",
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const addPost = (postData, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://mern-blogapp-api.herokuapp.com/api/posts",
      postData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: "ADD_POST",
      payload: res.data,
    });
    dispatch(loadUser(token));
  } catch (error) {
    console.log(error.response.data);
  }
};

export const loadPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://mern-blogapp-api.herokuapp.com/api/posts/${id}`
    );
    dispatch({
      type: "POST_LOADED",
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `https://mern-blogapp-api.herokuapp.com/api/posts/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: "POST_DELETED",
      payload: id,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const commentPost = (id, comment, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://mern-blogapp-api.herokuapp.com/api/posts/${id}/comment`,
      comment,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: "ADD_COMMENT",
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};
