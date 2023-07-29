import {
  COMMENT,
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_CREATOR,
  FETCH_BY_SEARCH,
  FETCH_POST,
  LIKE,
  START_LOADING,
  UPDATE,
} from "../constants/actionTypes.js";

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, posts: action.payload };

    case FETCH_POST:
      return { ...state, post: action.payload };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state?.posts?.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case COMMENT:
      return {
        ...state,
        posts: state?.posts?.map((post) => {
          if (post._id == +action.payload._id) return action.payload;
          return post;
        }),
      };

    case DELETE:
      return {
        ...state,
        posts: state?.posts?.filter((post) => post._id !== action.payload),
      };

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
