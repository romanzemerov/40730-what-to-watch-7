import MockAdapter from 'axios-mock-adapter';
import { fetchComments, postComments } from './async-actions';
import { APIRoute } from '../../const';
import { createAPI, transformCommentData } from '../../services/api';
import {
  getCommentsError,
  getCommentsRequest,
  getCommentsSuccess,
  postCommentError,
  postCommentRequest,
  postCommentSuccess
} from './actions';

let api = null;

describe('Comments async actions', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make success fetch request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';
    const responseData = [
      {
        id: 1,
        user: {
          id: 4,
          name: 'Test Author4',
        },
        rating: 8.9,
        comment: 'TestComment1',
        date: '2019-05-08T14:13:56.569Z',
      },
      {
        id: 2,
        user: {
          id: 5,
          name: 'Test Author5',
        },
        rating: 8.9,
        comment: 'TestComment2',
        date: '2016-05-08T14:13:56.569Z',
      },
    ];
    const fetchCommentsLoader = fetchComments(movieId);

    apiMock.onGet(`${APIRoute.COMMENTS}/${movieId}`).reply(200, responseData);

    return fetchCommentsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, getCommentsRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        getCommentsSuccess(responseData.map(transformCommentData)),
      );
    });
  });

  it('should make failed fetch request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';

    const fetchCommentsLoader = fetchComments(movieId);

    apiMock.onGet(`${APIRoute.COMMENTS}/${movieId}`).reply(500);

    return fetchCommentsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, getCommentsRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, getCommentsError());
    });
  });

  it('should make success post request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';

    const responseData = [
      {
        id: 1,
        user: {
          id: 4,
          name: 'Test Author4',
        },
        rating: 8.9,
        comment: 'TestComment1',
        date: '2019-05-08T14:13:56.569Z',
      },
      {
        id: 2,
        user: {
          id: 5,
          name: 'Test Author5',
        },
        rating: 8.9,
        comment: 'TestComment2',
        date: '2016-05-08T14:13:56.569Z',
      },
    ];
    const postCommentsLoader = postComments(movieId);

    apiMock.onPost(`${APIRoute.COMMENTS}/${movieId}`).reply(200, responseData);

    return postCommentsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, postCommentRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        postCommentSuccess(responseData.map(transformCommentData)),
      );
    });
  });

  it('should make failed post comment request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';

    const postCommentsLoader = postComments(movieId);

    apiMock.onPost(`${APIRoute.COMMENTS}/${movieId}`).reply(500);

    return postCommentsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, postCommentRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, postCommentError());
    });
  });
});
