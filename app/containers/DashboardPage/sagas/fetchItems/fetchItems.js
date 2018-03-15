import { call, put } from 'redux-saga/effects';
import { get } from 'utils/apiRequestMocks/dashboard/apiRequest';
import { fetchItemsSuccess, fetchItemsFailure } from '../../actions';

export default function* fetchingDashboardItems() {
  try {
    const { data: items } = yield call(get, '/items');

    yield put(fetchItemsSuccess(items));
  } catch (error) {
    yield put(fetchItemsFailure(null, error));
  }
}
