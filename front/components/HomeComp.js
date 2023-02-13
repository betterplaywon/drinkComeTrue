import React, { useMemo } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import style from '../styles/homeCompAnimation.module.css';

const HomeComp = () => {
  const themeStyle = useMemo(
    () => ({
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    }),
    [],
  );

  const contentStyle = useMemo(
    () => ({
      fontSize: '20px',
      color: '#fff',
      textAlign: 'center',
    }),
    [],
  );

  const buttonStyle = useMemo(
    () => ({
      display: 'inline-block',
      background: 'rgba(75, 192, 192, 0.8)',
      border: '2px solid rgba(75, 192, 192, 0.3)',
      color: '#fff',
      padding: '5px 20px',
    }),
    [],
  );

  const handleMoveCommunity = () => {
    Router.replace('/community');
  };

  return (
    <Container>
      <p className={style.fadein} style={themeStyle}>
        음주를, 음주를 위한, 음주에 의한
      </p>
      <p className={style.fadein} style={contentStyle}>
        술 약속을 잡거나 어떤 술을 자주 마시는지
      </p>
      <p className={style.fadein} style={contentStyle}>
        알고싶어 만들게 된 서비스
      </p>
      <div className={style.fadein} style={{ textAlign: 'center' }}>
        <button style={buttonStyle} onClick={handleMoveCommunity}>
          술약속 잡으러 가기
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default HomeComp;
