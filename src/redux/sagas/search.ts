import {takeEvery, call, fork, put} from 'redux-saga/effects';
import {apiClient} from "../../api";
import {GetGenresResponse} from "../../api/model";
import {SEARCH_ACTIONS, searchMoviesSuccess} from "../actions/search";
import {SearchMoviesRequestAction} from "../mondels/search";

function* searchMovies(action: SearchMoviesRequestAction) {
    try {
        console.log('log')
        const result: GetGenresResponse = yield call(apiClient.searchMovies, action.payload);
        yield put(searchMoviesSuccess(result));
    } catch (error) {
        // error
    }
}

function* watchSearchMovies() {
    yield takeEvery(SEARCH_ACTIONS.REQUEST, searchMovies)
}

const searchSaga = [
    fork(watchSearchMovies)
];

export default searchSaga;
