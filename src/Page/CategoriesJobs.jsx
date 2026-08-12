import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import Job from "../Component/Job";
import { MdOutlineSearch } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

const CategoriesJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [catigoriesAllJobs, setCatigoriesAllJobs] = useState([]);

  const { id } = useParams();
  const allJobsData = useLoaderData();
  //console.log(id, allJobsData)

  const searchRef = useRef();

  useEffect(() => {
    if (id == "all") {
      setFilteredJobs(allJobsData);
    } else {
      const categoryJobs = allJobsData.filter((job) => job.category_id == id);
      setCatigoriesAllJobs(categoryJobs);
      setFilteredJobs(categoryJobs);
    }
  }, [id]);



  const handleSearch = () => {
    const searchText = searchRef.current.value.toLowerCase();
    //searchRef.current.value = ""
    console.log(searchText);

    const searchCategory = (id == "all")? allJobsData: catigoriesAllJobs

    const searchResult = searchCategory.filter((job) => {
            return (
              job.title.toLowerCase().includes(searchText) ||
              job.company.name.toLowerCase().includes(searchText) ||
              job.company.industry.toLowerCase().includes(searchText) ||
              job.location.city.toLowerCase().includes(searchText) ||
              job.job_type.toLowerCase().includes(searchText)
            );
          });
    setFilteredJobs(searchResult);
  };


  const sortBy = (sortName) =>{
    if(sortName == "salary"){
      const sortedJobs = [...filteredJobs].sort((a,b) => b.salary.minimum - a.salary.minimum)
    setFilteredJobs(sortedJobs)
    }
    else{
      const sortedJobs = [...filteredJobs].sort((a,b) => a.experience.minimum - b.experience.minimum)
    setFilteredJobs(sortedJobs)
    }
   // console.log(sortedJobs)
    //console.log(filteredJobs)
  }

  return (
    <div className="max-w-360 mx-auto">
      <div className="flex sm:justify-end  items-center mt-5">
        <h4>{filteredJobs.length}</h4>
        <div className="w-full md:w-auto my-3 mx-3 flex shadow-sm shadow-base-300  ">
          <input
            className="border-r-0 border-gray-300 border rounded-xl bg-white rounded-r-none px-3 md:p-3 w-full md:w-auto"
            type="text"
            required
            placeholder="Search Job"
            ref={searchRef}
          />
          <div
            onClick={handleSearch}
            className="  border border-l-0 rounded-xl rounded-l-none py-3 flex items-center gap-1 px-3 bg-primary text-white hover:bg-secondary  shadow-sm"
          >
            <span className="hidden md:block">Search</span> <MdOutlineSearch />
          </div>
        </div>
      </div>

      <div className="flex mt-8 justify-end">
        <div className="dropdown dropdown-end mr-2">
          <div tabIndex={0} role="button" className="btn m-1 text-accent">
            Sort By <FaAngleDown />
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-1 shadow-sm mr-2"
          >
            <li onClick={() =>sortBy("salary")}>
              <a>Salary</a>
            </li>
            <li onClick={() => sortBy("experience")}>
              <a>Experience</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-360 mx-auto">
        {filteredJobs.map((job) => (
          <Job key={job.id} job={job}></Job>
        ))}
      </div>
    </div>
  );
};

export default CategoriesJobs;
