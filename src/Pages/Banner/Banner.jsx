import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/0FQcFNp/banner6.jpg" /></SwiperSlide>
        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/WxD0m82/banner7.jpg" /></SwiperSlide>
        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/7WkLbnh/banner1.jpg" /></SwiperSlide>
        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/Sy1sdr6/banner2.jpg" /></SwiperSlide>
        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/WG1Vts8/banner3.jpg" /></SwiperSlide>
        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/yVxr6LL/banner4.jpg" /></SwiperSlide>
        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/g9J20WP/banner5.jpg" /></SwiperSlide>

        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/yVxr6LL/banner4.jpg" /></SwiperSlide>
        <SwiperSlide><img className='h-[800px] w-[1700px]' src="https://i.ibb.co/WG1Vts8/banner3.jpg" /></SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;