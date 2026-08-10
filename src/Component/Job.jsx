import React from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { LiaIndustrySolid } from "react-icons/lia";
import { MdOutlineAccessTime, MdWorkOutline } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

const Job = ({ job }) => {
  const {
    title,
    company,
    location,
    job_type,
    posted_date,
    salary,
    description,
    experience,
  } = job;
  return (
    <div className="shadow-sm hover:shadow-md hover:pt-11 bg-white w-9/10 mx-auto pt-10   mt-7">
      <div className="sm:flex justify-between items-center px-5">
        <div className="gap-5 flex items-start   ">
          <img
            className="sm:mx-0 w-13 rounded-full"
            src={company.logo}
            alt=""
          />
          <div className=" ">
            <h4 className="text-xl md:text-2xl  font-bold">{title}</h4>
            <p className="text-accent font-bold flex gap-1 items-center text-md ml-1">
              <LiaIndustrySolid /> {company.name}
            </p>

            <div>
              <p className="text-accent font-extralight my-3">{description}</p>
              <div className="flex gap-5 font-bold">
                <p>Experience : {experience.minimum} years</p>
                <p>Level : {experience.level}</p>
              </div>
            </div>
          </div>
        </div>

        <button className="btn text-accent py-6 bg-gray-100 text-lg hover:bg-white hover:text-black px-5 w-full sm:w-30 hover:shadow-md">
          Apply
        </button>
      </div>
      <div className="mx-auto grid grid-cols-1 bg-gray-100 py-5 px-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 sm:gap-5 text-gray-500 my-4  ">
        <div className="flex items-center gap-2">
          <SlLocationPin />
          <span>{location.city}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdWorkOutline />
          <span>{job_type}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineAccessTime />
          <span>{posted_date}</span>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineCurrencyDollar className="text-lg" />
          <span>
            {salary.maximum} {salary.currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Job;
