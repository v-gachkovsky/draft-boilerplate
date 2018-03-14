import { fork } from 'redux-saga/effects';
import fetchItems from './fetchItems';

export default function* dashboardSaga() {
  yield fork(fetchItems);
}
