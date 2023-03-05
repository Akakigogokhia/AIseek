import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import Next from '@mui/icons-material/ArrowForwardIos';
import Back from '@mui/icons-material/ArrowBackIos';
import './images.css';
import HorizontalScroll from 'react-horizontal-scrolling';

export default function Images() {
  const {
    prompt,
    imagePage,
    setImagePage,
    imagePageCount,
    images,
    imagesLoading,
  } = useContext(Context);
  const [loaded, setLoaded] = useState(false);

  const changeIndex = (value) => {
    if (value === 1) {
      setImagePage((prev) => Math.min(prev + 1, imagePageCount));
    } else {
      setImagePage((prev) => Math.max(prev - 1, 1));
    }
  };

  useEffect(() => {
    setLoaded(false);
    preloadImages();
  }, [images]);

  function preloadImages() {
    if (images) {
      let loadedImagesCount = 0;
      images.forEach((image) => {
        const img = new Image();
        img.onload = () => {
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            setLoaded(true);
          }
        };
        img.src = image.urls.regular;
      });
    }
  }

  return (
    images &&
    images.length > 0 && (
      <main className='images'>
        {imagesLoading ? (
          <div></div>
        ) : imagesLoading || !loaded ? (
          <div id='fake_container'>
            <div className='images_loading'></div>
            {images.map((image, idx) => {
              return <img key={idx} id='image' src={image.urls.regular}></img>;
            })}
          </div>
        ) : (
          <div id='image_container'>
            <HorizontalScroll>
              {images.map((image, idx) => {
                return (
                  <img key={idx} id='image' src={image.urls.regular}></img>
                );
              })}
            </HorizontalScroll>
          </div>
        )}
        <div className='image_pages'>
          <div className='button' onClick={() => changeIndex(-1)}>
            <Next id='prevImage' />
          </div>
          <div>{imagePage + '/' + imagePageCount}</div>
          <div className='button' onClick={() => changeIndex(1)}>
            <Next id='nextImage' />
          </div>
        </div>
      </main>
    )
  );
}
