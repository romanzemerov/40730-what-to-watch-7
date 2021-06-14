import React from 'react';
import { Main } from '../main/main';

function App({ movies }) {
  return <Main movies={movies} />;
}

App.propTypes = Main.propTypes;

export { App };
