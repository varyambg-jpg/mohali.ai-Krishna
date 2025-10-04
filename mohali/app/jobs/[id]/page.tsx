"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobApplyPage() {
  const { id } = useParams(); // job id from URL
  const [job, setJob] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [poster, setPoster] = useState<{ email: string; phone: string } | null>(null);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        const found = data.jobs.find((j: any) => j._id === id);
        setJob(found);
      });
  }, [id]);

  const handleApply = async (e: any) => {
    e.preventDefault();
    if (!agree) {
      setMsg(" Please accept disclaimer");
      return;
    }
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("jobId", id);

    const res = await fetch("/api/applications", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setApplied(true);
      setPoster({ email: data.posterEmail, phone: data.posterPhone });
      setMsg(" Application submitted!");
      e.target.reset();
    } else {
      setMsg(" Error submitting application");
    }
    setLoading(false);
  };

  if (!job) return <p className="p-6">Loading job...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="mb-2">{job.company} — {job.location}</p>
      <p className="mb-2"> {job.salary}</p>
      <p className="mb-4">{job.description}</p>

      {!applied ? (
        <>
          <h2 className="text-xl font-bold mb-2">Apply Now</h2>
          <form onSubmit={handleApply} className="space-y-3">
            <input name="name" placeholder="Your Name" className="w-full border p-2" required />
            <input name="email" type="email" placeholder="Your Email" className="w-full border p-2" required />
            <input name="phone" placeholder="Your Phone" className="w-full border p-2" required />
            <input name="cv" type="file" className="w-full border p-2" required />

           <label className="flex items-center">
    <input
      type="checkbox"
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
      className="mr-2"
    />
    I agree to the{" "}
    <a href="/disclaimer" target="_blank" className="text-blue-600 underline ml-1">
      Disclaimer
    </a>
  </label>


            <button
              type="submit"
              disabled={loading || !agree}
              className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
          {msg && <p className="mt-3 text-green-600">{msg}</p>}
        </>
      ) : (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-bold text-lg">Application Submitted!</h2>
          <p className="mt-2">You can contact the job poster:</p>
          <p> {poster?.email}</p>
          <p> {poster?.phone}</p>
        </div>
      )}
    </div>
  );
}
