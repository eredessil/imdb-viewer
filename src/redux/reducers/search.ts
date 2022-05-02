import {SEARCH_ACTIONS} from "../actions/search";
import {SearchMoviesAction} from "../mondels/search";
import {Result} from "../../api/model";

interface InitialValue {
    isFetching: boolean,
    data: Result[],
    error: string
    noResult: boolean
}
const INITIAL_VALUE :InitialValue = {
    isFetching: true,
    noResult: false,
    data: [],
    error: ''
};

export default function search(state = INITIAL_VALUE, {type, payload}: SearchMoviesAction) {
    switch (type) {
        case SEARCH_ACTIONS.REQUEST: {
            return {
                ...state,
                isFetching: true,
            }
        }

        case SEARCH_ACTIONS.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                data: payload,
                noResult: !payload?.length,
            }
        }

        case SEARCH_ACTIONS.CLEAR: {
            return {
                ...INITIAL_VALUE
            }
        }

        case SEARCH_ACTIONS.ERROR: {
            return {
                ...state,
                isFetching: false,
                error: payload
            }
        }

        default: return state;
    }
}
