import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import { qnaList } from '../drinkTestData';
import usePlus from '../hooks/usePlus';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import * as AT from '../actionType';
import style from '../styles/drinkTestQna.module.css';
import { useDispatch } from 'react-redux';

const drinkTestQna = () => {
  const dispatch = useDispatch();
  const [idx, setIdx] = usePlus(0);
  const [progressVal, setProgressVal] = useState(10);
  const [drinkCount, setDrinkCount] = useState(0);
  const [noDrinkCount, setNoDrinkCount] = useState(0);

  const questionNumber = qnaList[idx]?.number;
  const question = qnaList[idx]?.question;
  const answer = qnaList[idx]?.choices;

  useEffect(() => {
    setProgressVal(prev => prev + 12);
  }, [idx]);

  useEffect(() => {
    if (idx === qnaList.length) {
      if (drinkCount > noDrinkCount) Router.push(`/drinkTestResult/0`);
      else Router.push(`/drinkTestResult/1`);
    }
  }, [idx]);

  const selectDrink = useCallback(() => {
    setIdx(prev => prev + 1);
    setDrinkCount(prev => prev + 1);
  }, []);

  const selectNoDrink = useCallback(() => {
    setIdx(prev => prev + 1);
    setNoDrinkCount(prev => prev + 1);
  }, []);

  return (
    <AppLayout>
      <div className={style.container}>
        <div className={style.progress}>
          {/* 게이지바 */}
          <div className={style.progressValue} id="progressValue" style={{ width: progressVal + '%' }}></div>
        </div>

        <div className={style.questionBox}>
          <div className={style.number}>{questionNumber}</div>
          <div className={style.question}>{question}</div>
          <div className={`${style.btn} ${style.btnGray} ${style.choice}`} onClick={selectDrink}>
            {answer && answer[0]?.text}
          </div>
          <div className={`${style.btn} ${style.btnGray} ${style.choice}`} onClick={selectNoDrink}>
            {answer && answer[1]?.text}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
  store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default drinkTestQna;
