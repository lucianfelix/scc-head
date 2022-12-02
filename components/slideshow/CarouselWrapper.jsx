'use client';

import { lazy } from 'react';
const Carousel = lazy(() => import('react-responsive-carousel').then((module) => ({ default: module.Carousel })));
//import { Carousel } from 'react-responsive-carousel';

export default function CarouselWrapper({ children }) {
  return (
    <Carousel
        // autoPlay
        // showArrows
        showIndicators={false}
        interval={15000}
        showThumbs={false}>
        {children}
      </Carousel>
  )
}
