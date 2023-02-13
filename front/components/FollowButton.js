import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import * as AT from '../actionType';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { user, followLoading, unfollowLoading } = useSelector(state => state.user);
  const isFollowing = user?.Followings.find(m => m.id === post.User.id);
  const handleFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({ type: AT.UNFOLLOW_REQUEST, data: post.User.id });
    } else {
      dispatch({ type: AT.FOLLOW_REQUEST, data: post.User.id });
    }
  }, [isFollowing]);

  if (post.User.id === user.id) {
    return null;
  }

  return (
    <div>
      <Button loading={followLoading || unfollowLoading} onClick={handleFollow}>
        {isFollowing ? '술친구 끊기' : '술친구 추가'}
      </Button>
    </div>
  );
};

export default FollowButton;

FollowButton.proptypes = {
  post: PropTypes.object.isRequired,
};
