import React, { useEffect, useState } from "react";
import { FaHouseFlag } from "react-icons/fa6";
import {
  HiOutlineCurrencyDollar,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import { LiaIndustrySolid } from "react-icons/lia";
import {
  MdOutlineAccessTime,
  MdWorkOutline,
} from "react-icons/md";
import {
  SlLocationPin,
  SlBriefcase,
} from "react-icons/sl";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import { Link, useLoaderData, useParams } from "react-router";
import useAuth from "../hooks/useAuth";

const JobDetails = () => {
  const { role,activeUser,successAlert } = useAuth();
  const { id } = useParams();
  const job = useLoaderData();
  const [applyed, setApplyed] = useState(false)
  const [freelancer, setFreelancer] = useState(null)

  //console.log(job)

  useEffect(() => {
    if(role == 'freelancer'){
      fetch(`http://localhost:3000/applyed?email=${activeUser.email}&id=${id}`)
    .then(res => res.json())
    .then(data => {
      if(data._id){
        setApplyed(true)
      }
      //console.log(data)
    })


    fetch(`http://localhost:3000/user?email=${activeUser.email}`)
    .then(res => res.json())
    .then(data => {
      if(data._id){
        setFreelancer(data)
      }
    })
    }
  },[activeUser,id,role]) 

//console.log(applyed)
  const handleApplyed = () =>{
    const payload = {
      freelancer_id : freelancer._id,
      job_id : id,
      email: freelancer.email
    }
    fetch(`http://localhost:3000/applyjob`,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res=> res.json())
    .then(data => {
      console.log(data)
      if(data.acknowledged){
        successAlert("You Applied the Job")
        setApplyed(true)
      }
    })

    
  }
  // -----------------------------------
  // Find current job safely
  // -----------------------------------
 

  // -----------------------------------
  // If job doesn't exist
  // -----------------------------------
  if (!job) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <SlBriefcase className="text-2xl text-slate-400" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Job Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The job you are looking for doesn't exist
            or has been removed.
          </p>

          <Link
            to="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FiArrowLeft />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  // -----------------------------------
  // Safe data extraction
  // -----------------------------------
  const {
    title,
    company,
    location,
    job_type,
    posted_date,
    salary,
    description,
    experience,
    responsibilities,
    requirements,
    preferred_qualifications,
    skills,
    education,
    vacancy,
    updated_date,
  } = job;

  const safeResponsibilities =
    Array.isArray(responsibilities)
      ? responsibilities
      : [];

  const safeRequirements =
    Array.isArray(requirements)
      ? requirements
      : [];

  const safePreferredQualifications =
    Array.isArray(preferred_qualifications)
      ? preferred_qualifications
      : [];

  const safeSkills = Array.isArray(skills)
    ? skills
    : [];

  const safeEducation = Array.isArray(education)
    ? education
    : [];


   

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =================================
            BACK BUTTON
        ================================= */}
        <div className="mb-5">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary"
          >
            <FiArrowLeft />
            Back to Jobs
          </Link>
        </div>

        {/* =================================
            HERO / JOB HEADER
        ================================= */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-primary/10 via-white to-white p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              
              {/* Company + Job */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-20 sm:w-20">
                  {company?.logo ? (
                    <img
                      src={company.logo}
                      alt={company?.name || "Company"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <SlBriefcase className="text-2xl text-slate-400" />
                  )}
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {job_type || "Job"}
                    </span>

                    {job?.status && (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        {job.status}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    {title || "Untitled Job"}
                  </h1>

                  <Link
                    to={`/details/company/${id}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-primary sm:text-base"
                  >
                    <LiaIndustrySolid className="text-lg" />

                    {company?.name ||
                      "Company not available"}
                  </Link>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FiMapPin />
                      {location?.city ||
                        location?.country ||
                        "Location not available"}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar />
                      Posted{" "}
                      {posted_date || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:min-w-[230px]">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Salary
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <HiOutlineCurrencyDollar className="text-xl text-primary" />

                  <p className="text-lg font-bold text-slate-900">
                    {salary?.minimum ?? 0}
                    {" - "}
                    {salary?.maximum ?? 0}
                  </p>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {salary?.currency || "N/A"} /{" "}
                  {salary?.period || "N/A"}
                </p>

                {salary?.negotiable && (
                  <span className="mt-3 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                    Negotiable
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* =================================
              QUICK INFO
          ================================= */}
          <div className="grid grid-cols-2 border-t border-slate-200 sm:grid-cols-4">
            <InfoItem
              icon={<SlLocationPin />}
              label="Location"
              value={
                location?.address ||
                location?.city ||
                "N/A"
              }
            />

            <InfoItem
              icon={<MdWorkOutline />}
              label="Job Type"
              value={job_type || "N/A"}
            />

            <InfoItem
              icon={<MdOutlineAccessTime />}
              label="Experience"
              value={
                experience
                  ? `${experience.minimum ?? 0} - ${
                      experience.maximum ?? 0
                    } years`
                  : "N/A"
              }
            />

            <InfoItem
              icon={<FiUsers />}
              label="Vacancy"
              value={`${vacancy ?? 0} Position${
                vacancy === 1 ? "" : "s"
              }`}
            />
          </div>
        </section>

        {/* =================================
            MAIN CONTENT
        ================================= */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* LEFT / MAIN */}
          <main className="space-y-6 lg:col-span-2">
            
            {/* Description */}
            <ContentCard title="Job Description">
              {description ? (
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  {description}
                </p>
              ) : (
                <EmptyText />
              )}
            </ContentCard>

            {/* Responsibilities */}
            <ContentCard title="Responsibilities">
              {safeResponsibilities.length > 0 ? (
                <ul className="space-y-3">
                  {safeResponsibilities.map(
                    (responsibility, index) => (
                      <ListItem
                        key={index}
                        text={responsibility}
                      />
                    )
                  )}
                </ul>
              ) : (
                <EmptyText text="No responsibilities provided." />
              )}
            </ContentCard>

            {/* Requirements */}
            <ContentCard title="Requirements">
              {safeRequirements.length > 0 ? (
                <ul className="space-y-3">
                  {safeRequirements.map(
                    (requirement, index) => (
                      <ListItem
                        key={index}
                        text={requirement}
                      />
                    )
                  )}
                </ul>
              ) : (
                <EmptyText text="No requirements provided." />
              )}
            </ContentCard>

            {/* Preferred Qualifications */}
            {safePreferredQualifications.length >
              0 && (
              <ContentCard title="Preferred Qualifications">
                <ul className="space-y-3">
                  {safePreferredQualifications.map(
                    (qualification, index) => (
                      <ListItem
                        key={index}
                        text={qualification}
                      />
                    )
                  )}
                </ul>
              </ContentCard>
            )}

            {/* Skills */}
            <ContentCard title="Skills">
              {safeSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {safeSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <EmptyText text="No skills specified." />
              )}
            </ContentCard>
          </main>

          {/* =================================
              SIDEBAR
          ================================= */}
          <aside className="space-y-6">
            
            {/* Education */}
            <ContentCard title="Education">
              {safeEducation.length > 0 ? (
                <div className="space-y-4">
                  {safeEducation.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-slate-50 p-4"
                      >
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <HiOutlineAcademicCap className="text-xl" />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {item?.degree ||
                                "Degree not specified"}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {item?.field ||
                                "Field not specified"}
                            </p>

                            {item?.required && (
                              <span className="mt-2 inline-block text-xs font-medium text-primary">
                                Required
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <EmptyText text="No education information provided." />
              )}
            </ContentCard>

            {/* Job Information */}
            <ContentCard title="Job Information">
              <div className="space-y-4">
                <SideInfo
                  icon={<FiMapPin />}
                  label="Location"
                  value={
                    [
                      location?.address,
                      location?.city,
                      location?.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "N/A"
                  }
                />

                <SideInfo
                  icon={<MdWorkOutline />}
                  label="Job Type"
                  value={job_type || "N/A"}
                />

                <SideInfo
                  icon={<FiClock />}
                  label="Experience"
                  value={
                    experience
                      ? `${experience.minimum ?? 0} - ${
                          experience.maximum ?? 0
                        } years`
                      : "N/A"
                  }
                />

                <SideInfo
                  icon={<FiUsers />}
                  label="Vacancy"
                  value={vacancy ?? "N/A"}
                />

                <SideInfo
                  icon={<FiCalendar />}
                  label="Posted"
                  value={posted_date || "N/A"}
                />

                {updated_date && (
                  <SideInfo
                    icon={<FiCalendar />}
                    label="Updated"
                    value={updated_date}
                  />
                )}
              </div>
            </ContentCard>

            {/* Company */}
            <ContentCard title="Company">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {company?.logo ? (
                    <img
                      src={company.logo}
                      alt={company?.name || "Company"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <LiaIndustrySolid />
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {company?.name || "N/A"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {company?.industry || "Industry N/A"}
                  </p>
                </div>
              </div>

              {company?.company_size && (
                <p className="mt-4 text-sm text-slate-500">
                  Company Size:{" "}
                  <span className="font-medium text-slate-700">
                    {company.company_size}
                  </span>
                </p>
              )}
            </ContentCard>
          </aside>
        </div>

        {/* =================================
            APPLY SECTION
        ================================= */}
        {role !== "client" && (
          <div className={`mt-8 rounded-3xl  p-5 shadow-lg sm:p-7 ${applyed ? "bg-gray-500" : "bg-linear-to-r from-primary to-primary/80"}`}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-white">
                <h3 className="text-xl font-bold sm:text-2xl">
                  Interested in this position?
                </h3>

                <p className="mt-1 text-sm text-white/80">
                  Apply now and take the next step in your
                  career.
                </p>
              </div>

              <button disabled={applyed} onClick={() => handleApplyed()} className={`w-full rounded-xl ${applyed ? "bg-gray-400 text-gray-700" :'bg-white text-primary hover:bg-slate-100'} px-8 py-3 text-sm font-bold  shadow-sm transition  sm:w-auto`}>
                {applyed ? "Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================
   INFO ITEM
========================================= */

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="border-b border-r border-slate-200 p-4 last:border-r-0 sm:border-b-0">
      <div className="mb-2 flex items-center gap-2 text-primary">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </span>
      </div>

      <p className="truncate text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
};

/* =========================================
   CONTENT CARD
========================================= */

const ContentCard = ({ title, children }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 text-lg font-bold text-slate-900 sm:text-xl">
        {title}
      </h2>

      {children}
    </section>
  );
};

/* =========================================
   LIST ITEM
========================================= */

const ListItem = ({ text }) => {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-base">
      <FiCheckCircle className="mt-1 shrink-0 text-primary" />
      <span>{text}</span>
    </li>
  );
};

/* =========================================
   SIDEBAR INFO
========================================= */

const SideInfo = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
};

/* =========================================
   EMPTY TEXT
========================================= */

const EmptyText = ({
  text = "No information provided.",
}) => {
  return (
    <p className="text-sm italic text-slate-400">
      {text}
    </p>
  );
};

export default JobDetails;