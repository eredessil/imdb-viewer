export enum SEARCH_ACTIONS {
    REQUEST = 'search movies request',
    SUCCESS = 'search movies success',
    CLEAR = 'search movies success',
    ERROR = 'search movies error',
}

export function searchMoviesRequest(query: string) {
    return {
        type: SEARCH_ACTIONS.REQUEST,
        payload: query
    }
}

export function searchMoviesClear() {
    return {
        type: SEARCH_ACTIONS.CLEAR
    }
}

export function searchMoviesSuccess({results}: any) {
    return {
        type: SEARCH_ACTIONS.SUCCESS,
        payload: results
    }
}
