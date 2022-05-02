import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import reducers from "./reducers";
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

// deprecated? now redux is recommended to use redux toolkit.
// todo: read more and refactor later. https://redux-toolkit.js.org/
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export {store};
