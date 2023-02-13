import React, { useState, useCallback } from 'react';

export default (initValue = false) => {
  const [toggle, setToggle] = useState(initValue);

  const handleToggle = useCallback(() => {
    setToggle(prev => !prev);
  }, []);

  return [toggle, handleToggle];
};
