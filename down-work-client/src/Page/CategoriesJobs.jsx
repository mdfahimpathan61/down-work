import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Job from "../Component/Job";
import { MdOutlineSearch } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import {
  IoBriefcaseOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { FiSearch, FiSliders } from "react-icons/fi";
import NojobFound from "./NojobFound";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Component/Loading";
import useAxios from "../hooks/useAxios";

const CategoriesJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState(null);
  const [catigoriesAllJobs, setCatigoriesAllJobs] = useState([]);
  const [noJob, setNoJob] = useState(false);
  
  
  const { loading, searchText, setSearchText} =
    useContext(AuthContext);


  const { id } = useParams();

  const [totalJob, setTotaljob] = useState(0);

  const axios = useAxios();
  const jobLimit = 10;

  const totalPage = Math.ceil(totalJob / jobLimit);
  const [page, setPage] = useState(0);
  const skip = page * jobLimit;
  //console.log(totalPage)

   const [sortActive, setSortActive] = useState("Default");
  const [sortOrder, setSortOrder] = useState(1);

    const searchRef = useRef();
     
const handleSearch = (event) => {
    
    if (event) {
      const value = searchRef.current.value
      //console.log(value)
       if(value){
         setSearchText(value);
       }
      
    }
    else{
      searchRef.current.value = searchText;
      //console.log("seeeee", searchText)
      
    } 
  }    
  

  useEffect(() => {
    //setLoading(true)

    axios
      .get(`/getjobs?limit=${jobLimit}&skip=${skip}&id=${id}&sortvalue=${sortActive}&sortorder=${sortOrder}&searchtext=${searchText}`,{
        params:{
          filterjobs : JSON.stringify(filteredJobs)
        }
      })
      .then((result) => {
        // console.log(result);
       // console.log("Backend response:", result.data);
        const jobs = result.data.jobsData || [];
        //setAllJobsData(jobs);
        setTotaljob(result.data.totalJobCount || 0);

        //const categoryJobs =
          //id === "all" ? jobs : jobs.filter((job) => job.category_id == id);

        //setFilteredJobs(categoryJobs);
        setCatigoriesAllJobs(jobs);
        if(searchText){
          //console.log(searchText)
          handleSearch();
        }
      });
  }, [skip, page, sortActive, sortOrder,searchText,filteredJobs]);



  const getPaginationPages = (currentPage, totalPages) => {
    const pages = new Set();

    // প্রথম দুইটি পেজ
    pages.add(0);
    pages.add(1);

    // Active page-এর আশেপাশে পেজ
    pages.add(currentPage - 1);
    pages.add(currentPage);
    pages.add(currentPage + 1);

    // শেষের দুইটি পেজ
    pages.add(totalPages - 2);
    pages.add(totalPages - 1);

    return [...pages]
      .filter((p) => p >= 0 && p < totalPages)
      .sort((a, b) => a - b);
  };

  

    
     

    // const searchResult =
    //   catigoriesAllJobs &&
    //   catigoriesAllJobs.filter((job) => {
    //     return (
    //       job.title?.toLowerCase().includes(searchText) ||
    //       job.company.name?.toLowerCase().includes(searchText) ||
    //       job.company.industry?.toLowerCase().includes(searchText) ||
    //       job.location.city?.toLowerCase().includes(searchText) ||
    //       job.job_type?.toLowerCase().includes(searchText)
    //     );
    //   });

    // setNoJob(false);
    // setFilteredJobs(searchResult);

    // if (searchResult.length == 0) {
    //   setNoJob(true);
    // }


  // useEffect(() => {
  //   if (searchText && catigoriesAllJobs > 0) {
  //     handleSearch();
  //   }
  // }, [catigoriesAllJobs,searchText]);



  const handleFilter = (event) => {
    event.preventDefault();

    const salary = parseInt(event.target.salary.value);
    const jobType = event.target.jobType.value.toLowerCase();
    const workMode = event.target.workMode.value.toLowerCase();
    const industry = event.target.industry.value.toLowerCase();
    const location = event.target.location.value.toLowerCase();

    const filterPayload = {
      salary, jobType, workMode, industry, location
    } 
    //console.log(filterPayload)

    // axios
    //   .get(`/getjobs`,{
    //     params:{
    //       filterjobs : JSON.stringify(filterPayload)
    //     }
    //   })
    //   .then(result => {
    //      const jobs = result.data.jobsData || [];
        
    //     setTotaljob(result.data.totalJobCount || 0);

    //     setCatigoriesAllJobs(jobs);
    //   })

   

    setNoJob(false);
    setFilteredJobs(filterPayload);

    
  };

  const resetFilter = () => {
    setFilteredJobs(catigoriesAllJobs);
  };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="min-h-screen bg-base-100">
          <div className="max-w-360 mx-auto px-3 sm:px-5 lg:px-7 pb-10">
            {/* ---------------------------------- */}
            {/* Search Header */}
            {/* ---------------------------------- */}

            <div className="pt-5 sm:pt-8">
              <div className="rounded-2xl sm:rounded-3xl border border-base-300 bg-base-200/40 p-3 sm:p-5 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <IoBriefcaseOutline className="text-xl sm:text-2xl" />
                    </div>

                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-base-content">
                        Find Your Next Job
                      </h1>

                      <p className="text-xs sm:text-sm text-accent mt-0.5">
                        Explore opportunities that match your skills
                      </p>
                    </div>
                  </div>

                  {/* Search */}

                  <div className="w-full lg:w-115">
                    <div className="flex h-12 sm:h-14 overflow-hidden rounded-xl sm:rounded-2xl border border-base-300 bg-base-100 shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <div className="flex items-center pl-3 sm:pl-4 text-accent">
                        <FiSearch className="text-lg sm:text-xl" />
                      </div>

                      <input
                        className="min-w-0 flex-1 border-0 bg-transparent px-2 sm:px-3 text-sm sm:text-base outline-none"
                        type="text"
                        required
                        placeholder="Search by job, company, industry..."
                        ref={searchRef}
                      />

                      <button
                        onClick={handleSearch}
                        className="m-1 flex items-center gap-1.5 rounded-lg sm:rounded-xl bg-primary px-3 sm:px-5 text-sm font-semibold text-white transition hover:bg-secondary"
                      >
                        <span className="hidden sm:block">Search</span>
                        <MdOutlineSearch className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------- */}
            {/* Result / Filter / Sort Header */}
            {/* ---------------------------------- */}

            <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  Available Opportunities
                </p>

                <h2 className="mt-1 text-lg sm:text-xl font-bold text-base-content">
                  {totalJob}{" "}
                  <span className="font-normal text-accent">
                    {totalJob === 1 ? "Job Found" : "Jobs Found"}
                  </span>
                </h2>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2">
                {/* Filter */}

                <div className="drawer drawer-end w-auto">
                  <input
                    id="my-drawer-5"
                    type="checkbox"
                    className="drawer-toggle"
                  />

                  <div className="drawer-content">
                    <label
                      htmlFor="my-drawer-5"
                      className="drawer-button cursor-pointer"
                    >
                      <div
                        title="Filter Job"
                        className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-accent shadow-sm transition hover:border-primary hover:text-primary hover:shadow-md"
                      >
                        <HiOutlineAdjustmentsHorizontal className="text-lg sm:text-xl" />
                      </div>
                    </label>
                  </div>

                  <div className="drawer-side z-50">
                    <label
                      htmlFor="my-drawer-5"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>

                    <form
                      onSubmit={handleFilter}
                      className="menu min-h-screen w-[85%] max-w-sm bg-base-100 p-5 sm:p-6 shadow-2xl"
                    >
                      <div className="mb-5 border-b border-base-300 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FiSliders className="text-lg" />
                          </div>

                          <div>
                            <h3 className="text-lg font-bold">Filter Jobs</h3>

                            <p className="text-xs text-accent">
                              Refine your job search
                            </p>
                          </div>
                        </div>
                      </div>

                      <fieldset className="fieldset gap-1">
                        <label className="label mt-1">Expected Salary</label>

                        <input
                          type="text"
                          className="input w-full"
                          placeholder="Maximum salary"
                          name="salary"
                        />

                        <label className="label mt-3">Job Type</label>

                        <input
                          type="text"
                          className="input w-full"
                          placeholder="Full time / Part-time"
                          name="jobType"
                        />

                        <label className="label mt-3">Work Mode</label>

                        <input
                          type="text"
                          className="input w-full"
                          placeholder="Hybrid / Remote"
                          name="workMode"
                        />

                        <label className="label mt-3">Industry</label>

                        <input
                          type="text"
                          className="input w-full"
                          placeholder="Software & Technology"
                          name="industry"
                        />

                        <label className="label mt-3">Location</label>

                        <input
                          type="text"
                          className="input w-full"
                          placeholder="City"
                          name="location"
                        />
                      </fieldset>

                      <div className="mt-8 grid grid-cols-2 gap-2">
                        <button className="btn btn-primary text-white">
                          Apply Filter
                          <HiOutlineAdjustmentsHorizontal />
                        </button>

                        <button
                          onClick={resetFilter}
                          type="reset"
                          className="btn bg-base-300 text-accent hover:bg-accent hover:text-white"
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Sort */}

                {/* <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm sm:btn-md rounded-xl border-base-300 bg-base-100 text-accent shadow-sm hover:border-primary"
                  >
                    <span>{sortActive}</span>
                    <FaAngleDown className="text-xs" />
                  </div>

                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu z-20 mt-2 w-44 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
                  >
                    <li
                      onClick={() => {
                        sortBy("salary");
                        setSortActive("Salary");
                      }}
                    >
                      <a className="rounded-xl">Salary</a>
                    </li>

                    <li
                      onClick={() => {
                        sortBy("experience");
                        setSortActive("Experience");
                      }}
                    >
                      <a className="rounded-xl">Experience</a>
                    </li>

                    <li
                      onClick={() => {
                        sortBy("default");
                        setSortActive("Default");
                      }}
                    >
                      <a className="rounded-xl">Default</a>
                    </li>
                  </ul>
                </div> */}

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm md:btn-md rounded-xl border-base-300 bg-base-100"
                  >
                    Sort: {sortActive}
                    <FaAngleDown className="text-xs" />
                  </div>

                  <ul className="dropdown-content menu z-20 mt-2 w-48 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg">
                    {["Salary", "Experience"].map((item) => (
                      <li key={item}>
                        <div className="flex flex-row items-center justify-between">
                          <button
                            type="button"
                            className={`flex-1 text-left ${
                              sortActive === item
                                ? "font-semibold text-primary "
                                : ""
                            }`}
                            onClick={() => {
                              if (sortActive !== item) {
                                setSortActive(item);
                                setSortOrder(1);
                              }
                            }}
                          >
                            {item}
                          </button>

                          {sortActive === item && (
                            <div
                              type="button"
                              className="px-2 text-primary"
                              aria-label="Toggle sort order"
                              onClick={() =>
                                setSortOrder((prev) =>
                                  prev === 1 ? -1 : 1,
                                )
                              }
                            >
                              {sortOrder === 1 ? (
                                <button title="Ascending Order" className="btn btn-sm"><FaAngleDown /></button>
                              ) : (
                                <button title="Descending Order" className="btn btn-sm"><FaAngleUp /></button>
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}

                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setSortActive("Default");
                          setSortOrder(1);
                        }}
                      >
                        Default
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ---------------------------------- */}
            {/* Job List */}
            {/* ---------------------------------- */}

            <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
              {catigoriesAllJobs?.length > 0 ? (
                <>
                  {catigoriesAllJobs.map((job) => (
                    <div
                      key={job._id}
                      className="rounded-2xl transition duration-200 hover:-translate-y-0.5"
                    >
                      <Job job={job} />
                    </div>
                  ))}

                  <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                    {page >= 1 && (
                      <button
                        title="Previous Page"
                        onClick={() => setPage(page - 1)}
                        className=" btn border-0 bg-transparent text-md md:text-lg hover:text-primary"
                      >
                        <IoChevronBack />{" "}
                      </button>
                    )}
                    {getPaginationPages(page, totalPage).map(
                      (p, index, pages) => (
                        <Fragment key={p}>
                          {index > 0 && p - pages[index - 1] > 1 && (
                            <span className="px-0.5 text-sm text-accent sm:px-1 sm:text-base">
                              ...
                            </span>
                          )}

                          <button
                            onClick={() => setPage(p)}
                            aria-current={page === p ? "page" : undefined}
                            className={`btn btn-xs min-w-8 px-2 sm:btn-sm sm:min-w-10 sm:px-3 ${
                              page === p
                                ? "border-primary bg-primary text-white"
                                : "border-base-300 bg-base-100"
                            }`}
                          >
                            {p + 1}
                          </button>
                        </Fragment>
                      ),
                    )}
                    {page + 1 < totalPage && (
                      <button
                        title="Next Page"
                        onClick={() => setPage(page + 1)}
                        className=" btn border-0 bg-transparent  text-md md:text-lg hover:text-primary"
                      >
                        <IoChevronForward />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-200/40 px-5 py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-base-300/70">
                    <IoBriefcaseOutline className="text-3xl text-accent" />
                  </div>

                  <h3 className="text-xl font-bold text-base-content">
                    No Jobs Found
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-accent">
                    Sorry, we couldn't find any jobs at the moment. Try changing
                    your search or filter to find more opportunities.
                  </p>
                </div>
              )}
            </div>

            {/* ---------------------------------- */}
            {/* Empty State */}
            {/* ---------------------------------- */}

            {noJob && (
              <div className="mt-8">
                <NojobFound></NojobFound>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesJobs;
