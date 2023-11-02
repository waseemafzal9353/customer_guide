import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        const jsonResponse = await response.json();
        setData(jsonResponse);

        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataFromApi();
  }, [url, options]);
  return { data, error, isLoading };
};

export default useFetch;
