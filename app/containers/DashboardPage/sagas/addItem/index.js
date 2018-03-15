import { fork, takeLatest } from 'redux-saga/effects';
import { ADD_ITEM_REQUEST } from '../../actionTypes';
import addItem from './addItem';

export default function* watchAddItem() {
  yield fork(takeLatest, ADD_ITEM_REQUEST, addItem);
}
