import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as AT from '../actionType';

const MiniProfile = () => {
  const dispatch = useDispatch();
  const { user, logOutLoading } = useSelector(state => state.user);

  const handleLogout = useCallback(() => {
    dispatch({ type: AT.LOG_OUT_REQUEST });
  }, []);

  return (
    <>
      {user && (
        <div>
          <span style={{ marginRight: '20px', color: 'white' }}>환영합니다, {user.nickname}님</span>
          <Button onClick={handleLogout} loading={logOutLoading}>
            로그아웃
          </Button>
        </div>
      )}
    </>
  );
};

export default MiniProfile;
