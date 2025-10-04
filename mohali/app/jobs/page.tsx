'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [newJob, setNewJob] = useState<any>({});
  const [applyStates, setApplyStates] = useState<{ [key: string]: any }>({});
  const [cvFiles, setCvFiles] = useState<{ [key: string]: File | null }>({});
  const [message, setMessage] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);

      const initialApply: { [key: string]: any } = {};
      data.forEach((job: any) => {
        initialApply[job._id] = { name: "", email: "", phone: "", disclaimer: false };
      });
      setApplyStates(initialApply);
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const postJob = async () => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Job Posted Successfully!");
        setJobs(prev => [...prev, { ...newJob, _id: data.jobId }]);
        setNewJob({});
        setApplyStates(prev => ({ ...prev, [data.jobId]: { name: "", email: "", phone: "", disclaimer: false } }));
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to post job.");
    }
  };

  const deleteJob = async (id: string) => {
    const pass = prompt("Enter admin password:");
    if (!pass) return;
    try {
      const res = await fetch(`/api/jobs?id=${id}&admin_pass=${pass}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage("Job Deleted");
        setJobs(prev => prev.filter(j => j._id !== id));
        setTimeout(() => setMessage(""), 3000);
      } else alert(data.error);
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete job.");
    }
  };

  const handleApplyChange = (jobId: string, field: string, value: any) => {
    setApplyStates(prev => ({ ...prev, [jobId]: { ...prev[jobId], [field]: value } }));
  };

  const handleCvChange = (jobId: string, file: File | null) => {
    setCvFiles(prev => ({ ...prev, [jobId]: file }));
  };

  const handleApplySubmit = async (jobId: string) => {
    const localApply = applyStates[jobId];
    if (!localApply.disclaimer) { alert("Please accept disclaimer"); return; }

    let cvUrl = "";
    if (cvFiles[jobId]) {
      const fd = new FormData();
      fd.append("file", cvFiles[jobId]!);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) { alert("CV upload failed"); return; }
      cvUrl = data.url;
    }

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...localApply, cvUrl, jobId, disclaimer: true }),
    });

    const result = await res.json();
    if (result.success) {
      alert(`Application submitted!\nPoster: ${result.posterContact.email}, ${result.posterContact.phone}`);
      setApplyStates(prev => ({ ...prev, [jobId]: { name: "", email: "", phone: "", disclaimer: false } }));
      setCvFiles(prev => ({ ...prev, [jobId]: null }));
    } else alert(result.error || "Failed to submit application");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Mohali Job Portal</h1>
      {message && <div className="p-3 bg-green-200 text-green-900 rounded mb-6 text-center">{message}</div>}

      {/* Post Job Card */}
      <Card className="mb-12 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Briefcase className="w-6 h-6" /> Post a Job</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Title" value={newJob.title||""} onChange={e=>setNewJob({...newJob,title:e.target.value})} className="border p-2 rounded w-full"/>
            <input placeholder="Company" value={newJob.company||""} onChange={e=>setNewJob({...newJob,company:e.target.value})} className="border p-2 rounded w-full"/>
            <input placeholder="Location" value={newJob.location||""} onChange={e=>setNewJob({...newJob,location:e.target.value})} className="border p-2 rounded w-full"/>
            <input placeholder="Salary" value={newJob.salary||""} onChange={e=>setNewJob({...newJob,salary:e.target.value})} className="border p-2 rounded w-full"/>
            <input placeholder="Email" value={newJob.contactEmail||""} onChange={e=>setNewJob({...newJob,contactEmail:e.target.value})} className="border p-2 rounded w-full"/>
            <input placeholder="Phone" value={newJob.contactPhone||""} onChange={e=>setNewJob({...newJob,contactPhone:e.target.value})} className="border p-2 rounded w-full"/>
            <textarea placeholder="Description" value={newJob.description||""} onChange={e=>setNewJob({...newJob,description:e.target.value})} className="border p-2 rounded w-full col-span-2"/>
          </div>
          <button onClick={postJob} className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transform transition-all">
            Post Job
          </button>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map(job => (
          <Card key={job._id} className="shadow-lg rounded-2xl hover:shadow-2xl transition-all">
            <CardContent className="p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-1 text-gray-800">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
              <p className="text-gray-700 mb-2">{job.description}</p>
              <p className="font-medium text-gray-800 mb-3">Salary: {job.salary}</p>

              {/* Apply Form */}
              <div className="mt-auto flex flex-wrap gap-3">
                <input placeholder="Name" value={applyStates[job._id]?.name || ""} onChange={e => handleApplyChange(job._id, "name", e.target.value)} className="border p-2 rounded w-full"/>
                <input placeholder="Email" value={applyStates[job._id]?.email || ""} onChange={e => handleApplyChange(job._id, "email", e.target.value)} className="border p-2 rounded w-full"/>
                <input placeholder="Phone" value={applyStates[job._id]?.phone || ""} onChange={e => handleApplyChange(job._id, "phone", e.target.value)} className="border p-2 rounded w-full"/>
                <input type="file" onChange={e => handleCvChange(job._id, e.target.files?.[0] || null)} className="border p-2 rounded w-full"/>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={applyStates[job._id]?.disclaimer || false} onChange={e => handleApplyChange(job._id, "disclaimer", e.target.checked)} />
                  I agree to <Link href="/disclaimer" className="text-blue-600 underline" target="_blank">terms</Link>
                </label>
                <button onClick={() => handleApplySubmit(job._id)} className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full hover:scale-105 transform transition-all shadow-md w-full">
                  Apply
                </button>
              </div>

              <button onClick={() => deleteJob(job._id)} className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full hover:scale-105 transform transition-all shadow-md w-full">
                Delete
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
