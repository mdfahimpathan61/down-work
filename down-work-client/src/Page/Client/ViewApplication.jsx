import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCalendarDays,
  FaUsers,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Loading from "../../Component/Loading";

const ViewApplication = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Temporary status for each application
  const [selectedStatuses, setSelectedStatuses] = useState({});

  // Which application is currently updating
  const [updatingId, setUpdatingId] = useState(null);

  // ---------------------------------------
  // Get applications for this job
  // ---------------------------------------
  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3000/jobapplications?id=${jobId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        return res.json();
      })
      .then((data) => {
        //console.log(data);

        const applicationData = data?.applications || [];

        setApplications(applicationData);
        setJob(data?.job || null);

        // Set temporary status according to database status
        const initialStatuses = {};

        applicationData.forEach((application) => {
          initialStatuses[application?._id] =
            application?.status || "pending";
        });

        setSelectedStatuses(initialStatuses);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Failed to load",
          text: "Unable to load job applications.",
          confirmButtonText: "OK",
        });
      });
  }, [jobId]);

  // ---------------------------------------
  // Handle temporary status change
  // ---------------------------------------
  const handleStatusSelect = (applicationId, status) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [applicationId]: status,
    }));
  };

  // ---------------------------------------
  // Confirm status update
  // ---------------------------------------
  const handleStatusChange = async (applicationId) => {
    const application = applications.find(
      (item) => item?._id === applicationId
    );

    if (!application) return;

    const currentStatus = application?.status || "pending";

    const newStatus =
      selectedStatuses?.[applicationId] || currentStatus;

    // Nothing changed
    if (currentStatus === newStatus) {
      return;
    }

    // ---------------------------------------
    // Status labels
    // ---------------------------------------
    const statusLabels = {
      pending: "Pending",
      shortlisted: "Shortlisted",
      interview: "Interview",
      hired: "Hired",
      rejected: "Rejected",
    };

    const currentLabel = statusLabels[currentStatus] || currentStatus;
    const newLabel = statusLabels[newStatus] || newStatus;

    // ---------------------------------------
    // Different confirmation for Hired/Rejected
    // ---------------------------------------
    let confirmationText = `Change status from "${currentLabel}" to "${newLabel}"?`;

    if (newStatus === "hired") {
      confirmationText =
        `You are about to mark ${application?.freelancer?.name || "this candidate"} as Hired. Do you want to continue?`;
    }

    if (newStatus === "rejected") {
      confirmationText =
        `You are about to reject ${application?.freelancer?.name || "this candidate"}. Do you want to continue?`;
    }

    const result = await Swal.fire({
      icon:
        newStatus === "rejected"
          ? "warning"
          : newStatus === "hired"
            ? "success"
            : "question",

      title:
        newStatus === "rejected"
          ? "Reject Candidate?"
          : newStatus === "hired"
            ? "Hire Candidate?"
            : "Confirm Status Change",

      text: confirmationText,

      showCancelButton: true,

      confirmButtonText:
        newStatus === "rejected"
          ? "Yes, Reject"
          : newStatus === "hired"
            ? "Yes, Hire"
            : "Yes, Change",

      cancelButtonText: "Cancel",

      confirmButtonColor:
        newStatus === "rejected"
          ? "#FF7105"
          : newStatus === "hired"
            ? "#22c55e"
            : undefined,

      cancelButtonColor: "#DB2323",

      reverseButtons: true,
    });

    // ---------------------------------------
    // User clicked Cancel
    // ---------------------------------------
    if (!result.isConfirmed) {
      // Reset temporary value back to database value
      setSelectedStatuses((prev) => ({
        ...prev,
        [applicationId]: currentStatus,
      }));

      return;
    }

    // ---------------------------------------
    // Start updating
    // ---------------------------------------
    setUpdatingId(applicationId);

    try {
      const response = await fetch(
        `http://localhost:3000/application?id=${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      const data = await response.json();

      console.log(data);

      // ---------------------------------------
      // Update frontend application status
      // ---------------------------------------
      if (data?.modifiedCount > 0) {
        setApplications((prev) =>
          prev.map((item) =>
            item?._id === applicationId
              ? {
                  ...item,
                  status: newStatus,
                }
              : item
          )
        );

        setSelectedStatuses((prev) => ({
          ...prev,
          [applicationId]: newStatus,
        }));

        // ---------------------------------------
        // Success Alert
        // ---------------------------------------
        await Swal.fire({
          icon: "success",
          title: "Status Updated!",
          text: `${application?.freelancer?.name || "Candidate"} is now ${newLabel}.`,
          confirmButtonText: "OK",
          timer: 2200,
          timerProgressBar: true,
        });
      } else {
        // If backend didn't modify anything
        throw new Error("Status was not updated");
      }
    } catch (error) {
      console.log(error);

      // Reset dropdown to original status
      setSelectedStatuses((prev) => ({
        ...prev,
        [applicationId]: currentStatus,
      }));

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the application status.",
        confirmButtonText: "Try Again",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------------------------------
  // Status color helper
  // ---------------------------------------
  const getStatusClass = (status) => {
    switch (status) {
      case "hired":
        return "text-success border-success bg-base-100";

      case "rejected":
        return "text-error border-error bg-base-100";

      case "shortlisted":
        return "text-primary border-primary bg-base-100";

      case "interview":
        return "text-info border-info bg-base-100";

      default:
        return "text-warning border-warning bg-base-100";
    }
  };

  // ---------------------------------------
  // Loading
  // ---------------------------------------
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-base-200 px-3 py-6 sm:px-5 sm:py-8">
      <div className="mx-auto max-w-360">
        {/* =====================================
            HEADER
        ====================================== */}

        <div className="mb-6">
          <Link
            to="/client/mypostedjobs"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-primary"
          >
            <FaArrowLeft />
            Back to My Jobs
          </Link>

          {/* Job Header Card */}
          <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
            <div className="h-2 bg-linear-to-r from-primary via-secondary to-primary"></div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Job Information */}
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary sm:h-16 sm:w-16">
                    <FaBriefcase />
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-xl font-bold text-accent sm:text-2xl">
                      {job?.title || "Job Applications"}
                    </h1>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                      {job?.company?.name || "Your Job"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 sm:text-sm">
                      {job?.location?.city && (
                        <span className="flex items-center gap-1.5">
                          <MdOutlineLocationOn className="text-base" />
                          {job.location.city}
                        </span>
                      )}

                      {job?.job_type && (
                        <span className="flex items-center gap-1.5">
                          <FaBriefcase />
                          {job.job_type}
                        </span>
                      )}

                      {job?.status && (
                        <span className="rounded-full bg-success/10 px-3 py-1 font-medium text-success">
                          {job.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Application Count */}
                <div className="flex w-full items-center gap-3 rounded-2xl bg-primary/10 px-5 py-4 md:w-auto">
                  <div className="text-2xl text-primary">
                    <FaUsers />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500">
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
        </div>

        {/* =====================================
            APPLICATIONS
        ====================================== */}

        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          {/* Section Header */}
          <div className="border-b border-base-300 p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-accent sm:text-xl">
                  Job Applicants
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Review candidates and manage their application status.
                </p>
              </div>

              <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                {applications?.length || 0} Applicants
              </div>
            </div>
          </div>

          {/* =====================================
              APPLICATION TABLE
          ====================================== */}

          {applications?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="border-b border-base-300 text-accent">
                    <th>Candidate</th>
                    <th className="hidden md:table-cell">
                      Email
                    </th>
                    <th className="hidden sm:table-cell">
                      Applied Date
                    </th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => {
                    const freelancer = application?.freelancer;

                    const currentStatus =
                      application?.status || "pending";

                    const selectedStatus =
                      selectedStatuses?.[application?._id] ||
                      currentStatus;

                    const hasChanged =
                      currentStatus !== selectedStatus;

                    const isUpdating =
                      updatingId === application?._id;

                    return (
                      <tr
                        key={application?._id}
                        className="border-b border-base-200 transition hover:bg-base-200/60"
                      >
                        {/* =====================================
                            CANDIDATE
                        ====================================== */}

                        <td className="py-5">
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-base-200">
                                {freelancer?.image ? (
                                  <img
                                    src={freelancer.image}
                                    alt={
                                      freelancer?.name ||
                                      "Candidate"
                                    }
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl text-primary">
                                    <HiOutlineUserCircle />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold text-accent">
                                {freelancer?.name ||
                                  freelancer?.displayName ||
                                  "Unknown Candidate"}
                              </p>

                              {/* Email on small screen */}
                              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 md:hidden">
                                <MdOutlineEmail />
                                <span className="max-w-45 truncate">
                                  {application?.email}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* =====================================
                            EMAIL
                        ====================================== */}

                        <td className="hidden md:table-cell">
                          <span className="text-sm text-gray-500">
                            {application?.email}
                          </span>
                        </td>

                        {/* =====================================
                            APPLIED DATE
                        ====================================== */}

                        <td className="hidden sm:table-cell">
                          <span className="flex items-center gap-1.5 text-sm text-gray-500">
                            <FaCalendarDays />

                            {application?.applied_date
                              ? new Date(
                                  application.applied_date
                                ).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </td>

                        {/* =====================================
                            STATUS
                        ====================================== */}

                        <td className="min-w-55">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <select
                                value={selectedStatus}
                                disabled={isUpdating}
                                onChange={(e) =>
                                  handleStatusSelect(
                                    application?._id,
                                    e.target.value
                                  )
                                }
                                className={`select select-sm rounded-lg border font-semibold outline-none ${getStatusClass(
                                  selectedStatus
                                )}`}
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

                              {/* =================================
                                  CONFIRM BUTTON
                              ================================== */}

                              {hasChanged && (
                                <button
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={() =>
                                    handleStatusChange(
                                      application?._id
                                    )
                                  }
                                  className="btn btn-sm btn-primary gap-1 rounded-lg text-white"
                                >
                                  {isUpdating ? (
                                    <>
                                      <span className="loading loading-spinner loading-xs"></span>
                                      Updating
                                    </>
                                  ) : (
                                    <>
                                      <FaCheck />
                                      Confirm
                                    </>
                                  )}
                                </button>
                              )}
                            </div>

                            {/* Status change hint */}
                            {hasChanged && !isUpdating && (
                              <p className="text-xs text-gray-500">
                                Status changed to{" "}
                                <span className="font-semibold text-primary">
                                  {selectedStatus}
                                </span>
                                . Click Confirm to save.
                              </p>
                            )}
                          </div>
                        </td>

                        {/* =====================================
                            PROFILE ACTION
                        ====================================== */}

                        <td>
                          <Link
                            to={`/client/candidate/${application?.freelancer_id}`}
                            className="btn btn-sm btn-primary rounded-lg text-white"
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
            /* =====================================
                NO APPLICATIONS
            ====================================== */

            <div className="px-5 py-20 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl text-primary">
                <FaUsers />
              </div>

              <h3 className="text-xl font-bold text-accent">
                No Applications Yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Nobody has applied for this job yet.
              </p>

              <Link
                to="/client/mypostedjobs"
                className="btn btn-primary mt-6 rounded-xl text-white"
              >
                <FaArrowLeft />
                Back to My Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewApplication;