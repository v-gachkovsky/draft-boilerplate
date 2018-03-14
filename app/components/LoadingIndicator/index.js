import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

import Wrapper from './Wrapper';

const LoadingIndicator = () => (
  <Wrapper>
    <CircularProgress size={ 80 } thickness={ 4 } />
  </Wrapper>
);

export default LoadingIndicator;
