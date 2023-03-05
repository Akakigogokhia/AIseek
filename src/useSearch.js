import { useEffect, useState } from 'react';

const BASE_URL = 'https://customsearch.googleapis.com/customsearch/v1';
const ENGINE_ID = '84a584c70f2c145e8';
const URL = `${BASE_URL}?key=${process.env.REACT_APP_GOOGLE_KEY}&cx=${ENGINE_ID}`;

export const useSearch = (searchTerm, next) => {
  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [error, setError] = useState(null);
  const [prev, setPrev] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) return;
      if (prev != searchTerm && next != 1) return;
      else setPrev(searchTerm);
      setResultLoading(true);

      try {
        const response = await fetch(`${URL}&q=${searchTerm}&start=${next}`);
        const responseData = await response.json();
        setResult(responseData.items);

        setPrevPage(
          responseData.queries.previousPage
            ? responseData.queries.previousPage[0].startIndex
            : null
        );

        setNextPage(
          responseData.queries.nextPage
            ? responseData.queries.nextPage[0].startIndex
            : null
        );

        setResultLoading(false);
      } catch (error) {
        setError(error);
        setResultLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, next]);

  return {
    nextPage,
    prevPage,
    result,
    resultLoading,
    error,
  };
};
