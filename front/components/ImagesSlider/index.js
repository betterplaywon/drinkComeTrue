import React from 'react';
import PropTypes from 'prop-types';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { backUrl } from '../../config/config';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/components/pagination/pagination.min.css';

const ImagesSlider = ({ images }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {images.map((drinkImage, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div>
                <img
                  style={{ width: '50%', display: 'inline-block' }}
                  src={`${backUrl}/${drinkImage.src}`}
                  alt={`${backUrl}/${drinkImage.src}`}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

ImagesSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleZoom: PropTypes.func.isRequired,
};
export default ImagesSlider;
