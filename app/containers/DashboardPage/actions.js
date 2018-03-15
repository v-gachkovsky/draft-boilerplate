import { createAction } from '../../utils/reduxHelpers';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE
} from './actionTypes';

export const fetchItems = createAction(FETCH_ITEMS_REQUEST);
export const fetchItemsSuccess = createAction(FETCH_ITEMS_SUCCESS);
export const fetchItemsFailure = createAction(FETCH_ITEMS_FAILURE);

export const addItem = createAction(ADD_ITEM_REQUEST);
export const addItemSuccess = createAction(ADD_ITEM_SUCCESS);
export const addItemFailure = createAction(ADD_ITEM_FAILURE);
