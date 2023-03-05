import { useEffect, useState } from 'react';

export const useImageSearch = (searchTerm, page, extra) => {
  const [images, setImages] = useState(null);
  const [imagesLoading, setImagesLoading] = useState(null);
  const [error, setError] = useState(null);
  const [imagePageCount, setImagePageCount] = useState(null);
  const BASE_URL = 'https://api.unsplash.com/search/photos/';

  const URL = `${BASE_URL}?client_id=${process.env.REACT_APP_UNSPLASH_KEY}&query=${searchTerm}&per_page=30`;
  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) return;
      setImagesLoading(true);

      try {
        const response = await fetch(
          `${URL}&q=${searchTerm}&page=${page}${extra}`
        );
        const responseData = await response.json();
        setImages(responseData.results);
        setImagePageCount(responseData.total_pages);

        setImagesLoading(false);
      } catch (error) {
        setError(error);
        setImagesLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, page]);

  return {
    images,
    imagesLoading,
    error,
    imagePageCount,
  };
};
