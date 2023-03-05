import React, { useContext } from 'react';
import './footer.css';
import Next from '@mui/icons-material/ArrowForwardIos';
import Back from '@mui/icons-material/ArrowBackIos';
import { Context } from '../Context';

export default function Footer() {
  const { wallpaper, setWallpaper } = useContext(Context);
  return (
    <main className='footer'>
      <div className='change_wallpaper'>
        <Back
          style={{ width: '20px', pointerEvents: wallpaper == 1 && 'none' }}
          className='change'
          onClick={() => {
            setWallpaper((prev) => Math.max(prev - 1, 1));
          }}
        />
        <Next
          style={{ width: '20px', pointerEvents: wallpaper == 16 && 'none' }}
          className='change'
          onClick={() => {
            setWallpaper((prev) => Math.min(prev + 1, 16));
          }}
        />
      </div>
      <div className='footer_copyright'>© 2023 Akaki Gogokhia</div>
    </main>
  );
}
