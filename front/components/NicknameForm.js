import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../actionType';

const NicknameForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [nickname, handleChangeNickname] = useInput(user?.nickname || '');

  const submitNickname = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '15px' }), []);
  const { Search } = Input;
  return (
    <Form style={style}>
      <Search value={nickname} onChange={handleChangeNickname} onSearch={submitNickname} />
    </Form>
  );
};

export default NicknameForm;
