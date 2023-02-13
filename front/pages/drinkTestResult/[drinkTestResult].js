import React, { useEffect } from 'react';
import { qnaResult } from '../../drinkTestData';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import * as AT from '../../actionType';
import LoadingComp from '../../components/LoadingComp';
import useToggle from '../../hooks/useToggle';
import style from '../../styles/drinkTestResult.module.css';
import { useDispatch } from 'react-redux';

const drinkTestResult = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, handleIsLoading] = useToggle(true);
  const query = Number(router.query.drinkTestResult);
  const qnaResultTitle = qnaResult[query]?.title;
  const qnaResults = qnaResult[query]?.results;
  const qnaRecommendFood = qnaResult[query]?.recommendFood;

  useEffect(() => {
    setTimeout(() => {
      handleIsLoading();
    }, 500);
  }, []);

  return (
    <>
      {isLoading ? (
        <AppLayout>
          <div className={style.loadingContainer}>
            <LoadingComp isLoading={isLoading} />
          </div>
        </AppLayout>
      ) : (
        <AppLayout>
          <div className={style.container}>
            <h2 className={style.pageSubTitle}>나는 술을 좋아할까?</h2>
            <h1 className={style.pageTitle}>{qnaResultTitle}</h1>
            <img
              src="https://i.pinimg.com/550x/6a/ba/d1/6abad1ff1c1558c9d529b94c0079b689.jpg"
              alt="캐릭터"
              className={style.character}
            />
            <div className={style.result}>{<div className={style.resultBox}>{qnaResults}</div>}</div>
            <div className={style.result}>
              <h3>이런 음식을 추천드려요!</h3>
              <div className={style.resultJobs}>
                {qnaRecommendFood.map((m, idx) => (
                  <div className={style.resultJob} key={idx}>
                    <img src={m.src} />
                    <p>{m.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/drinktest">
              <a className={`${style.btn} ${style.btnGray} ${style.btnSmall} `}>다시 테스트하기</a>
            </Link>
          </div>
        </AppLayout>
      )}
    </>
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

export default drinkTestResult;
