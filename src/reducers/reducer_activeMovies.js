import { ACTIVE_MOVIES } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVE_MOVIES:
            console.log(state);
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        default:
            return state;
    }
}