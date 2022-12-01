'use server';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
//import './slideshow.css'
import Image from "next/image";
import Link from "next/link";
import CarouselWrapper from "./CarouselWrapper";

export default function Slideshow({data}) {
  return (
    <CarouselWrapper>
      {data.slides.map(
        ({ type, picture, pictureUrl, width, height, link }, i) => {
          pictureUrl = pictureUrl.replaceAll('./media', 'https://main--upm--hlxsites.hlx.live/media')
          if(link.href.charAt(0) === '/') link.href = `upm${link.href}`
          return (
            <div key={`slide_${i + 1}`}>
              <Link href={link.href} title={link.text}>
                <Image
                    src={pictureUrl} width={width} height={height} alt={link.text}
                    loading={i === 0 ? 'eager' : 'lazy'} priority={i === 0} quality={80}/>
              </Link>
            </div>
          );
        }
      )}
      </CarouselWrapper>
  )
}
