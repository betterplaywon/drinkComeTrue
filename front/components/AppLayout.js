import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import MiniProfile from './MiniProfile';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { Menu, Input, Row, Col, Layout, Breadcrumb } from 'antd';
import styled from 'styled-components';

const AppLayout = ({ children }) => {
  const router = useRouter();
  const { user } = useSelector(state => state.user);
  const { Search } = Input;
  const { Content, Footer } = Layout;

  const [searchInput, onChangeSearchInput] = useInput('');

  const menuStyle = useMemo(
    () => ({
      padding: '15px',
      backgroundColor: 'black',
      textAlign: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      width: '100%',
    }),
    [],
  );
  const footerStyle = useMemo(() => ({ backgroundColor: '#000000', textAlign: 'center', color: '#fff' }), []);
  const menuFontColor = useMemo(
    () => ({
      color: 'white',
    }),
    [],
  );

  const onSearch = useCallback(() => {
    router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const convertPathUpperCase = path => {
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const path = convertPathUpperCase(router.asPath.slice(1));
  const drinkTestPath = 'DrinkTest' || 'DrinkTestQna' || 'DrinkTestResult';

  const menuItems = [
    {
      label: (
        <Link href="/">
          <span style={menuFontColor}>DRINK CHECK</span>
        </Link>
      ),
      key: 'home',
    },
    {
      label: (
        <Link href="/cycle">
          <span style={menuFontColor}>주종 체크</span>
        </Link>
      ),
      key: 'cycle',
    },
    {
      label: (
        <Link href="/community">
          <span style={menuFontColor}>음주 게시판</span>
        </Link>
      ),
      key: 'community',
    },
    {
      label: (
        <Link href="/drinktest">
          <span style={menuFontColor}>음주 레벨 테스트</span>
        </Link>
      ),
      key: 'drinktest',
    },
    path === 'Community' && {
      label: (
        <Search
          value={searchInput}
          onChange={onChangeSearchInput}
          onSearch={onSearch}
          enterButton
          style={{ marginTop: '8px', width: '15vw' }}
        />
      ),
      key: 'mail',
    },
    !user
      ? {
          label: (
            <Link href="/usersign">
              <span style={menuFontColor}>회원가입 / 로그인</span>
            </Link>
          ),
          key: 'usersign',
        }
      : {
          label: <MiniProfile />,
          key: 'miniprofile',
        },
  ];

  return (
    <div>
      <Layout
        className="layout"
        style={{
          minHeight: '100vh',
          background: '#fff',
        }}
      >
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['2']} style={menuStyle} items={menuItems} />

        <Content
          style={{
            padding: '0 50px',
            minHeight: '100%',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{path}</Breadcrumb.Item>
          </Breadcrumb>

          {path === drinkTestPath ? (
            <Row gutter={24}>
              <Col xs={24} md={5}></Col>
              <Col xs={24} md={16} style={{ maxWidth: '50vw' }}>
                {children}
              </Col>
            </Row>
          ) : (
            <SiteLayoutContent>
              <Row gutter={24}>
                <Col xs={24} md={5}></Col>
                <Col xs={24} md={16} style={{ maxWidth: '50vw' }}>
                  {children}
                </Col>
              </Row>
            </SiteLayoutContent>
          )}
        </Content>
        <Footer style={footerStyle}>
          <span style={footerStyle}>자신의 술 습관을 아는 그날까지</span>
        </Footer>
      </Layout>
    </div>
  );
};
const SiteLayoutContent = styled.div`
  min-height: 70vh;
  padding: 24px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://gscaltexmediahub.com/wp-content/uploads/2011/11/%EC%88%A0.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
