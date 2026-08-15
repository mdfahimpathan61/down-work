import React from "react";
import { FaGlobe, FaMapMarkerAlt, FaUsers, FaBuilding } from "react-icons/fa";
import { useLoaderData, useParams } from "react-router";

const CompanyDetails = () => {
    const { id } = useParams();
  const allJobsData = useLoaderData();
  const { company, location } = allJobsData.find((job) => job.id == id);
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Company Header */}
        <div className="bg-base-100 rounded-2xl shadow-md p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

            {/* Logo */}
            <div className="shrink-0">
              <img
                src={company.logo}
                alt={company.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border"
              />
            </div>

            {/* Company Name */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                {company.name}
              </h1>

              <p className="text-base-content/70 mt-2">
                {company.industry}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                <span className="badge badge-primary badge-outline">
                  {company.company_size}
                </span>

                <span className="badge badge-secondary badge-outline">
                  {location.work_mode}
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* About Company */}
          <div className="bg-base-100 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-5">
              Company Information
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <div className="text-primary text-xl">
                  <FaBuilding />
                </div>

                <div>
                  <p className="text-sm text-base-content/60">
                    Industry
                  </p>
                  <p className="font-medium">
                    {company.industry}
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-4">
                <div className="text-primary text-xl">
                  <FaUsers />
                </div>

                <div>
                  <p className="text-sm text-base-content/60">
                    Company Size
                  </p>
                  <p className="font-medium">
                    {company.company_size}
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-4">
                <div className="text-primary text-xl">
                  <FaGlobe />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-base-content/60">
                    Website
                  </p>

                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline break-all"
                  >
                    Visit Company Website
                  </a>
                </div>
              </div>

            </div>
          </div>


          {/* Location */}
          <div className="bg-base-100 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-5">
              Location
            </h2>

            <div className="space-y-5">

              <div className="flex items-start gap-4">
                <div className="text-primary text-xl mt-1">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-sm text-base-content/60">
                    Address
                  </p>

                  <p className="font-medium">
                    {location.address}
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-4">
                <div className="text-primary text-xl">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-sm text-base-content/60">
                    City
                  </p>

                  <p className="font-medium">
                    {location.city}, {location.country}
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-4">
                <div className="text-primary text-xl">
                  <FaBuilding />
                </div>

                <div>
                  <p className="text-sm text-base-content/60">
                    Work Mode
                  </p>

                  <p className="font-medium">
                    {location.work_mode}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>


        {/* Bottom CTA */}
        <div className="bg-primary text-primary-content rounded-2xl shadow-md p-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div>
            <h2 className="text-xl font-bold">
              Interested in this company?
            </h2>

            <p className="text-sm opacity-80 mt-1">
              Visit their website to learn more.
            </p>
          </div>

          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-white text-primary hover:bg-base-200 border-none"
          >
            Visit Website <FaGlobe />
          </a>

        </div>

      </div>
    </div>
  );
};

export default CompanyDetails;