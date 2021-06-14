import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/app';
import { nanoid } from '@reduxjs/toolkit';

const movies = [...Array(20)].map(() => ({
  id: nanoid(),
  name: 'Fantastic Beasts: The Crimes of Grindelwald',
  posterImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
}));

ReactDOM.render(
  <React.StrictMode>
    <App movies={movies} />
  </React.StrictMode>,
  document.getElementById('root'),
);
