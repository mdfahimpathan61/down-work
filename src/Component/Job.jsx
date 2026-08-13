import React from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { LiaIndustrySolid } from "react-icons/lia";
import { MdOutlineAccessTime, MdWorkOutline } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router";

const Job = ({ job }) => {
  const {
    id,
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
   
    <div className="border border-gray-100 shadow-sm hover:shadow-md hover:pt-11 bg-white w-9/10 mx-auto pt-10 mt-7 rounded-b-xl shadow-blue-100">
      <div className="sm:flex justify-between items-center px-2 sm:px-5">
        <div>
          <div className="gap-5 flex items-start   ">
          <img
            className="sm:mx-0 w-10 sm:w-13 rounded-full"
            src={company.logo}
            alt=""
          />
          <div className=" ">
            <h4 className="text-lg md:text-2xl  font-bold">{title}</h4>
            <Link to={job.company.website} target="_blank">
              <p className="text-accent font-bold flex gap-1 items-center text-md ml-1 hover:text-secondary">
              <LiaIndustrySolid /> {company.name}
            </p>
            </Link>
          </div>  
          </div>

           <div className="mb-5">
              <p className="text-accent text-sm sm:text-md font-extralight my-3 sm:w-8/10">{description}</p>
              <div className="flex gap-3 md:gap-5 text-accent font-bold">
                <p>Experience : {experience.minimum} yrs</p>
                <p>Level : {experience.level}</p>
              </div>
            </div>  
        </div>
        
         <Link to={`/details/${id}`}>
              <button className="btn  py-6 bg-secondary hover:bg-primary sm:text-lg  text-white px-5 w-full sm:w-35 text-sm hover:shadow-md">
                 See Details
            </button>
         </Link>
        
      </div>
      <div className=" grid grid-cols-1 bg-gray-100 py-5 px-3 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 sm:gap-5 text-gray-500 mt-5  ">
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
