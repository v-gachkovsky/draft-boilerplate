import { NAMESPACE } from './constants';
import { addPrefix } from '../../utils/reduxHelpers';

const NS = type => addPrefix(NAMESPACE, type);

export const FETCH_ITEMS_REQUEST = NS('FETCH_ITEMS_REQUEST');
export const FETCH_ITEMS_SUCCESS = NS('FETCH_ITEMS_SUCCESS');
export const FETCH_ITEMS_FAILURE = NS('FETCH_ITEMS_FAILURE');

export const ADD_ITEM_REQUEST = NS('ADD_ITEM_REQUEST');
export const ADD_ITEM_SUCCESS = NS('ADD_ITEM_SUCCESS');
export const ADD_ITEM_FAILURE = NS('ADD_ITEM_FAILURE');
