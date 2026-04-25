import { useState, useEffect } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  error: string | null;
  loading: boolean;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    city: 'Detecting...',
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: 'Geolocation not supported', loading: false }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding (optional, can use a free service like Nominatim or Google Maps API)
          // For now, we'll just set the coordinates and a placeholder for city
          setLocation({
            latitude,
            longitude,
            city: 'Near Kitale', // Defaulting for the demo or fetching via API
            error: null,
            loading: false,
          });
        } catch (err) {
          setLocation(prev => ({ ...prev, error: 'Failed to get city name', loading: false }));
        }
      },
      (error) => {
        setLocation(prev => ({ ...prev, error: error.message, loading: false, city: 'Kitale Hub (Default)' }));
      }
    );
  }, []);

  return location;
}
