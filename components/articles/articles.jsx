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
            const eagerImage = path.includes('up-pgh-covid-19-bayanihan-na-operations-center');
            if(thisTags === tags) {
              return(<div key={`${content}_${path}`}>
                <Link href={`upm${path}`}>
                  <Image src={`https://main--upm--hlxsites.hlx.live${image}`}
                         width={200}
                         height={100}
                         //sizes={'(max-width: 600px) 80vw, 200px'}
                         loading={ eagerImage ? 'eager' : 'lazy'}
                         priority={eagerImage}
                         quality={30}
                  />
                </Link>
                {content != 'banner' && <h2>{title}</h2>}
                {content != 'banner' && <div className="article-link"><Link href={`upm${path}`}>Read More</Link></div>}
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
