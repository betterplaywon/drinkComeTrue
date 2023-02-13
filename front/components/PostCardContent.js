import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postContent }) => {
  return (
    <div>
      {postContent.split(/(#[^\s#]+)/g).map((content, idx) => {
        if (content.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hashtag/${content.slice(1)}`} key={idx}>
              {content}
            </Link>
          );
        }
        return content;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
};

export default PostCardContent;
