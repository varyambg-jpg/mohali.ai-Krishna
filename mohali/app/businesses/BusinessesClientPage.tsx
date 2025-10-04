'use client'
import { useEffect, useState } from 'react'
import { Search, MapPin } from 'lucide-react'

type Business = {
  id: string | number
  name: string
  category: string
  address: string
  image: string
  location: {
    lat: number
    lon: number
  }
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch('/api/businesses')
        const data = await res.json()
        if (Array.isArray(data)) {
          setBusinesses(data)
          setFilteredBusinesses(data)
        } else {
          setError('No businesses found for this area.')
        }
      } catch (err) {
        console.error('Error loading businesses:', err)
        setError('Failed to load businesses')
      }
    }
    fetchBusinesses()
  }, [])

  useEffect(() => {
    const filtered = businesses.filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredBusinesses(filtered)
  }, [searchTerm, businesses])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Businesses in Mohali
      </h1>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search businesses, places, services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm bg-white"
        />
      </div>

      {/* Error / Empty State */}
      {error && <p className="text-red-600 text-center mb-6">{error}</p>}
      {!error && filteredBusinesses.length === 0 && (
        <p className="text-gray-500 text-center mb-6">No businesses match your search.</p>
      )}

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBusinesses.map((business: Business) => (
          <div
            key={business.id}
            className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-1 text-gray-800">{business.name}</h2>
              <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-3 py-1 rounded-full mb-2">
                {business.category}
              </span>
              <p className="text-gray-600 mb-3 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500" /> {business.address}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${business.location.lat}&mlon=${business.location.lon}&zoom=18`,
                    '_blank'
                  )
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-2 rounded-lg font-medium transition-all"
              >
                Open in Map
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
