
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import catsReducer from './cats/reducer';
import actionTypes from './cats/actionTypes';
import watcher from './cats/sagas/upDateCats';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cats: catsReducer
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [actionTypes.FETCH_CATS]
    }
  }).concat(sagaMiddleware)
});
sagaMiddleware.run(watcher);

export default store;