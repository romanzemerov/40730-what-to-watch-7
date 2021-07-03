import { createAction } from '@reduxjs/toolkit';

export const getCommentsRequest = createAction('comments/fetchCommentsRequest');
export const getCommentsSuccess = createAction('comments/fetchCommentsSuccess', (comments) => ({
  payload: comments,
}));
export const getCommentsError = createAction('comments/fetchCommentsError');
