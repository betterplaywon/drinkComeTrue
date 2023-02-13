import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const HomeComp = dynamic(() => import('../components/HomeComp'));

const Home = () => {
  return (
    <AppLayout>
      <Head>
        <title> DRINK COME TRUE</title>
      </Head>
      <HomeComp />
    </AppLayout>
  );
};

export default Home;
