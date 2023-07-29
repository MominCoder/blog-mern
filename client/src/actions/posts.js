import * as api from "../api";
import { COMMENT, CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_CREATOR, FETCH_BY_SEARCH, FETCH_POST, LIKE, START_LOADING, UPDATE } from "../constants/actionTypes.js";

// action creators

export const getPost = (id) => async (dispatch) => {
  try {

    dispatch({type: START_LOADING});
    const data = await api.fetchPost(id);
    
    dispatch({
      type: FETCH_POST,
      payload: data,
    });

    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const data = await api.fetchPosts(page);
    
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });

    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const data = await api.fetchPostsBySearch(searchQuery);
    
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data,
    });

    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const data = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const data = await api.createPost(post);
    
    navigate(`/posts/${data._id}`);
    
    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, navigate, post) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const data = await api.updatePost(id, post);

    navigate(`/posts/${data._id}`);
    
    dispatch({
      type: UPDATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    api.deletePost(id);
    
    dispatch({
      type: DELETE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  
  try {
    const data = await api.likePost(id);
    
    dispatch({
      type: LIKE,
      payload: data,
    });
  } catch (error) {
    console.log(error)
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const data = await api.commentPost(value, id);
    
    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

