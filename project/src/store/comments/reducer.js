import { createReducer } from '@reduxjs/toolkit';
import { loadingStates } from '../../const';
import {
  getCommentsError,
  getCommentsRequest,
  getCommentsSuccess,
} from './actions';

const initialState = {
  comments: [],
  commentsStatus: loadingStates.IDLE,
  postCommentStatus: loadingStates.IDLE,
};
export const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCommentsRequest, (state) => {
      state.commentsStatus = loadingStates.LOADING;
      state.comments = initialState.comments;
    })
    .addCase(getCommentsSuccess, (state, { payload }) => {
      state.commentsStatus = loadingStates.SUCCEEDED;
      state.comments = payload;
    })
    .addCase(getCommentsError, (state) => {
      state.commentsStatus = loadingStates.FAILED;
    })
});
