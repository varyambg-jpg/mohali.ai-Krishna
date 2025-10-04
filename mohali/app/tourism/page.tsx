'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

type Attraction = {
  id: number;
  name: string;
  description: string;
  image: string;
  lat: number;
  lon: number;
  address: string;
  category: string;
};

export default function TourismPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tourism")
      .then((res) => res.json())
      .then((data) => setAttractions(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 via-yellow-600 to-green-400 min-h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('/assam-tourism.jpg')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Explore <span className="text-yellow-400">Assam</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto">
            Discover the most beautiful tourist spots, attractions, and experiences in Assam.
          </p>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Attractions</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading attractions...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {attractions.map((attraction) => (
                <Card
                  key={attraction.id}
                  className="hover:shadow-2xl transition-all rounded-2xl overflow-hidden"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                    <p className="text-gray-600 mb-2">{attraction.description}</p>
                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {attraction.address}
                    </p>

                    {/* Map and Direction Buttons */}
                    <div className="mt-auto flex flex-wrap gap-3">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lon}&travelmode=driving`}
                        target="_blank"
                        className="text-sm px-4 py-2 rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:brightness-110 hover:scale-105 transform transition-all duration-200"
                      >
                        Car
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lon}&travelmode=transit`}
                        target="_blank"
                        className="text-sm px-4 py-2 rounded-full shadow-md text-white bg-gradient-to-r from-green-400 to-green-600 hover:brightness-110 hover:scale-105 transform transition-all duration-200"
                      >
                        Bus
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lon}&travelmode=bicycling`}
                        target="_blank"
                        className="text-sm px-4 py-2 rounded-full shadow-md text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:brightness-110 hover:scale-105 transform transition-all duration-200"
                      >
                        Bike
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lon}&travelmode=walking`}
                        target="_blank"
                        className="text-sm px-4 py-2 rounded-full shadow-md text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:brightness-110 hover:scale-105 transform transition-all duration-200"
                      >
                        Walk
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
