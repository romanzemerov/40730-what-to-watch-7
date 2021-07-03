import {
  getCommentsError,
  getCommentsRequest,
  getCommentsSuccess,
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
