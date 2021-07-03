import {
  getCommentsError,
  getCommentsRequest,
  getCommentsSuccess,
  postCommentError,
  postCommentRequest,
  postCommentSuccess
} from './actions';
import { APIRoute } from '../../const';
import { transformCommentData } from '../../services/api';

export const fetchComments = (id) => (dispatch, _, api) => {
  dispatch(getCommentsRequest());
  api
    .get(`${APIRoute.COMMENTS}/${id}`)
    .then(({ data }) => {
      dispatch(getCommentsSuccess(data.map(transformCommentData)));
    })
    .catch(() => dispatch(getCommentsError()));
};

export const postComments = (id, body) => (dispatch, _, api) => {
  dispatch(postCommentRequest());
  api
    .post(`${APIRoute.COMMENTS}/${id}`, body)
    .then(({ data }) => {
      dispatch(postCommentSuccess(data.map(transformCommentData)));
    })
    .catch(() => dispatch(postCommentError()));
};
