"use client"

import Link from "next/link"

const blogs = [
  {
    id: 1,
    title: "In a Celebration of Excellence, Service, and Hope, 11 Teachers Honoured",
    image: "/blog/blog1.jpg",
    link: "/blog/blog1",
  },
  {
    id: 2,
    title: "Meerut Resident Acquitted in Arms Act Case After Being on Bail for 5 Years",
    image: "/blog/blog2.jpg",
    link: "/blog/blog2",
  },
  {
    id: 3,
    title: "Dismissed ASI Gets Life Imprisonment for Nurse’s Murder and Evidence Destruction",
    image: "/blog/blog3.jpg",
    link: "/blog/blog3",
  },
  {
    id: 4,
    title: "Mohali MLA Inaugurates ₹1.68-Crore Redeveloped Pond at Sohana",
    image: "/blog/blog4.jpg",
    link: "/blog/blog4",
  },
  {
    id: 5,
    title: "Mohali Businessman Suicide: Senior Punjab Police Officer Named in FIR",
    image: "/blog/blog5.jpg",
    link: "/blog/blog5",
  },
  {
    id: 6,
    title: "Man Gets 6-Month Jail in Cheque Bounce Case, Ordered to Pay ₹2.5 Lakh",
    image: "/blog/blog6.jpg",
    link: "/blog/blog6",
  },
]

export default function MohaliBlogPage() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mohali Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
              <Link href={blog.link} target="_blank" className="text-blue-600 hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
