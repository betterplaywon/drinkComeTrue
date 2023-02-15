import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import useToggle from '../hooks/useToggle';
import { backUrl } from '../config/config';

const ImagesSlider = dynamic(() => import('./ImagesSlider'));

const PostImages = ({ images }) => {
  const [showImagesSlider, toggleSlider] = useToggle(false);

  if (images.length === 1) {
    return (
      <>
        <img
          style={{ width: '25%', display: 'inline-block' }}
          role="presentation"
          src={`${backUrl}/${images[0].src}`}
          alt={images[0].src}
          onClick={toggleSlider}
        />
        {showImagesSlider && <ImagesSlider images={images} toggleSlider={toggleSlider} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          style={{ width: '25%', display: 'inline-block' }}
          role="presentation"
          src={`${backUrl}/${images[0].src}`}
          alt={`${backUrl}/${images[0].src}`}
          onClick={toggleSlider}
        />
        <img
          style={{ width: '25%', display: 'inline-block' }}
          role="presentation"
          src={`${backUrl}/${images[1].src}`}
          alt={`${backUrl}/${images[1].src}`}
          onClick={toggleSlider}
        />
        {showImagesSlider && <ImagesSlider images={images} toggleSlider={toggleSlider} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          style={{ width: '25%', display: 'inline-block' }}
          src={`${backUrl}/${images[0].src}`}
          alt="communityImage"
        />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '25%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={toggleSlider}
        >
          <PlusOutlined />
          <br />
          <span>{images.length - 1}개의 사진 더보기</span>
        </div>
      </div>
      {showImagesSlider && <ImagesSlider images={images} toggleSlider={toggleSlider} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
