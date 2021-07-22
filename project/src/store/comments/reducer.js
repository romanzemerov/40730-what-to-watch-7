import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../const';
import {
  getCommentsError,
  getCommentsRequest,
  getCommentsSuccess,
  postCommentError,
  postCommentRequest,
  postCommentSuccess,
} from './actions';

const initialState = {
  comments: [],
  commentsStatus: LoadingStatus.IDLE,
  postCommentStatus: LoadingStatus.IDLE,
};

export const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCommentsRequest, (state) => {
      state.commentsStatus = LoadingStatus.LOADING;
      state.comments = initialState.comments;
    })
    .addCase(getCommentsSuccess, (state, { payload }) => {
      state.commentsStatus = LoadingStatus.SUCCEEDED;
      state.comments = payload;
    })
    .addCase(getCommentsError, (state) => {
      state.commentsStatus = LoadingStatus.FAILED;
    })

    .addCase(postCommentRequest, (state) => {
      state.postCommentStatus = LoadingStatus.LOADING;
    })
    .addCase(postCommentSuccess, (state, { payload }) => {
      state.postCommentStatus = LoadingStatus.SUCCEEDED;
      state.comments = payload;
    })
    .addCase(postCommentError, (state) => {
      state.postCommentStatus = LoadingStatus.FAILED;
    });
});
