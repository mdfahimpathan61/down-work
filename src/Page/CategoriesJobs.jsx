import  { useEffect, useRef, useState } from "react";
import { NavLink, useLoaderData, useParams } from "react-router";
import Job from "../Component/Job";
import { MdOutlineSearch } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const CategoriesJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [catigoriesAllJobs, setCatigoriesAllJobs] = useState([]);
  const [noJob, setNoJob] = useState(false)



  const { id } = useParams();
  const allJobsData = useLoaderData();
  //console.log(id, allJobsData)

  const searchRef = useRef();
  

  useEffect(() => {
    if (id == "all") {
      setFilteredJobs(allJobsData);
      setCatigoriesAllJobs(allJobsData)
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

   // const searchCategory = (id == "all")? allJobsData: catigoriesAllJobs

    const searchResult = catigoriesAllJobs.filter((job) => {
            return (
              job.title.toLowerCase().includes(searchText) ||
              job.company.name.toLowerCase().includes(searchText) ||
              job.company.industry.toLowerCase().includes(searchText) ||
              job.location.city.toLowerCase().includes(searchText) ||
              job.job_type.toLowerCase().includes(searchText)
            );
          });

     setNoJob(false)
      
    setFilteredJobs(searchResult);

    if(searchResult.length == 0){
      setNoJob(true)
    }
  };


  const sortBy = (sortName) =>{
    //reset status
   setNoJob(false)

    if(sortName == "salary"){
      const sortedJobs = [...catigoriesAllJobs].sort((a,b) => b.salary.minimum - a.salary.minimum)
    setFilteredJobs(sortedJobs)
    }
    else{
      const sortedJobs = [...catigoriesAllJobs].sort((a,b) => a.experience.minimum - b.experience.minimum)
    setFilteredJobs(sortedJobs)
    }
   // console.log(sortedJobs)
    //console.log(filteredJobs)
  }


  //Filter 
  const handleFilter =(event) =>{
    event.preventDefault()
    const salary =parseInt(event.target.salary.value) ;
    const jobType = (event.target.jobType.value).toLowerCase()
    const workMode = (event.target.workMode.value).toLowerCase()
    const industry = (event.target.industry.value).toLowerCase()
    const location = (event.target.location.value).toLowerCase()
    console.log(salary, jobType, workMode, industry, location)

  const filterResult = catigoriesAllJobs.filter(job => {
    return(
      (!salary || (job.salary.minimum <= Number(salary) && job.salary.maximum >= Number(salary))) &&
      (!jobType || (job.job_type.toLowerCase().includes(jobType))) &&
      (!workMode || (job.work_mode?.toLowerCase().includes(workMode)))&&
      (!industry || (job.industry.toLowerCase().includes(industry)))&&
      (!location || (job.location.city.toLowerCase().includes(location)))
    )
  })
  console.log(filterResult)

  //reset status
  setNoJob(false)

  setFilteredJobs(filterResult)
  if(filterResult.length == 0){
    setNoJob(true)

  }

  }

  const resetFilter = () =>{
    setFilteredJobs(catigoriesAllJobs)
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

      <div className="flex  mt-8 justify-end items-center gap-2">
        

      <div className="drawer drawer-end w-auto ">
          <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            {/* Page content here */}
            <label htmlFor="my-drawer-5" className="drawer-button">
             <div title="Filter Job" className="text-xl sm:text-2xl  border p-1 rounded-full border-gray-400 text-accent hover:border-primary hover:text-primary hover:shadow">
                  <HiOutlineAdjustmentsHorizontal  />
             </div>
            </label>
          </div>
          <div className="drawer-side z-50 ">
            <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
            <form onSubmit={handleFilter} className="menu bg-base-200 min-h-screen w-50 sm:w-80 ml-3 p-4">
              {/* Sidebar content here */}
              
              <HiOutlineAdjustmentsHorizontal className="text-accent text-xl my-2" />
              <fieldset className="fieldset">
                 <label className="label">Expected Salary</label>
                 <input type="text" className="input" placeholder="Amount" name="salary" />
                 <label className="label">Job type</label>
                 <input type="text" className="input" placeholder="Full time / Part-time" name="jobType" />
                 <label className="label">Work Mode</label>
                 <input type="text" className="input" placeholder="Hybrid/Remote" name="workMode" />
                 <label className="label">Industry</label>
                 <input type="text" className="input" placeholder="Software & Technology" name="industry" />
                 <label className="label">Location</label>
                 <input type="text" className="input" placeholder="City" name="location"/>
               </fieldset>
               <div className="mt-8 flex justify-between gap-1 mr-1">
                <button className="btn btn-sm md:btn-md btn-success text-white">Set Filter <HiOutlineAdjustmentsHorizontal  /> </button>

                <button onClick={resetFilter} type="reset" className="btn btn-sm md:btn-md bg-gray-400 hover:bg-accent text-white">Reset  </button>
               </div>
            </form>
          </div>
      </div>



        <div className="dropdown dropdown-end mr-2">
          <div tabIndex={0} role="button" className="btn btn-sm sm:btn-md m-1 text-accent">
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

      {
        noJob && <p className="text-red text-2xl">No jobs Found</p>
      }

      
    </div>
  );
};

export default CategoriesJobs;
