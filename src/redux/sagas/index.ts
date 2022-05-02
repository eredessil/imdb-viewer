import {all} from 'redux-saga/effects';
import genreSaga from "./genres";
import searchSaga from "./search";

export default function* rootSaga() {
    yield all([
        ...genreSaga,
        ...searchSaga
    ])
}
