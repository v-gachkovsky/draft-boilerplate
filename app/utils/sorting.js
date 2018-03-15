import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

export const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC'
};

export function SortIndicator({ sortDirection }) {
  const classNames = CN('ReactVirtualized__Table__sortableHeaderIcon', {
    'ReactVirtualized__Table__sortableHeaderIcon--ASC':
    sortDirection === SortDirection.ASC,
    'ReactVirtualized__Table__sortableHeaderIcon--DESC':
    sortDirection === SortDirection.DESC
  });

  return (
    <svg className={ classNames } width={ 18 } height={ 18 } viewBox="0 0 24 24">
      { sortDirection === SortDirection.ASC ? (
        <path d="M7 14l5-5 5 5z" />
      ) : (
        <path d="M7 10l5 5 5-5z" />
      ) }
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

SortIndicator.propTypes = {
  sortDirection: PropTypes.oneOf([SortDirection.ASC, SortDirection.DESC])
};
