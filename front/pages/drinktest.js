import React, { useEffect } from 'react';
import Link from 'next/link';

import AppLayout from '../components/AppLayout';
import { useDispatch } from 'react-redux';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import * as AT from '../actionType';
import style from '../styles/drinkTestMain.module.css';

const drinkTest = () => {
  const dispatch = useDispatch();

  return (
    <AppLayout>
      <div className={style.container}>
        <h2 className={`${style.pageSubtitle}`}>알콜 러버 테스트</h2>
        <h1 className={`${style.pageTitle}`}>
          내 안에 잠든
          <br />
          주당을 찾자
        </h1>
        <img
          src="https://www.nongmin.com/-/raw/srv-nongmin/data2/content/image/2022/12/14/.cache/512/2022121401090069.jpg"
          alt="캐릭터"
          className={style.character}
          style={{ display: 'block' }}
        />
        <Link href="/drinkTestQna">
          <a className={`${style.btn} ${style.btnOrange}`}>TEST GO</a>
        </Link>
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

export default drinkTest;
