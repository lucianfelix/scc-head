'use server';

//import data from './slideshow-data'

export default function Slideshow({data}) {

  return (<>
  {/* <div className="section slideshow-container" data-section-status="loaded">
    <div className="slideshow-wrapper">
    <div className="slideshow block" data-block-name="slideshow" data-block-status="loaded" role="group" aria-roledescription="carousel">
    <div className="slides-container" style={{transform: 'translateX(-100vw)'}}> */}
      {data.slides.map(
        ({ type, picture, link }, i) => {
          const pictureHtml = picture.replaceAll('./media', 'https://main--upm--hlxsites.hlx.live/media')
          if(link.href.charAt[0] === '/') link.href = `https://main--upm--hlxsites.hlx.live${link.href}`
          const num_slides = data.slides.length
          return (
            <div key={`slide_${i + 1}`} role="tabpanel" aria-roledescription="slide" aria-label={`Slide ${i + 1} of ${num_slides}`} aria-hidden={false} disabled={false}>
              <div>
                <a href={link.href} title={link.text} disabled>
                  <div dangerouslySetInnerHTML={{__html: pictureHtml}} />
                </a>
              </div>
            </div>
          );
        }
      )}
    {/* </div>
    </div>
    </div>
  </div> */}
  </>)
}