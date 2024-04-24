interface Location {
  latitude: number;
  longitude: number;
}

export const getCurrentLocation = async (): Promise<Location> => {
  // Example: New York City
  const location: Location = {
    latitude: 40.712776,
    longitude: -74.005974,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(location);
    }, 1000); // 1 second delay
  });
};
