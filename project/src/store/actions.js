export const ActionType = {
  CHANGE_GENRES_FILTER: 'filter/changeGenresFilter',
  CLEAR_GENRES_FILTER: 'filter/clearGenresFilter',
};

export const changeGenresFilter = (genre) => ({
  type: ActionType.CHANGE_GENRES_FILTER,
  payload: genre,
});

export const clearGenresFilter = () => ({
  type: ActionType.CLEAR_GENRES_FILTER,
});
