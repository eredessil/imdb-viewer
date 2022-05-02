import {GENRE_ACTIONS} from "../actions/genres";
import {GenresAction} from "../mondels/genres";
import {Genre} from "../../api/model";

interface InitialValue {
    data: Genre[],
    isFetching: true,
    error: ''
}
const INITIAL_VALUE :InitialValue[] = [];

export default function genres(state = INITIAL_VALUE, {type, payload}: GenresAction) {
    switch (type) {
        case GENRE_ACTIONS.REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }

        case GENRE_ACTIONS.SUCCESS: {
            console.log('payload', payload)
            return {
                ...state,
                data: payload,
                isFetching: false
            }
        }

        case GENRE_ACTIONS.ERROR: {
            return {
                ...state,
                error: payload,
                isFetching: false
            }
        }

        default: return state;
    }
}
