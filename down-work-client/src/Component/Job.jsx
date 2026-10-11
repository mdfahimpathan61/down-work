
import {
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import { LiaIndustrySolid } from "react-icons/lia";
import {
  MdOutlineAccessTime,
  MdWorkOutline,
} from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FiArrowUpRight, FiBriefcase } from "react-icons/fi";
import { Link } from "react-router";

const Job = ({ job }) => {
  const {
    _id,
    title,
    company,
    location,
    job_type,
    posted_date,
    salary,
    description,
    experience,
  } = job;

  const details = [
    {
      icon: <SlLocationPin />,
      label: "Location",
      value: location?.city || "Not specified",
      color: "bg-violet-50 text-violet-600",
    },
    {
      icon: <MdWorkOutline />,
      label: "Job Type",
      value: job_type || "Not specified",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: <MdOutlineAccessTime />,
      label: "Posted Date",
      value: posted_date || "Recently",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: <HiOutlineCurrencyDollar />,
      label: "Salary",
      value:
        salary?.maximum != null
          ? `${salary.minimum ?? 0} - ${salary.maximum} ${salary.currency || ""}`
          : "Negotiable",
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <article className="group mx-auto w-full md:w-95/100 my-5 md:my-6 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">

      {/* Main content */}
      <div className="p-4 sm:p-6 lg:p-9">

        {/* Company and action */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex min-w-0 items-start gap-3 sm:gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-base-300 bg-base-200/50 p-2 sm:h-16 sm:w-16">
              {company?.logo ? (
                <img
                  src={company.logo}
                  alt={`${company?.name || "Company"} logo`}
                  loading="lazy"
                  className="h-full w-full rounded-xl object-contain"
                />
              ) : (
                <FiBriefcase className="text-2xl text-primary" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-lg font-bold leading-snug text-base-content transition-colors group-hover:text-primary sm:text-xl lg:text-2xl">
                {title}
              </h3>

              <Link
                to={`/details/company/${_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex max-w-full items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-primary sm:text-base"
              >
                <LiaIndustrySolid className="shrink-0 text-lg" />
                <span className="break-words">
                  {company?.name || "Company"}
                </span>
              </Link>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
                  {job_type || "Job"}
                </span>

                {experience?.level && (
                  <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-base-content sm:text-sm">
                    {experience.level}
                  </span>
                )}

                {experience?.minimum != null && (
                  <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-base-content sm:text-sm">
                    {experience.minimum}+ yrs experience
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <span className="text-xs text-accent sm:text-sm">
              <MdOutlineAccessTime className="mr-1 inline-block text-base" />
              {posted_date || "Recently posted"}
            </span>

            <Link
              to={`/details/job/${_id}`}
              className="btn btn-primary w-full gap-2 text-white shadow-sm transition-all hover:shadow-md sm:w-auto"
            >
              See Details
              <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="mt-5 line-clamp-3 text-sm leading-7 text-accent sm:mt-6 sm:text-base">
            {description}
          </p>
        )}

        {/* Experience summary */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-base-300 pt-4 sm:mt-6 sm:pt-5">
          {experience?.minimum != null && (
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiBriefcase className="text-lg" />
              </span>
              <div>
                <p className="text-xs text-accent">Experience</p>
                <p className="text-sm font-semibold text-base-content">
                  {experience.minimum}
                  {experience.maximum != null &&
                  experience.maximum !== experience.minimum
                    ? ` - ${experience.maximum}`
                    : "+"}{" "}
                  years
                </p>
              </div>
            </div>
          )}

          {experience?.level && (
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <LiaIndustrySolid className="text-xl" />
              </span>
              <div>
                <p className="text-xs text-accent">Career Level</p>
                <p className="text-sm font-semibold text-base-content">
                  {experience.level}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job information footer */}
      <div className="grid grid-cols-1 gap-4 border-t border-base-300 bg-base-200/40 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-3 lg:px-9">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex min-w-0 items-center gap-3"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${item.color}`}
            >
              {item.icon}
            </span>

            <div className="min-w-0">
              <p className="text-xs text-accent">{item.label}</p>
              <p className="break-words text-sm font-semibold text-base-content">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Job;
