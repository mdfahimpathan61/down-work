import React, { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Plus,
  BriefcaseBusiness,
} from "lucide-react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../Component/Loading";

const demoJobs = [
  {
    _id: "job-1",
    title: "Frontend Developer",
    location: "Dhaka, Bangladesh",
    job_type: "Full Time",
    posted_date: "2026-08-07",
    status: "Open",
    vacancy: 2,
  },
  {
    _id: "job-2",
    title: "React Developer",
    location: "Dhaka, Bangladesh",
    job_type: "Full Time",
    posted_date: "2026-08-06",
    status: "Open",
    vacancy: 3,
  },
  {
    _id: "job-3",
    title: "UI/UX Designer",
    location: "Chattogram, Bangladesh",
    job_type: "Full Time",
    posted_date: "2026-08-03",
    status: "Draft",
    vacancy: 1,
  },
  {
    _id: "job-4",
    title: "Backend Developer",
    location: "Dhaka, Bangladesh",
    job_type: "Contract",
    posted_date: "2026-07-28",
    status: "Closed",
    vacancy: 2,
  },
];



export default function MyJobs() {
  const navigate = useNavigate();
  const {activeUser,loading,setLoading} = useAuth()

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [nojobText, setNoJobText] = useState("You have not create any job yet!")


  useEffect(() => {
    fetch(`http://localhost:3000/myjobs?email=${activeUser.email}`)
    .then(res => res.json())
     .then(data => {
      setJobs(data)
      
      console.log(data)
     })
  }, [activeUser])

  const filteredJobs = useMemo(() => {
    if(jobs){
      return jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || job.status === status;
        setNoJobText("Try changing your search or filter.")
      return matchesSearch && matchesStatus;
    });
    }
    else{
      
      return []
    }
  }, [jobs, search, status]);

  const handleView = (jobId) => {
    navigate(`/details/job/${jobId}`);
  };

  const handleUpdate = (jobId) => {
    navigate(`/client/update/job/${jobId}`);
  };

  const handleDelete = (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    setJobs((prev) =>
      prev.filter((job) => job._id !== jobId)
    );
  };

  const getStatusStyle = (jobStatus) => {
    if (jobStatus === "open") {
      return "bg-green-100 text-green-700";
    }

    

    if (jobStatus === "hired") {
      return "bg-slate-200 text-slate-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <>
      {
        loading ? <Loading></Loading> :
         (<div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
              <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      My Job Posts
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage all jobs you have posted.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/client/postjob")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary"
                  >
                    <Plus size={17} />
                    Post New Job
                  </button>
                </div>

                {/* Summary */}
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  <SummaryCard label="Total Jobs" value={jobs.length} />

                  <SummaryCard
                    label="Open Jobs"
                    value={
                      jobs.filter((job) => job?.status.toLowerCase() === "open")
                        .length
                    }
                  />

                  <SummaryCard
                    label="Draft Jobs"
                    value={jobs.filter((job) => job.status === "draft").length}
                  />
                </div>

                {/* Table Card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {/* Filters */}
                  <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-sm">
                      <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </div>

                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="All">All Status</option>
                      <option value="open">Open</option>
                      <option value="hired">Hired</option>
                    </select>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <Th>Job</Th>
                          <Th>Type</Th>
                          <Th>Vacancy</Th>
                          <Th>Posted Date</Th>
                          <Th>Status</Th>
                          <Th className="text-right">Actions</Th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredJobs.map((job) => (
                          <tr
                            key={job._id}
                            className="transition hover:bg-slate-50/70"
                          >
                            {/* Job */}
                            <td className="px-5 py-4">
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                  <BriefcaseBusiness size={18} />
                                </div>

                                <div>
                                  <button
                                    onClick={() => handleView(job._id)}
                                    className="text-left text-sm font-semibold text-slate-900 transition hover:text-primary"
                                  >
                                    {job.title}
                                  </button>

                                  <p className="mt-1 text-xs text-slate-500">
                                    {job.location.address}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Type */}
                            <td className="px-5 py-4 text-sm text-slate-600">
                              {job.job_type}
                            </td>

                            {/* Vacancy */}
                            <td className="px-5 py-4 text-sm text-slate-600">
                              {job.vacancy}
                            </td>

                            {/* Posted */}
                            <td className="px-5 py-4 text-sm text-slate-600">
                              {formatDate(job.posted_date)}
                            </td>

                            {/* Status */}
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                                  job.status.toLocaleLowerCase()
                                )}`}
                              >
                                {job.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleView(job._id)}
                                  title="View job"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-primary/80 hover:bg-primary/10 hover:text-primary"
                                >
                                  <Eye size={16} />
                                </button>

                                <button
                                  onClick={() => handleUpdate(job._id)}
                                  title="Edit job"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                                >
                                  <Pencil size={16} />
                                </button>

                                <button
                                  onClick={() => handleDelete(job._id)}
                                  title="Delete job"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                {filteredJobs.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-14 text-center"
                    >
                      <p className="text-sm font-medium text-slate-700">
                        No jobs found
                      </p>

                       <p className="mt-1 text-sm text-slate-400">
                        {nojobText}
                      </p> 

                      
                      
                      {
                        console.log(jobs)
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-5 py-4">
            <p className="text-sm text-slate-500">
              Showing {filteredJobs.length} of{" "}
              {jobs.length} jobs
            </p>
          </div>
        </div>
      </div>
        </div>) 
        

        
      }
    </>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th
      className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${className}`}
    >
      {children}
    </th>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  );
}