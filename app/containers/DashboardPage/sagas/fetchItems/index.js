import { fork, takeLatest } from 'redux-saga/effects';
import { FETCH_ITEMS_REQUEST } from '../../actionTypes';
import fetchItems from './fetchItems';

export default function* watchFetchItems() {
  yield fork(takeLatest, FETCH_ITEMS_REQUEST, fetchItems);
}
