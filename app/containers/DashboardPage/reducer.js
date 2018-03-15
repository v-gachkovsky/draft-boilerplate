import { fromJS } from 'immutable';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE
} from './actionTypes';

const initialState = fromJS({
  items: [],
  loading: false,
  error: null
});

function dashboardReducer(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case ADD_ITEM_REQUEST:
    case FETCH_ITEMS_REQUEST:
      return state
        .set('loading', true)
        .set('error', null);

    case ADD_ITEM_SUCCESS:
    case FETCH_ITEMS_SUCCESS:
      return state
        .set('loading', false)
        .set('items', payload);

    case ADD_ITEM_FAILURE:
    case FETCH_ITEMS_FAILURE:
      return state
        .set('loading', false)
        .set('error', error);
    default:
      return state;
  }
}

export default dashboardReducer;
