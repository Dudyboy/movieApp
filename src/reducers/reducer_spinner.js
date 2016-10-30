import { SPINNER } from '../actions/types';

const initialState = {
    spinner: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SPINNER:
            return {
                ...state,
                spinner: action.spinner
            };
        default:
            return state;
    }
}