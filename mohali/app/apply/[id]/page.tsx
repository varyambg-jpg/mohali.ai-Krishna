"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ApplyPage() {
  const { id } = useParams()
  const [job, setJob] = useState<any>(null)
  const [applied, setApplied] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", disclaimer: false })

  useEffect(() => {
    fetch("/api/jobs").then((res) => res.json()).then((jobs) => {
      setJob(jobs.find((j: any) => j.id === id))
    })
  }, [id])

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!form.disclaimer) {
      alert("Please accept the disclaimer")
      return
    }
    const res = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, jobId: id }) })
    const data = await res.json()
    if (data.success) setApplied(true)
  }

  if (!job) return <p>Loading...</p>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p>{job.description}</p>

      {!applied ? (
        <form onSubmit={handleSubmit} className="border p-4 rounded mt-4">
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="border p-2 w-full mb-2" required />
          <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="border p-2 w-full mb-2" required />
          <input name="phone" placeholder="Your Phone" value={form.phone} onChange={handleChange} className="border p-2 w-full mb-2" required />

          <label className="flex items-center space-x-2">
            <input type="checkbox" name="disclaimer" checked={form.disclaimer} onChange={handleChange} />
            <span>I agree to the <a href="/disclaimer" target="_blank" className="text-blue-500">disclaimer</a></span>
          </label>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">Apply</button>
        </form>
      ) : (
        <div className="mt-4 border p-4 rounded">
          <h2 className="font-semibold">Your application was submitted.</h2>
          <p>Contact {job.posterName} at {job.posterPhone}</p>
          <a href={`tel:${job.posterPhone}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Call</a>
          <a href={`https://wa.me/${job.posterPhone}`} target="_blank" className="bg-green-500 text-white px-3 py-1 rounded">WhatsApp</a>
        </div>
      )}
    </div>
  )
}
