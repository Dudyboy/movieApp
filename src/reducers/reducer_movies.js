import { MOVIES, SPINNER_MOVIES_LIST } from '../actions/types';

const initialState = {
    movies: [],
    spinnerList: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SPINNER_MOVIES_LIST:
            return {
                ...state,
                spinnerList: action.spinnerList
            };
        case MOVIES:
            return {
                ...state,
                movies: action.payload
            };
        default:
            return state;
    }
}