import { createAction } from '@reduxjs/toolkit';

export const changeGenresFilter = createAction('filter/changeGenresFilter', (genre) => ({ payload: genre }));
export const clearGenresFilter = createAction('filter/clearGenresFilter');
