import { fork } from 'redux-saga/effects';
import fetchItems from './fetchItems';
import addItem from './addItem';

export default function* dashboardSaga() {
  yield fork(fetchItems);
  yield fork(addItem);
}
