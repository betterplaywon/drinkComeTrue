import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import * as AT from '../actionType';
import PropTypes from 'prop-types';
import useToggle from '../hooks/useToggle';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import { Card, Button, Popover, List, Avatar, Comment } from 'antd';
import FollowButton from './FollowButton';

const PostImages = dynamic(() => import('./PostImages'));
const CommentForm = dynamic(() => import('./CommentForm'));
const PostCardContent = dynamic(() => import('./PostCardContent'));

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.user);
  const { Meta } = Card;
  const id = user?.id;
  const liked = post.Likers.find(m => m.id === id);

  const [isCommentFormOpen, onToggleCommentFormOpen] = useToggle(false);

  const activeLiked = useCallback(() => {
    if (!id) {
      return alert('로그인 후 이용해주세요');
    }
    return dispatch({
      type: AT.LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const inActiveLiked = useCallback(() => {
    if (!id) {
      return alert('로그인 후 이용해주세요');
    }
    return dispatch({
      type: AT.UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: AT.REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div style={{ marginBottom: '10px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <MessageOutlined key="comment" onClick={onToggleCommentFormOpen} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id && (
                  <>
                    <Button type="danger" onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <div style={{ position: 'absolute', right: 20 }}>{dayjs(post.createdAt).format('YYYY.MM.DD')}</div>
        <Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postContent={post.content} />}
        />
      </Card>

      {isCommentFormOpen && (
        <div style={{ background: '#fff', padding: '10px' }}>
          <CommentForm post={post} />
          <List
            itemLayout="horizontal"
            header={`${post.Comments.length}개의 댓글`}
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment author={item.User.nickname} content={item.content} />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default PostCard;
