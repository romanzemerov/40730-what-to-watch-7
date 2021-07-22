import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { AppRoutes, AuthStates, LoadingStatus } from '../../const';
import { render, screen } from '@testing-library/react';
import App from './app';

const movies = [
  {
    id: 1,
    name: 'Bronson',
    posterImage: 'https://7.react.pages.academy/static/film/poster/Orlando.jpg',
    previewImage: 'https://7.react.pages.academy/static/film/preview/orlando.jpg',
    backgroundImage: 'https://7.react.pages.academy/static/film/background/Orlando.jpg',
    backgroundColor: '#D8D3BD',
    videoLink: 'http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4',
    previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    description:
      'Young nobleman Orlando is commanded by Queen Elizabeth I to stay forever young. Miraculously, he does just that. The film follows him as he moves through several centuries of British history, experiencing a variety of lives and relationships along the way, and even changing sex.',
    rating: 2.6,
    scoresCount: 12292,
    director: 'Sally Potter',
    starring: ['Tilda Swinton', 'Billy Zane', 'Quentin Crisp'],
    runTime: 94,
    genre: 'Drama',
    released: 1992,
    isFavorite: false,
  },
  {
    id: 2,
    name: 'The Revenant',
    posterImage: 'https://7.react.pages.academy/static/film/poster/Orlando.jpg',
    previewImage: 'https://7.react.pages.academy/static/film/preview/orlando.jpg',
    backgroundImage: 'https://7.react.pages.academy/static/film/background/Orlando.jpg',
    backgroundColor: '#D8D3BD',
    videoLink: 'http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4',
    previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    description:
      'Young nobleman Orlando is commanded by Queen Elizabeth I to stay forever young. Miraculously, he does just that. The film follows him as he moves through several centuries of British history, experiencing a variety of lives and relationships along the way, and even changing sex.',
    rating: 2.6,
    scoresCount: 12292,
    director: 'Sally Potter',
    starring: ['Tilda Swinton', 'Billy Zane', 'Quentin Crisp'],
    runTime: 94,
    genre: 'Drama',
    released: 1992,
    isFavorite: false,
  },
];

const promoMovie = {
  id: 3,
  name: 'Orlando',
  posterImage: 'https://7.react.pages.academy/static/film/poster/Orlando.jpg',
  previewImage: 'https://7.react.pages.academy/static/film/preview/orlando.jpg',
  backgroundImage: 'https://7.react.pages.academy/static/film/background/Orlando.jpg',
  backgroundColor: '#D8D3BD',
  videoLink: 'http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4',
  previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  description:
    'Young nobleman Orlando is commanded by Queen Elizabeth I to stay forever young. Miraculously, he does just that. The film follows him as he moves through several centuries of British history, experiencing a variety of lives and relationships along the way, and even changing sex.',
  rating: 2.6,
  scoresCount: 12292,
  director: 'Sally Potter',
  starring: ['Tilda Swinton', 'Billy Zane', 'Quentin Crisp'],
  runTime: 94,
  genre: 'Drama',
  released: 1992,
  isFavorite: false,
};

const currentMovie = {
  id: 4,
  name: 'Matrix',
  posterImage: 'https://7.react.pages.academy/static/film/poster/Orlando.jpg',
  previewImage: 'https://7.react.pages.academy/static/film/preview/orlando.jpg',
  backgroundImage: 'https://7.react.pages.academy/static/film/background/Orlando.jpg',
  backgroundColor: '#D8D3BD',
  videoLink: 'http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4',
  previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  description:
    'Young nobleman Orlando is commanded by Queen Elizabeth I to stay forever young. Miraculously, he does just that. The film follows him as he moves through several centuries of British history, experiencing a variety of lives and relationships along the way, and even changing sex.',
  rating: 2.6,
  scoresCount: 12292,
  director: 'Sally Potter',
  starring: ['Tilda Swinton', 'Billy Zane', 'Quentin Crisp'],
  runTime: 94,
  genre: 'Drama',
  released: 1992,
  isFavorite: false,
};

let history = null;
let store = null;
let fakeApp = null;

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      movies: {
        currentMovie: currentMovie,
        currentMovieStatus: LoadingStatus.SUCCEEDED,
        changeFavoriteStatus: 'IDLE',
        movies: movies,
        moviesStatus: LoadingStatus.SUCCEEDED,
        similarMovies: [],
        similarMoviesStatus: 'IDLE',
        favoriteMovies: [],
        favoriteMoviesStatus: 'IDLE',
      },
      auth: {
        user: {},
        loginStatus: 'IDLE',
        loginError: '',
        logoutStatus: 'IDLE',
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.SUCCEEDED,
      },
      filters: {
        genre: '',
      },
      comments: {
        comments: [],
        commentsStatus: 'IDLE',
        postCommentStatus: 'IDLE',
      },
      promoMovie: {
        promoMovie: promoMovie,
        promoMovieStatus: LoadingStatus.SUCCEEDED,
        changeFavoriteStatus: 'IDLE',
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render main page when user navigate to "/"', () => {
    history.push(AppRoutes.MAIN);
    render(fakeApp);

    expect(screen.getByText(promoMovie.name)).toBeInTheDocument();
  });
});
