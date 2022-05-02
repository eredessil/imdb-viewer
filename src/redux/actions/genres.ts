export enum GENRE_ACTIONS {
    REQUEST = 'get genres request',
    SUCCESS = 'get genres success',
    ERROR = 'get genres error',
}

export function getGenreRequest() {
    return {
        type: GENRE_ACTIONS.REQUEST
    }
}

export function getGenreSuccess({data}: any) {
    return {
        type: GENRE_ACTIONS.SUCCESS,
        payload: data.genres
    }
}
