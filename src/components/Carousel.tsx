'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
interface CarouselData {
  data: CarouselProps[];
}

interface CarouselProps {
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  linkTo: string;
}

const Carousel = ({ data }: CarouselData) => {
  return (
    <Swiper
      centeredSlides={true} //가운데 정렬
      slidesPerView={1} //한 슬라이드에 보여줄 갯수
      spaceBetween={0} //슬라이드간 거리
      loop={true} //슬라이드 반복 여부
      autoplay={{ delay: 5000 }} //자동 슬라이드 시간
      navigation // 이동 화살표
      pagination={{
        dynamicBullets: false,
        clickable: true,
      }} //pager여부
      touchRatio={0}
      modules={[Pagination, Navigation, Autoplay]}>
      {data?.map((carousel: CarouselProps) => (
        <SwiperSlide key={carousel.order}>
          <Link href={carousel.linkTo} key={carousel.order}>
            <div
              className="h-44 lg:h-[30rem] bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
              style={{
                backgroundImage: `url(${carousel.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className="h-full relative flex w-11/12 lg:w-9/12 flex-col justify-center lg:-translate-y-16 px-10">
                <h1 className="text-2xl md:text-4xl lg:text-8xl font-extrabold leading-normal lg:leading-relaxed text-white">
                  {carousel.title}
                </h1>
                <div className="mt-1 md:mt-2 lg:mt-4 text-sm md:text-base lg:text-4xl ml-0.5 md:ml-1 lg:ml-2 text-white">
                  {carousel.description}
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
