'use client'

import { useState, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperObject } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css'

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { ProductImage } from '../product-image/ProductImage';


interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ( { images, title, className }: Props ) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();


  return (
    <div className={ className }>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500
        }}
        thumbs={{ 
          swiper: thumbsSwiper 
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <ProductImage 
                width={1024}
                height={800}
                src={image}
                alt={title}
                className='rounded-lg object-fill h-auto w-full'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image 
                width={300}
                height={300}
                src={`/products/${image}`}
                alt={title}
                className='rounded-lg object-fill'
                priority
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
