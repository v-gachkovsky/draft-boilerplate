import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const selectNamespace = state => state.get(NAMESPACE);

const selectItems = () => createSelector(
  selectNamespace,
  namespace => namespace.get('items')
);

const getLoadingStatus = () => createSelector(
  selectNamespace,
  namespace => namespace.get('loading')
);

export {
  selectItems,
  getLoadingStatus
};
