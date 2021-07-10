import axios from 'axios';
import { HttpCodes } from '../const';

const URL = 'https://7.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

const { token } = JSON.parse(localStorage.getItem('user')) ?? { token: '' };

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'X-Token': token,
    },
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const { response } = err;

    if (response.status === HttpCodes.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export const transformMovieData = (movie) => ({
  id: movie.id,
  name: movie.name,
  posterImage: movie.poster_image,
  previewImage: movie.preview_image,
  backgroundImage: movie.background_image,
  backgroundColor: movie.background_color,
  videoLink: movie.video_link,
  previewVideoLink: movie.preview_video_link,
  description: movie.description,
  rating: movie.rating,
  scoresCount: movie.scores_count,
  director: movie.director,
  starring: movie.starring,
  runTime: movie.run_time,
  genre: movie.genre,
  released: movie.released,
  isFavorite: movie.is_favorite,
});

export const transformUserData = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatarUrl: user.avatar_url,
  token: user.token,
});

export const transformCommentData = (comment) => ({
  id: comment.id,
  author: comment.user.name,
  date: comment.date,
  rating: comment.rating,
  text: comment.comment,
});
