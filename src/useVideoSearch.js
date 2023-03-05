import { useEffect, useState } from 'react';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const URL = `${BASE_URL}?key=${process.env.REACT_APP_YOUTUBE_KEY}&part=snippet&type=video&regionCode=UK&maxResults=50`;

export const useVideoSearch = (searchTerm) => {
  const [videos, setVideos] = useState(null);
  const [videosLoading, setVideosLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) return;
      setVideosLoading(true);
      try {
        const response = await fetch(`${URL}&q=${searchTerm}`);
        const responseData = await response.json();
        setVideos(responseData.items);
        setVideosLoading(false);
      } catch (error) {
        setError(error);
        setVideosLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  return {
    videos,
    videosLoading,
    error,
  };
};
