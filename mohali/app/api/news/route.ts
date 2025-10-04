// /app/api/news/route.ts

import { NextResponse } from "next/server"

export async function GET() {
  try {
    if (!process.env.NEWS_API_KEY) {
      console.error("NEWS_API_KEY not found in .env.local")
      return NextResponse.json(
        { error: "API key missing" },
        { status: 500 }
      )
    }

    const res = await fetch(
      `https://newsapi.org/v2/everything?q=mohali&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    )

    if (!res.ok) {
      const errorText = await res.text()
      console.error("NewsAPI Error:", errorText)
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 }
      )
    }

    const data = await res.json()

    return NextResponse.json({
      articles: data.articles?.map((a: any) => ({
        title: a.title,
        url: a.url,
        source: a.source.name,
        publishedAt: a.publishedAt,
        image: a.urlToImage,
      })),
    })
  } catch (err) {
    console.error("API route error:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
