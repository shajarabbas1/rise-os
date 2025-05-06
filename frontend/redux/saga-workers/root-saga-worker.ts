import { all } from 'redux-saga/effects';
import { userSaga } from './user.saga-worker';

export function* rootSagaWorker() {
  yield all([userSaga()]);
}
