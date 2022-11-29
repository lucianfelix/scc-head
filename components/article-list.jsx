import Link from 'next/link';
import Image from 'next/image';
import articlesData from './articles-data';

async function fetchArticles(indexFile, pageSize = 500, offset = 0) {
  const results = await Promise.all(articlesData.articles.map(async (articleType) => {
    const resp = await fetch(`https://main--upm--hlxsites.hlx.live/${indexFile}.json?limit=${pageSize}&offset=${offset}`)
    const response = await resp.json()
    console.log(response)
    const tags = `[\"${articleType.content}\"]`
    const articleList = await response.data.filter(x => x.tags === tags)
    console.log(articleList)
    return {
      header: articleType.header,
      content: articleType.content,
      style: articleType.style,
      articles: articleList
    }
  }));

  return results
}

export default async function ArticleList({data}) {
  //const articlesList = await fetchArticles('query-index')
  const articlesList = data;

  return (<>
    {articlesList.map(
      ({ header, content, style, articles }, i) => {
        return (<div key={`section_${content}`} className={style}>
          <div dangerouslySetInnerHTML={{__html: header}} />
          {articles.map(({path, title, tags, description, image}) => {
            return(<div key={`${content}_${path}`}>
              <Link href={`https://main--upm--hlxsites.hlx.live${path}`}>
                <Image src={`https://main--upm--hlxsites.hlx.live${image}`} width={200} height={100} />
              </Link>
              
              <h2>{title}</h2>
              <div className="article-link"><Link href={`https://main--upm--hlxsites.hlx.live${path}`}>Read More</Link></div>
            </div>)
          })}
          </div>
        );
      }
    )}
  </>)
}
