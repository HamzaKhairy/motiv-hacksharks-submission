import React, { useEffect, useState } from 'react';
import { getCurrentLocation } from '../services/locationService';

interface Location {
  latitude: number;
  longitude: number;
}

const LocationComponent: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    getCurrentLocation().then(setLocation);
  }, []);

  return (
    <div>
      {location ? (
        <p>Location: Latitude {location.latitude}, Longitude {location.longitude}</p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default LocationComponent;
