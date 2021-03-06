import { call, put } from 'redux-saga/effects';
import { post } from 'utils/apiRequestMocks/dashboard/apiRequest';
import { reset } from 'redux-form';
import { FORM_NAME as NEW_ITEM_FORM } from '../../forms/newItemForm';
import { addItemSuccess, addItemFailure } from '../../actions';

export default function* addingDashboardItems(action) {
  const { payload } = action;

  try {
    const { data: items } = yield call(post, '/items', payload);

    yield reset(NEW_ITEM_FORM);
    yield put(addItemSuccess(items));
  } catch (error) {
    yield put(addItemFailure(null, error));
  }
}
