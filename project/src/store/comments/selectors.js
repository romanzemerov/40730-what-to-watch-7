import { createSelector } from '@reduxjs/toolkit';

export const getComments = createSelector(
  (state) => state.comments.comments,
  (comments) => comments,
);

export const getPostCommentStatus = createSelector(
  (state) => state.comments.postCommentStatus,
  (postCommentStatus) => postCommentStatus,
);
