import {takeEvery, call, fork, put} from 'redux-saga/effects';
import {apiClient} from "../../api";
import {GetGenresResponse} from "../../api/model";
import {GENRE_ACTIONS, getGenreSuccess} from "../actions/genres";

function* getGenres() {
    try {
        const result: GetGenresResponse = yield call(apiClient.getGenres);
        yield put(getGenreSuccess({data: result}));
    } catch (error) {
        // todo: handle error
        console.log(error)
    }
}

function* watchGetGenres() {
    yield takeEvery(GENRE_ACTIONS.REQUEST, getGenres)
}

const genreSaga = [
    fork(watchGetGenres)
];

export default genreSaga;
