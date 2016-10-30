import { combineReducers } from 'redux';
import spinner from './reducer_spinner';
import movies from './reducer_movies';
import activeMovies from './reducer_activeMovies.js';

export default combineReducers({
    spinner,
    movies,
    activeMovies
});