import { commentsReducer } from './reducer';
import {
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsError,
  postCommentRequest,
  postCommentSuccess,
  postCommentError
} from './actions';
import { loadingStates } from '../../const';

const testComments = [
  { id: 1, comment: 'textComment1' },
  { id: 2, comment: 'textComment2' },
  { id: 3, comment: 'textComment3' },
];

describe('Comments reducer', () => {
  describe('Fetch comments', () => {
    it('should return the download state', () => {
      const state = commentsReducer(undefined, getCommentsRequest());

      expect(state).toEqual({
        comments: [],
        commentsStatus: loadingStates.LOADING,
        postCommentStatus: loadingStates.IDLE,
      });
    });

    it('should return empty comments array', () => {
      const initialState = {
        comments: testComments,
        commentsStatus: loadingStates.IDLE,
        postCommentStatus: loadingStates.IDLE,
      };
      const state = commentsReducer(initialState, getCommentsRequest());

      expect(state).toEqual({
        comments: [],
        commentsStatus: loadingStates.LOADING,
        postCommentStatus: loadingStates.IDLE,
      });
    });

    it('should return the success download state', () => {
      const state = commentsReducer(undefined, getCommentsSuccess(testComments));

      expect(state).toEqual({
        comments: testComments,
        commentsStatus: loadingStates.SUCCEEDED,
        postCommentStatus: loadingStates.IDLE,
      });
    });

    it('should return the error state', () => {
      const state = commentsReducer(undefined, getCommentsError());

      expect(state).toEqual({
        comments: [],
        commentsStatus: loadingStates.FAILED,
        postCommentStatus: loadingStates.IDLE,
      });
    });
  });

  describe('Post comment', () => {
    it('should return the download state', () => {
      const state = commentsReducer(undefined, postCommentRequest());

      expect(state).toEqual({
        comments: [],
        commentsStatus: loadingStates.IDLE,
        postCommentStatus: loadingStates.LOADING,
      });
    });

    it('should return the success download state', () => {
      const state = commentsReducer(undefined, postCommentSuccess(testComments));

      expect(state).toEqual({
        comments: testComments,
        commentsStatus: loadingStates.IDLE,
        postCommentStatus: loadingStates.SUCCEEDED,
      });
    });

    it('should return the error state', () => {
      const initialState = {
        comments: testComments,
        commentsStatus: loadingStates.IDLE,
        postCommentStatus: loadingStates.LOADING,
      };

      const state = commentsReducer(initialState, postCommentError());

      expect(state).toEqual({
        comments: testComments,
        commentsStatus: loadingStates.IDLE,
        postCommentStatus: loadingStates.FAILED,
      });
    });
  });
});
