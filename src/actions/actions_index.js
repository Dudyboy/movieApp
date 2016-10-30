import { MOVIES, ACTIVE_MOVIES, SPINNER, SPINNER_MOVIES_LIST } from './types';

const ROOT_URL = 'http://api.themoviedb.org/';
const API_KEY = '4aa883f95999ec813b8bfaf319f3972b';

export const getMovies = () => {
    return async(dispatch) => {
        dispatch({
            type: SPINNER_MOVIES_LIST,
            spinnerList: true
        });

        try {
            let response = await fetch(`${ROOT_URL}3/movie/popular?api_key=${API_KEY}`);
            let responseJson = await response.json();

            console.log(responseJson);

            dispatch({
                type: MOVIES,
                payload: responseJson.results
            });
            dispatch({
                type: SPINNER_MOVIES_LIST,
                spinnerList: false
            });

        } catch(error) {
            dispatch({
                type: SPINNER_MOVIES_LIST,
                spinnerList: false
            });
        }
    }
};

export const getDetailMovie = (id) => {
    return async(dispatch) => {
        dispatch({
            type: SPINNER,
            spinner: true
        });
        try {
            let response = await fetch(`${ROOT_URL}3/movie/${id}?api_key=${API_KEY}`);
            let responseJson = await response.json();

            console.log(responseJson);

            dispatch({
                type: ACTIVE_MOVIES,
                payload: responseJson
            });
            dispatch({
                type: SPINNER,
                spinner: false
            });

        } catch(error) {
            dispatch({
                type: SPINNER,
                spinner: false
            });
        }
    }
};

export const searchMovies = (movie) => {
    return async(dispatch) => {
        dispatch({
            type: SPINNER_MOVIES_LIST,
            spinnerList: true
        });
        try {
            console.log(!movie.length);
            let responseJson;
            if(!movie.length) {
                let response = await fetch(`${ROOT_URL}3/movie/popular?api_key=${API_KEY}`);
                responseJson = await response.json();
            } else {
                let response = await fetch(`${ROOT_URL}3/search/movie?query=${movie}&api_key=${API_KEY}`);
                responseJson = await response.json();
            }

            dispatch({
                type: MOVIES,
                payload: responseJson.results
            });

            dispatch({
                type: SPINNER_MOVIES_LIST,
                spinnerList: false
            });

        } catch(error) {
            dispatch({
                type: SPINNER_MOVIES_LIST,
                spinnerList: false
            });
        }
    }
};