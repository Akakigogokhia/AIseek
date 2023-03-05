import React, { useContext, useEffect, useState } from 'react';
import './video.css';
import Next from '@mui/icons-material/ArrowForwardIos';
import { Context } from '../Context';

export default function Video() {
  const { prompt, videos, videosLoading } = useContext(Context);
  const [index, setIndex] = useState(0);
  const base_url = 'https://www.youtube.com/';

  const changeIndex = (value) => {
    if (value === 1) {
      setIndex(Math.min(index + 1, videos.length - 1));
    } else {
      setIndex(Math.max(index - 1, 0));
    }
  };

  useEffect(() => {
    setIndex(0);
  }, [prompt]);
  return videos ? (
    <main className='video'>
      <div className='button_prev' onClick={() => changeIndex(-1)}>
        <Next id='prevVid' />
      </div>

      <div className='video_container'>
        <iframe
          id='ytplayer'
          type='text/html'
          allow='fullscreen'
          src={`${base_url}embed/${videos[index]?.id.videoId}?controls=1&modestbranding=1`}
        ></iframe>
      </div>
      <div className='button_next' onClick={() => changeIndex(1)}>
        <Next id='nextVid' />
      </div>
      <div className='video_pages'>
        <div className='button' onClick={() => changeIndex(-1)}>
          <Next id='prevVid' />
        </div>
        <div>{index + 1 + '/' + videos.length}</div>
        <div className='button' onClick={() => changeIndex(1)}>
          <Next id='nextVid' />
        </div>
      </div>
    </main>
  ) : (
    <main className=''></main>
  );
}
