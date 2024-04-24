import { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

/**
 * Custom hook for fetching data from a specified URL.
 * @template T The type of data to be fetched.
 * @param {string} url The URL to fetch the data from.
 * @returns {Object} An object containing the fetched data, loading state, and error message.
 */
const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const urlBase = 'http://127.0.0.1:8080'

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData<T>(urlBase + url);
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
