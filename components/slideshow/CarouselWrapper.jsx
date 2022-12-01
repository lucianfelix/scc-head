'use client';

import { Carousel } from 'react-responsive-carousel';

export default function CarouselWrapper({ children }) {
  return (
    <Carousel
        // autoPlay
        // showArrows
        interval={15000}
        showThumbs={false}>
        {children}
      </Carousel>
  )
}
