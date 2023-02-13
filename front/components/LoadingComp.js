import React from 'react';
import LoadingOverlay from '@ronchalant/react-loading-overlay';

const LoadingComp = ({ isLoading }) => {
  return (
    <LoadingOverlay active={isLoading} spinner text="테스트 결과를 로딩중입니다...">
      <p></p>
    </LoadingOverlay>
  );
};

export default LoadingComp;
