import React, { useMemo } from 'react';
import { List, Card, Button } from 'antd';
import PropTypes from 'prop-types';
import StopOutlined from '@ant-design/icons/StopOutlined';
import { useDispatch } from 'react-redux';
import * as AT from '../actionType';

const FollowList = ({ data, header, handleMoreView, loading }) => {
  const dispatch = useDispatch();
  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '15px' }), []);
  const { Meta } = Card;

  const handleUnfollow = userId => () => {
    if (header === '팔로잉') {
      dispatch({
        type: AT.UNFOLLOW_REQUEST,
        data: userId,
      });
    }
    dispatch({
      type: AT.REMOVE_FOLLOWER_REQUEST,
      data: userId,
    });
  };

  return (
    <List
      style={style}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <>
          <Button onClick={handleMoreView} loading={loading}>
            더보기
          </Button>
        </>
      }
      bordered
      // data = user
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card actions={[<StopOutlined key="stop" onClick={handleUnfollow(item.id)} />]}>
            <Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  handleMoreView: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowList;
