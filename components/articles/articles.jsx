'use server';

import Link from 'next/link';
import Image from 'next/image';
import './articles.css'

export default function Articles({data, indexData}) {

  return (<div className='articles-wrapper'>
    <div className='articles'>
    {data.articles.map(
      ({ header, content, style }, i) => {
        return (<div key={`section_${content}`} className={`article-column ${style}`}>
          <div dangerouslySetInnerHTML={{__html: header}} />
          {indexData.map(({path, title, tags, description, image}) => {
            const thisTags = `[\"${content}\"]`;
            //if image string contains "image" then is eager
            const eagerImage = style == 'banner-style' && (
                path.includes('up-pgh-covid-19-bayanihan-na-operations-center') ||
                path.includes('up-manila-covid-19-updates') ||
                path.includes('give-to-up'));
            // const eagerImage = style === 'banner-style' && i < 3;
            if(thisTags === tags) {
              let sizes = '100vw';
              switch (style) {
                case 'banner-style': sizes = '(max-width: 700px) 80vw, 250px'; break;
                case 'article-style': sizes = '10vw'; break;
                case 'article-style article-gray': sizes = '10vw'; break;
              }

              return(<div key={`${content}_${path}`}>
                <Link href={`upm${path}`} title={title ? title : 'missing title'}>
                  <Image src={`https://main--upm--hlxsites.hlx.live${image}`}
                         alt={title ? title : 'missing title'}
                         width={250}
                         height={100}
                         sizes={sizes}
                         loading={ eagerImage ? 'eager' : 'lazy'}
                         priority={eagerImage}
                         quality={10}
                  />
                </Link>
                {content != 'banner' && <h2>{title}</h2>}
                {content != 'banner' && <div className="article-link"><Link href={`upm${path}`} title={title ? title : 'missing title'}>Read More</Link></div>}
              </div>)
            }
          })}
          </div>
        );
      }
    )}
  </div>
  </div>)
}
