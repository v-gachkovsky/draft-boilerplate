import { createAction } from '../../utils/reduxHelpers';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE
} from './actionTypes';

export const fetchItems = createAction(FETCH_ITEMS_REQUEST);
export const fetchItemsSuccess = createAction(FETCH_ITEMS_SUCCESS);
export const fetchItemsFailure = createAction(FETCH_ITEMS_FAILURE);
