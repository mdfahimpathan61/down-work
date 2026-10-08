import React, { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiEye,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { Link, useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";

const Myappliedjobs = () => {
    const [applicationsData,setApplicationsData]  = useState([])
  

  const {activeUser} = useAuth()
  console.log(activeUser)

  useEffect(() => {
    if(!activeUser){
        return
    }

    fetch(`http://localhost:3000/myappliedjobs?email=${activeUser.email}`,{
      headers : {
        authorization : `Bearer ${activeUser.accessToken}`
      
      }
    })
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        setApplicationsData(data)
    })
  },[activeUser])

  const applications = Array.isArray(applicationsData)
    ? applicationsData
    : [];

  return (
    <div className="min-h-screen bg-base-200 px-3 py-6 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FiBriefcase className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
                My Applied Jobs
              </h1>

              <p className="mt-1 text-sm text-base-content/60">
                Jobs you have applied for
              </p>
            </div>

          </div>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

          <SummaryCard
            title="Total Applied"
            value={applications.length}
          />

          <SummaryCard
            title="Pending"
            value={
              applications.filter(
                (application) =>
                  application?.status === "pending"
              ).length
            }
          />

          <SummaryCard
            title="Hired"
            value={
              applications.filter(
                (application) =>
                  application?.status === "hired"
              ).length
            }
          />
          <SummaryCard
            title="Rejected"
            value={
              applications.filter(
                (application) =>
                  application?.status === "rejected"
              ).length
            }
          />

        </div>

        {/* ================= DESKTOP TABLE ================= */}

        <div className="hidden overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm md:block">

          {applications.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-base-300 bg-base-200/60">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-base-content/60">
                      Job
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-base-content/60">
                      Company
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-base-content/60">
                      Location
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-base-content/60">
                      Applied Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-base-content/60">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-base-content/60">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-base-300">

                  {applications.map((application) => {

                    const job = application?.job;

                    return (
                      <tr
                        key={application?._id}
                        className="transition hover:bg-base-200/40"
                      >

                        {/* JOB */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-base-300 bg-base-100">

                              {job?.company?.logo ? (
                                <img
                                  src={job.company.logo}
                                  alt={job?.company?.name || "Company"}
                                  className="h-full w-full object-contain"
                                />
                              ) : (
                                <FiBriefcase className="text-base-content/40" />
                              )}

                            </div>

                            <div className="min-w-0">

                              <h3 className="max-w-[220px] truncate font-semibold text-base-content">
                                {job?.title || "Unknown Job"}
                              </h3>

                              <p className="mt-1 text-xs text-base-content/50">
                                {job?.job_type || "Job"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* COMPANY */}

                        <td className="px-5 py-5">

                          <p className="text-sm font-medium text-base-content">
                            {job?.company?.name || "Unknown Company"}
                          </p>

                        </td>

                        {/* LOCATION */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2 text-sm text-base-content/70">

                            <FiMapPin className="shrink-0 text-primary" />

                            <span>
                              {job?.location?.city ||
                                job?.location?.country ||
                                "Remote"}
                            </span>

                          </div>

                        </td>

                        {/* DATE */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2 text-sm text-base-content/70">

                            <FiCalendar className="text-primary" />

                            {formatDate(
                              application?.applied_date
                            )}

                          </div>

                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-5">

                          <StatusBadge
                            status={application?.status}
                          />

                        </td>

                        {/* ACTION */}

                        <td className="px-5 py-5 text-right">

                          <Link
                            to={`/details/job/${application?.job_id}`}
                            className="inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-4 py-2 text-xs font-semibold text-base-content transition hover:border-primary hover:text-primary"
                          >
                            <FiEye />
                            View Job
                          </Link>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* ================= MOBILE CARDS ================= */}

        <div className="space-y-4 md:hidden">

          {applications.length === 0 ? (
            <div className="rounded-2xl border border-base-300 bg-base-100">
              <EmptyState />
            </div>
          ) : (

            applications.map((application) => {

              const job = application?.job;

              return (
                <div
                  key={application?._id}
                  className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm"
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-base-300">

                        {job?.company?.logo ? (
                          <img
                            src={job.company.logo}
                            alt={job?.company?.name || "Company"}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <FiBriefcase className="text-base-content/40" />
                        )}

                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate font-bold text-base-content">
                          {job?.title || "Unknown Job"}
                        </h3>

                        <p className="mt-1 truncate text-xs text-base-content/50">
                          {job?.company?.name || "Unknown Company"}
                        </p>

                      </div>

                    </div>

                    <StatusBadge
                      status={application?.status}
                    />

                  </div>

                  {/* INFO */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-base-200/60 p-3">

                      <div className="flex items-center gap-2 text-xs text-base-content/50">
                        <FiMapPin />
                        Location
                      </div>

                      <p className="mt-1 text-sm font-medium">
                        {job?.location?.city ||
                          job?.location?.country ||
                          "Remote"}
                      </p>

                    </div>

                    <div className="rounded-xl bg-base-200/60 p-3">

                      <div className="flex items-center gap-2 text-xs text-base-content/50">
                        <FiCalendar />
                        Applied
                      </div>

                      <p className="mt-1 text-sm font-medium">
                        {formatDate(
                          application?.applied_date
                        )}
                      </p>

                    </div>

                  </div>

                  {/* BUTTON */}

                  <Link
                    to={`/details/job/${application?.job_id}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <FiEye />
                    View Job
                  </Link>

                </div>
              );
            })

          )}

        </div>

      </div>
    </div>
  );
};


/* =========================================
   SUMMARY CARD
========================================= */

const SummaryCard = ({ title, value }) => {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5">

      <p className="text-xs text-base-content/50 sm:text-sm">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-base-content">
        {value}
      </p>

    </div>
  );
};


/* =========================================
   STATUS BADGE
========================================= */

const StatusBadge = ({ status }) => {

  const statusConfig = {
  pending: {
    text: "Pending",
    className: "border-warning/20 bg-warning/10 text-warning",
  },

  shortlisted: {
    text: "Shortlisted",
    className: "border-primary/20 bg-primary/10 text-primary",
  },

  interview: {
    text: "Interview",
    className: "border-info/20 bg-info/10 text-info",
  },

  accepted: {
    text: "Accepted",
    className: "border-success/20 bg-success/10 text-success",
  },

  hired: {
    text: "Hired",
    className: "border-success/20 bg-success/10 text-success",
  },

  rejected: {
    text: "Rejected",
    className: "border-error/20 bg-error/10 text-error",
  },
};

  const config =
    statusConfig[status] || {
      text: status || "Unknown",
      className:
        "border-base-300 bg-base-200 text-base-content/60",
    };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.text}
    </span>
  );
};


/* =========================================
   EMPTY STATE
========================================= */

const EmptyState = () => {

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <FiBriefcase className="text-2xl" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-base-content">
        No Applied Jobs
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-base-content/50">
        You haven't applied to any jobs yet.
        Find a suitable job and send your application.
      </p>

      <Link
        to="/jobs"
        className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Browse Jobs
      </Link>

    </div>
  );
};


/* =========================================
   DATE FORMATTER
========================================= */

const formatDate = (date) => {

  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


export default Myappliedjobs;