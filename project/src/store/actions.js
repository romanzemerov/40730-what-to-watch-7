export const ActionType = {
  CHANGE_GENRES_FILTER: 'filter/changeGenresFilter',
  CLEAR_GENRES_FILTER: 'filter/clearGenresFilter',
};

export const ActionCreator = {
  changeGenresFilter: (genre) => ({
    type: ActionType.CHANGE_GENRES_FILTER,
    payload: genre,
  }),
  clearGenresFilter: () => ({
    type: ActionType.CLEAR_GENRES_FILTER,
  }),
};
