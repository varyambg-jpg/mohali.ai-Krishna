"use client";

import { useEffect, useState } from "react";

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Mohali Latest News</h1>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <div
              key={i}
              className="flex flex-col h-full bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              {a.image && (
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              )}

              <div className="flex flex-col flex-1 p-4">
                <h2 className="text-xl font-semibold mb-2">{a.title}</h2>

                <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{a.source}</span>
                  <span>{new Date(a.publishedAt).toLocaleDateString()}</span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{a.description}</p>

                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transform transition-all duration-200"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
