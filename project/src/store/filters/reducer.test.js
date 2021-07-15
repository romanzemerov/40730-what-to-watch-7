import { filtersReducer } from './reducer';
import { changeGenresFilter, clearGenresFilter } from './actions';

describe('Comments reducer', () => {
  it('should return state with updated genre', () => {
    const state = filtersReducer(undefined, changeGenresFilter('testGenre'));

    expect(state).toEqual({
      genre: 'testGenre',
    });
  });

  it('should return default state', () => {
    const state = filtersReducer({ genre: 'testGenre' }, clearGenresFilter());

    expect(state).toEqual({
      genre: '',
    });
  });
});
