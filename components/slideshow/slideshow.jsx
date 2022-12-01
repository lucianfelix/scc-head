'use client';

import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './slideshow.css'
import Image from "next/image";

export default function Slideshow({data}) {
  const num_slides = data.slides.length;

  return (<>
    <Carousel
        autoPlay
        showArrows
        interval={5000}
        showThumbs={false}>
      {data.slides.map(
        ({ type, picture, pictureUrl, width, height, link }, i) => {

          // let url = pictureUrl;
          pictureUrl = pictureUrl.replaceAll('./media', 'https://main--upm--hlxsites.hlx.live/media')
          if(link.href.charAt(0) === '/') link.href = `upm${link.href}`

          return (
            <div key={`slide_${i + 1}`}>
              <Image
                  src={pictureUrl}
                  width={width}
                  height={height}
                  alt={link.text}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  priority={i === 0} />
              {/*<a href={link.href} title={link.text} disabled>*/}
              {/*  <div dangerouslySetInnerHTML={{__html: pictureHtml}} />*/}
              {/*</a>*/}
            </div>
          );
        }
      )}
      </Carousel>
  </>)
}
