'use server';

import Link from 'next/link';
import Image from 'next/image';

export default function ArticleList({data, indexData}) {

  return (<>
    {data.articles.map(
      ({ header, content, style }, i) => {
        return (<div key={`section_${content}`} className={style}>
          <div dangerouslySetInnerHTML={{__html: header}} />
          {indexData.map(({path, title, tags, description, image}) => {
            const thisTags = `[\"${content}\"]`
            if(thisTags === tags) {
              return(<div key={`${content}_${path}`}>
                <Link href={`https://main--upm--hlxsites.hlx.live${path}`}>
                  <Image src={`https://main--upm--hlxsites.hlx.live${image}`} width={200} height={100} />
                </Link>
                <h2>{title}</h2>
                <div className="article-link"><Link href={`https://main--upm--hlxsites.hlx.live${path}`}>Read More</Link></div>
              </div>)
            }
          })}
          </div>
        );
      }
    )}
  </>)
}
