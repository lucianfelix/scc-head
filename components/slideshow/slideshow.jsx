'use client';

import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './slideshow.css'

export default function Slideshow({data}) {

  return (<>
    <Carousel autoPlay showArrows showThumbs={false}>
      {data.slides.map(
        ({ type, picture, link }, i) => {
          const pictureHtml = picture.replaceAll('./media', 'https://main--upm--hlxsites.hlx.live/media')
          if(link.href.charAt(0) === '/') link.href = `upm${link.href}`
          const num_slides = data.slides.length
          return (
            <div key={`slide_${i + 1}`}>
              <a href={link.href} title={link.text} disabled>
                <div dangerouslySetInnerHTML={{__html: pictureHtml}} />
              </a>
            </div>
          );
        }
      )}
      </Carousel>
  </>)
}
