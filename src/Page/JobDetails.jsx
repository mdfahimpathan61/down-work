import React from "react";
import { FaHouseFlag } from "react-icons/fa6";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { LiaIndustrySolid } from "react-icons/lia";
import { MdOutlineAccessTime, MdWorkOutline } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { Link, useLoaderData, useParams } from "react-router";

const JobDetails = () => {
  const { id } = useParams();
  const allJobsData = useLoaderData();
  const job = allJobsData.find((job) => job.id == id);
  console.log(job);
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
  } = job;
  return (
    <div className="max-w-360 p-3 sm:p-5 mx-auto">
      <header>
        <div className="flex items-center gap-5 mt-5">
          <div>
            <img className="w-15 rounded-lg sm:w-20 shadow-md" src={company.logo} alt="" />
          </div>
          <div>
            <h4 className=" text-lg sm:text-2xl font-bold mb-2">{title}</h4>
            <Link to={`/details/company/${id}`}>
                <p className="text-accent text-sm sm:text-md  font-bold flex gap-1 items-center text-md ml-1 hover:text-secondary">
               <LiaIndustrySolid /> {company.name}
            </p>
            </Link>
            
            <p className="text-accent text-sm sm:text-md  font-bold flex gap-1 items-center text-md ml-1 ">
              <FaHouseFlag />
              {location.country}
            </p>
          </div>
        </div>
      </header>

      <hr className="border-gray-200 my-5" />

      <main className="p-2">
        <section>
          <h3 className="text-lg sm:text-xl font-extralight">
            Job Description
          </h3>
          <p className="text-accent text-sm sm:text-md font-extralight lg:max-w-7/10">
            {description}
          </p>
        </section>
        <section className="my-5">
          <h3 className="text-lg sm:text-xl font-extralight">Resposibilits</h3>
          {responsibilities.map((resposibility,index) => (
            <p key={index} className="text-accent text-sm sm:text-md font-extralight  ml-1 mt-1">
              {" "}
              <span className="font-bold"> - </span> {resposibility}
            </p>
          ))}
        </section>
        <section className="my-5">
          <h3 className="text-lg sm:text-xl font-extralight">Requirements :</h3>
          {requirements.map((requirement,index) => (
            <p key={index} className="text-accent text-sm sm:text-md font-extralight  ml-1 mt-1">
              {" "}
              <span className="font-bold"> - </span> {requirement}
            </p>
          ))}
        </section>
        <section className="my-5">
          <h3 className="text-lg sm:text-xl font-extralight">
            Preferred Qualifications :
          </h3>
          {preferred_qualifications.map((q,index) => (
            <p key={index} className="text-accent text-sm sm:text-md font-extralight  ml-1 mt-1">
              {" "}
              <span className="font-bold"> - </span> {q}
            </p>
          ))}
        </section>
        <section className="my-5">
          <h3 className="text-lg sm:text-xl font-extralight">Skill - </h3>
          {skills.map((skill) => (
            <span className="badge badge-sm sm:badge-md text-accent bg-gray-200 mx-1">
              {skill}
            </span>
          ))}
        </section>

        <section className="my-5">
          <h3 className="text-lg sm:text-xl font-extralight">Education :</h3>
          <p className="text-accent text-sm sm:text-md font-extralight  ml-1 mt-1">
            {" "}
            <span className="font-bold"> - </span> {education[0].degree}
          </p>
          <p className="text-accent text-sm sm:text-md font-extralight  ml-1 mt-1">
            {" "}
            <span className="font-bold"> - </span> {education[0].field}
          </p>
        </section>
        <section className="my-3">
          <h3 className="text-lg sm:text-xl font-extralight">
            Vacancy : <span className="text-sm sm:text-md">{vacancy}</span>
          </h3>
        </section>
        <section className="my-3">
          <h3 className="text-lg sm:text-xl font-extralight">
            Experience : <span className="text-sm sm:text-md">0{experience.minimum} - 0{experience.maximum} years</span>
          </h3>
        </section>
        <section className="my-3">
          <h3 className="text-lg sm:text-xl font-extralight">
            Salary :{" "}
            <span className=" md:text-md text-sm ">
              {" "}
              {salary.minimum} to {salary.maximum} {salary.currency} /{" "}
              {salary.period}
            </span>
          </h3>
        </section>

        <section>
          <div className=" grid grid-cols-1    sm:grid-cols-2  md:grid-cols-3 sm:gap-5  ">
            
              <p className="text-md sm:text-lg">
                Location :{" "}
                <span className="text-accent font-light text-md">
                  {location.address}, 
                  {location.country}
                </span>
              </p>
            
            
              <p className="text-md sm:text-lg">
                Job Type :{" "}
                <span className="text-accent font-light text-md">
                  {job_type}
                </span>
              </p>
           
            
              <p className=" text-md sm:text-lg">
                Post Date :{" "}
                <span className="text-accent font-light text-md">
                  {posted_date}
                </span>
              </p>
            
            
          </div>
        </section>
      </main>
    </div>
  );
};

export default JobDetails;
