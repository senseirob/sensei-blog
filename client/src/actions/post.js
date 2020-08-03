import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  POST_ERROR,
  CREATE_POST,
  DELETE_POST,
} from './types';
import { post } from 'request';

export const getPosts = () => async (dispatch) => {
  try {
    console.log('getPosts is running');

    const res = await axios.get('/api/posts');

    console.log('getPosts http request');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });

    console.log('getPosts action dispatched');
  } catch (err) {
    console.log('getPosts catch ran with an error');

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const getPostById = (postId) => async (dispatch) => {
  console.log('Get post by id (action) is running');

  try {
    console.log('This is running');
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// Create a new post

export const createPost = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    dispatch(getPosts());

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Update a new post

export const updatePost = (formData, history, postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/api/posts/${postId}`, formData, config);

    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });

    dispatch(getPosts());

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response;

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const deletePost = (history, postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.delete(`/api/posts/${postId}`, config);

    console.log(res);

    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });

    dispatch(getPosts());

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response;

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
