import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../../components/PostCard';
import * as AT from '../../actionType';

import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import { useRouter } from 'next/router';

const AppLayout = dynamic(() => import('../../components/AppLayout'));

const Tag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, isMorePosts, loadPostsLoading } = useSelector(state => state.post);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        if (isMorePosts && !loadPostsLoading) {
          const endId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({ type: AT.LOAD_HASTAG_POSTS_REQUEST, data: tag, endId });
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMorePosts, mainPosts.length, tag, loadPostsLoading]);

  return (
    <AppLayout>
      {mainPosts.map(m => (
        <PostCard key={m.id} post={m} />
      ))}
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
  store.dispatch({
    type: AT.LOAD_HASTAG_POSTS_REQUEST,
    data: store.params.tag,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Tag;
