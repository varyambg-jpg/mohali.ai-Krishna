'use client';

import { useEffect, useState } from 'react';

type Business = {
  id: number;
  name: string;
  category: string;
  address: string;
  image: string;
  location: {
    lat: number;
    lon: number;
  };
};

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Geolocation error:', error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/businesses');
        const data = await res.json();
        setBusinesses(data);
      } catch (error) {
        console.error('Failed to fetch businesses:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Mohali Businesses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {businesses.map((business) => {
          const directionsUrl = userLocation
            ? `https://maps.openrouteservice.org/directions?n1=${userLocation.lat}&n2=${userLocation.lon}&n3=14&a=${userLocation.lat},${userLocation.lon},${business.location.lat},${business.location.lon}&b=0&c=0&k1=en-US&k2=km`
            : null;

          return (
            <div
              key={business.id}
              className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
            >
              <div className="overflow-hidden">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">{business.name}</h2>
                <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-3 py-1 rounded-full mb-2">
                  {business.category}
                </span>
                <p className="text-gray-600 mb-4">{business.address}</p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${business.location.lat}&mlon=${business.location.lon}#map=18/${business.location.lat}/${business.location.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-2 rounded-lg font-medium transition-all"
                  >
                    View on Map
                  </a>
                  {directionsUrl && (
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white py-2 rounded-lg font-medium transition-all"
                    >
                      Get Directions
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
