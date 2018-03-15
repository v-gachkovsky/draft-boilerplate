import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';
import { selectNamespace } from '../../utils/reduxHelpers';

const selectItems = () => createSelector(
  state => selectNamespace(state)(NAMESPACE),
  namespace => namespace.get('items')
);

const getLoadingStatus = () => createSelector(
  state => selectNamespace(state)(NAMESPACE),
  namespace => namespace.get('loading')
);

export {
  selectItems,
  getLoadingStatus
};
