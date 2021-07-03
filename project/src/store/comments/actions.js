import { createAction } from '@reduxjs/toolkit';

export const getCommentsRequest = createAction('comments/fetchCommentsRequest');
export const getCommentsSuccess = createAction('comments/fetchCommentsSuccess', (comments) => ({
  payload: comments,
}));
export const getCommentsError = createAction('comments/fetchCommentsError');

export const postCommentRequest = createAction('comments/postCommentRequest', (comment) => ({
  payload: comment,
}));
export const postCommentSuccess = createAction('comments/postCommentSuccess', (comments) => ({
  payload: comments,
}));
export const postCommentError = createAction('comments/postCommentError');
