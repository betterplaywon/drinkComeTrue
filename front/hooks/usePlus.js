import React, { useState, useCallback } from 'react';

export default (initValue = 0) => {
  const [number, setNumber] = useState(initValue);

  const handleplus = useCallback(() => {
    setNumber(prev => prev + 1);
  }, []);

  return [number, handleplus];
};
