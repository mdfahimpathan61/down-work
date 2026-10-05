
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCalendarDays,
  FaUsers,
} from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Loading from "../../Component/Loading";

const ViewApplication = () => {
  const { jobId } = useParams();
  //console.log(jobId)

  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------
  // Get applications for this job
  // ---------------------------------------
  useEffect(() => {
    fetch(`http://localhost:3000/jobapplications?id=${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setApplications(data?.applications || []);
        setJob(data?.job || null);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [jobId]);

  // ---------------------------------------
  // Update application status
  // ---------------------------------------
  const handleStatusChange = (applicationId, status) => {
    fetch(`http://localhost:3000/application/${applicationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0) {
          setApplications((prev) =>
            prev.map((application) =>
              application._id === applicationId
                ? {
                    ...application,
                    status: status,
                  }
                : application
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-base-200 py-6 px-3 sm:px-5">
      <div className="max-w-360 mx-auto">

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <div className="mb-6">
          <Link
            to="/client/mypostedjobs"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary mb-5"
          >
            <FaArrowLeft />
            Back to My Jobs
          </Link>

          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-5 sm:p-7">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
                  <FaBriefcase />
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-accent">
                    {job?.title || "Job Applications"}
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    {job?.company?.name || "Your Job"}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-3 text-xs sm:text-sm text-gray-500">

                    {job?.location?.city && (
                      <span className="flex items-center gap-1">
                        <MdOutlineLocationOn />
                        {job.location.city}
                      </span>
                    )}

                    {job?.job_type && (
                      <span className="flex items-center gap-1">
                        <FaBriefcase />
                        {job.job_type}
                      </span>
                    )}

                  </div>
                </div>
              </div>

              {/* Application count */}

              <div className="flex items-center gap-3 bg-primary/10 rounded-xl px-5 py-3">
                <div className="text-primary text-2xl">
                  <FaUsers />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Total Applications
                  </p>

                  <p className="text-2xl font-bold text-accent">
                    {applications?.length || 0}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* Applications */}
        {/* -------------------------------- */}

        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">

          <div className="p-5 border-b border-base-300">
            <h2 className="text-lg sm:text-xl font-bold text-accent">
              Job Applicants
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Candidates who applied for this job
            </p>
          </div>

          {applications?.length > 0 ? (
            <div className="overflow-x-auto">

              <table className="table w-full">

                <thead>
                  <tr className="text-accent">
                    <th>Candidate</th>
                    <th className="hidden md:table-cell">Email</th>
                    <th className="hidden sm:table-cell">Applied Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {applications?.map((application) => {

                    const freelancer = application?.freelancer;

                    return (
                      <tr
                        key={application?._id}
                        className="hover:bg-base-200 transition"
                      >

                        {/* Candidate */}

                        <td>

                          <div className="flex items-center gap-3">

                            <div className="avatar">

                              <div className="w-11 h-11 rounded-full">
                                {freelancer?.photoURL ? (
                                  <img
                                    src={freelancer.photoURL}
                                    alt={freelancer?.name || "Candidate"}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center text-xl">
                                    <HiOutlineUserCircle />
                                  </div>
                                )}
                              </div>

                            </div>

                            <div>

                              <p className="font-semibold text-accent">
                                {freelancer?.name ||
                                  freelancer?.displayName ||
                                  "Unknown Candidate"}
                              </p>

                              <p className="text-xs text-gray-500 md:hidden flex items-center gap-1">
                                <MdOutlineEmail />
                                {application?.email}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Email */}

                        <td className="hidden md:table-cell">
                          <span className="text-sm text-gray-500">
                            {application?.email}
                          </span>
                        </td>

                        {/* Applied Date */}

                        <td className="hidden sm:table-cell">

                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <FaCalendarDays />

                            {application?.applied_date
                              ? new Date(
                                  application.applied_date
                                ).toLocaleDateString()
                              : "N/A"}
                          </span>

                        </td>

                        {/* Status */}

                        <td>

                          <select
                            value={application?.status || "pending"}
                            onChange={(e) =>
                              handleStatusChange(
                                application?._id,
                                e.target.value
                              )
                            }
                            className={`select select-sm border rounded-lg font-medium
                              ${
                                application?.status === "hired"
                                  ? "text-success border-success"
                                  : application?.status === "rejected"
                                    ? "text-error border-error"
                                    : application?.status === "shortlisted"
                                      ? "text-primary border-primary"
                                      : "text-warning border-warning"
                              }`}
                          >
                            <option value="pending">
                              Pending
                            </option>

                            <option value="shortlisted">
                              Shortlisted
                            </option>

                            <option value="interview">
                              Interview
                            </option>

                            <option value="hired">
                              Hired
                            </option>

                            <option value="rejected">
                              Rejected
                            </option>

                          </select>

                        </td>

                        {/* Profile */}

                        <td>

                          <Link
                            to={`/client/candidate/${application?.freelancer_id}`}
                            className="btn btn-sm btn-primary text-white rounded-lg"
                          >
                            <HiOutlineUserCircle />
                            <span className="hidden sm:inline">
                              View Profile
                            </span>
                          </Link>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          ) : (

            /* -------------------------------- */
            /* No Applications */
            /* -------------------------------- */

            <div className="py-20 text-center px-5">

              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl mb-4">
                <FaUsers />
              </div>

              <h3 className="text-xl font-bold text-accent">
                No Applications Yet
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Nobody has applied for this job yet.
              </p>

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default ViewApplication;
