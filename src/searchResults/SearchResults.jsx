import React, { useContext, useEffect, useState } from 'react';
import './searchResults.css';
import { Context } from '../Context';
import Next from '@mui/icons-material/ArrowForwardIos';
import Back from '@mui/icons-material/ArrowBackIos';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Mousewheel, Controller } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';

export default function SearchResults() {
  const { nextPage, prevPage, next, setNext, result, resultLoading, prompt } =
    useContext(Context);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    swiper?.slideTo(0);
  }, [prompt, next]);

  const changeIndex = (value) => {
    if (value === 1) {
      if (nextPage) setNext(nextPage);
    } else {
      if (prevPage) setNext(prevPage);
    }
  };

  return result ? (
    <main className='searchResults'>
      <div className='result_container'>
        <Swiper
          slidesPerView={1}
          modules={[Pagination, Mousewheel, Controller]}
          pagination={{ clickable: true }}
          mousewheel={true}
          onSwiper={setSwiper}
        >
          {result.map((res) => (
            <SwiperSlide key={res.link}>
              <div className='search_result'>
                <div className='search_resultUrl'>{res.link}</div>
                <a
                  target='_blank'
                  href={res.link}
                  className='search_resultLink'
                >
                  {res.title}
                </a>
                <div className='description'>{res.snippet}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='result_pages'>
        <Next id='nextResult' onClick={() => changeIndex(-1)} />

        <div>{(next - 1) / 10 + 1 + '/' + 10}</div>

        <Next id='prevResult' onClick={() => changeIndex(1)} />
      </div>
    </main>
  ) : (
    resultLoading && (
      <main className='searchResults'>
        <span className='result_loading'>Loading</span>
      </main>
    )
  );
}
