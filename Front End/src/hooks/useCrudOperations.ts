import { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';
import { urlBase } from '../utilities/utils';

const useCreateData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createData = async (body: any) => {
    setLoading(true);
    try {
      const result = await fetchData<T>(urlBase + url, 'POST', body);
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

  return { createData, data, loading, error };
};

const useReadData = <T>(url: string, condition: boolean = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url || !condition) {
      setLoading(false);
      return;
    }

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



const userUpdateData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createData = async (body: any) => {
    setLoading(true);
    try {
      const result = await fetchData<T>(urlBase + url, 'PUT', body);
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

  return { createData, data, loading, error };
};

const useDeleteData = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async () => {
    setLoading(true);
    try {
      await fetchData<void>(urlBase + url, 'DELETE');
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

  return { deleteData, loading, error };
};



export {
  useCreateData,
  useReadData,
  userUpdateData,
  useDeleteData
};
