import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        posts: payload,
        loading: true,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    default:
      return state;
  }
}
