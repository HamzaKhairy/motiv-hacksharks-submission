/**
 * Fetches data from the specified URL.
 * 
 * @param url - The URL to fetch the data from.
 * @returns A promise that resolves to the fetched data.
 * @throws An error if the network response is not ok.
 * @template T - The type of the fetched data.
 */
// export const fetchData = async <T>(url: string): Promise<T> => {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data: T = await response.json();
//     return data;
//   };

export const fetchData = async <T>(url: string, method: string = 'GET', body?: any): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: T = await response.json();
  return data;
};
