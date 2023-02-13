import React, { useCallback, useState } from 'react';

export default (initValue = null) => {
  const [userInfo, setUserInfo] = useState(initValue);

  const handleUserInfo = useCallback(e => {
    setUserInfo(e.target.value);
  }, []);

  return [userInfo, handleUserInfo, setUserInfo];
};
