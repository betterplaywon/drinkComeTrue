import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import * as AT from '../actionType';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';

const community = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { mainPosts, isMorePosts, loadPostLoading } = useSelector(state => state.post);

  useEffect(() => {
    function onScroll() {
      if (
        Math.floor(window.scrollY + document.documentElement.clientHeight) === document.documentElement.scrollHeight
      ) {
        if (isMorePosts && !loadPostLoading) {
          const endId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({ type: AT.LOAD_POSTS_REQUEST, endId });
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMorePosts, loadPostLoading, mainPosts]);

  useEffect(() => {
    if (!user) {
      alert('로그인 후 이용해주세요');
      Router.push('/');
    }
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>Drink Come True - Community</title>
      </Head>
      {user && <PostForm />}
      {user && mainPosts.map(post => <PostCard key={post.id} post={post} />)}
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
export default community;
