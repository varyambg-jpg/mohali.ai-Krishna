"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Building, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const quickStats = [
    { label: "Local Businesses", value: "500+", icon: Building },
    { label: "Tourist Spots", value: "50+", icon: MapPin },
    { label: "Properties", value: "1000+", icon: Building },
    { label: "Monthly Events", value: "200+", icon: Calendar },
  ];

  const galleryImages = [
    { src: "/gallery/a.png", location: "Pont du Gard" },
    { src: "/gallery/b.png", location: "Rock Garden" },
    { src: "/gallery/c.png", location: "Old Fort" },
    { src: "/gallery/d.png", location: "Heritage Site" },
    { src: "/gallery/e.png", location: "Sukhna Lake" },
    { src: "/gallery/f.png", location: "Rock Garden" },
    { src: "/gallery/g.png", location: "Zakir Hussain Rose Garden" },
    { src: "/gallery/h.png", location: "Gandhi Bhawan" },
    { src: "/gallery/i.png", location: "Nek Chand Saini's Rock Garden" },
    { src: "/gallery/j.png", location: "Sukhana Lake" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 h-[70vh] flex items-center justify-center text-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-20 animate-pulse-slow"></div>
  <div className="absolute inset-0 bg-[url('/karnal-city.jpg')] bg-cover bg-center mix-blend-overlay"></div>

  <div className="relative z-10 max-w-3xl px-4">
    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
      Discover <span className="text-yellow-400">Mohali</span>
    </h1>
    <p className="text-base md:text-lg text-white/90 mb-6">
      Your guide to businesses, tourism, and events in Mohali
    </p>

    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-4 h-5 w-5 text-gray-300" />
        <Input
          placeholder="Search businesses, places, services..."
          className="w-full pl-12 py-4 text-lg rounded-full shadow-lg bg-white/90 backdrop-blur-sm"
        />
      </div>
      <Button className="w-full sm:w-auto px-6 py-4 text-lg rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400 text-white shadow-xl transform hover:scale-105 transition-all">
        Search
      </Button>
    </div>
  </div>
</section>


      {/* Quick Stats Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center hover:scale-105"
                >
                  <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-gray-700">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Explore Mohali in Pictures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={img.src}
                  alt={`Gallery Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <p className="text-center text-gray-600 text-sm mt-2 mb-3">
                  {img.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/tourism">
              <Card className="hover:shadow-2xl transition-all h-full bg-white/40 backdrop-blur-md rounded-2xl">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Explore Tourism</h3>
                  <p className="text-muted-foreground text-sm">Discover attractions and places to visit</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/businesses">
              <Card className="hover:shadow-2xl transition-all h-full bg-white/40 backdrop-blur-md rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Building className="h-12 w-12 text-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Business</h3>
                  <p className="text-muted-foreground text-sm">Businesses in Mohali</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/events">
              <Card className="hover:shadow-2xl transition-all h-full bg-white/40 backdrop-blur-md rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Events</h3>
                  <p className="text-muted-foreground text-sm">Stay updated with local happenings</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/about">
              <Card className="hover:shadow-2xl transition-all h-full bg-white/40 backdrop-blur-md rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">About</h3>
                  <p className="text-muted-foreground text-sm">Modern city with thriving opportunities</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
