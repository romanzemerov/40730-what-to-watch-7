import { createSelector } from '@reduxjs/toolkit';

export const getComments = createSelector(
  (state) => state.comments.comments,
  (comments) => comments,
);
