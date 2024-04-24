import React, { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const LocationComponent: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const getCurrentLocation = async () => {
    try {
      const permission = await Geolocation.requestPermissions();
      if (permission.location === 'granted') {
        const coordinates = await Geolocation.getCurrentPosition();
        setLocation({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        });
      } else {
        // Handle location permission denied
        console.error('Location permission not granted');
      }
    } catch (e) {
      console.error('Error getting location:', e);
    }
  };

  useEffect(() => {
    getCurrentLocation();
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
