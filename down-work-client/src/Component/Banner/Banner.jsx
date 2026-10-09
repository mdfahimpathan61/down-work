import React, { useContext, useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Typewriter from "typewriter-effect";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";

const Banner = () => {
  const { setSearchTextContext } = useContext(AuthContext);
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchText = searchRef.current.value;

    if (searchText) {
      setSearchTextContext(searchText);
      navigate("/category/all");
    }
  };

  const handlePopularSearch = (text) => {
    setSearchTextContext(text);
    navigate("/category/all");
  };

  return (
    <div className="max-w-360 mx-auto relative overflow-hidden ">

      {/* Banner Image */}
      <div className="relative">
        <img
          src="/banner.png"
          alt="Find your dream job"
          className="
            w-full
            h-[500px]
            sm:h-[520px]
            md:h-[580px]
            lg:h-[620px]
            object-cover
            object-center
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-white/5" />

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 sm:w-80 sm:h-80 bg-primary/30 rounded-full blur-3xl" />

        <div className="absolute -bottom-24 left-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">

        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-20">

          <div className="max-w-3xl">

            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                sm:px-4
                py-1.5
                sm:py-2
                mb-4
                sm:mb-5
                rounded-full
                bg-white/10
                border
                border-white/20
                backdrop-blur-md
                text-black/50
                text-xs
                sm:text-sm
                font-medium
              "
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />

              Find your next opportunity
            </div>

            {/* Heading */}
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
                font-extrabold
                text-black/70
                leading-tight
              "
            >
              <Typewriter
                options={{
                  delay: 320,
                  cursor: "|",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Find Your Passion Job")
                    .start();
                }}
              />
            </h1>

            {/* Description */}
            <p
              className="
                text-black/60
                text-sm
                sm:text-base
                md:text-xl
                lg:text-2xl
                mt-4
                sm:mt-5
                max-w-2xl
                leading-relaxed
              "
            >
              Thousands of talented people have found their dream jobs on
              <span className="font-bold text-primary ml-1 sm:ml-2">
                Down Work
              </span>
            </p>

            {/* Search */}
            <div className="mt-6 sm:mt-8 w-full max-w-2xl">

              <div
                className="
                  flex
                  items-center
                  bg-white/95
                  backdrop-blur-md
                  p-1.5
                  sm:p-2
                  rounded-xl
                  sm:rounded-2xl
                  shadow-2xl
                  border
                  border-white/30
                "
              >

                {/* Input */}
                <div className="flex-1 min-w-0 flex items-center">

                  <MdOutlineSearch
                    className="
                      text-gray-400
                      text-xl
                      sm:text-2xl
                      ml-2
                      sm:ml-3
                      mr-1
                      sm:mr-2
                      shrink-0
                    "
                  />

                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search jobs, skills..."
                    className="
                      w-full
                      min-w-0
                      bg-transparent
                      outline-none
                      text-gray-800
                      placeholder:text-gray-400
                      py-2.5
                      sm:py-3
                      px-1
                      sm:px-2
                      text-sm
                      sm:text-base
                    "
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="
                    btn
                    min-h-0
                    h-10
                    sm:h-12
                    px-3
                    sm:px-5
                    md:px-7
                    bg-primary
                    hover:bg-secondary
                    text-white
                    border-none
                    rounded-lg
                    sm:rounded-xl
                    transition-all
                    duration-300
                    hover:scale-105
                    shadow-lg
                    shrink-0
                  "
                >
                  <span className="hidden sm:block">
                    Search
                  </span>

                  <MdOutlineSearch className="text-lg sm:text-xl" />
                </button>

              </div>

              {/* Popular Search */}
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  mt-4
                  text-xs
                  sm:text-sm
                "
              >
                <span className="text-black/60">
                  Popular:
                </span>

                <button
                  onClick={() =>
                    handlePopularSearch("Web Development")
                  }
                  className="
                    px-2.5
                    sm:px-3
                    py-1
                    rounded-full
                    bg-primary/20
                    hover:bg-white/20
                    border
                    border-white/10
                    text-white
                   
                    backdrop-blur-sm
                    transition
                  "
                >
                  Web Development
                </button>

                <button
                  onClick={() =>
                    handlePopularSearch("Graphic Design")
                  }
                  className="
                    px-2.5
                    sm:px-3
                    py-1
                    rounded-full
                    bg-primary/20
                    hover:bg-white/20
                    border
                    border-white/10
                    text-white
                   
                    backdrop-blur-sm
                    transition
                  "
                >
                  Graphic Design
                </button>

                <button
                  onClick={() =>
                    handlePopularSearch("Marketing")
                  }
                  className="
                   px-2.5
                    sm:px-3
                    py-1
                    rounded-full
                    bg-primary/20
                    hover:bg-white/20
                    border
                    border-white/10
                    text-white
                   
                    backdrop-blur-sm
                    transition
                  "
                >
                  Marketing
                </button>
              </div>

            </div>

            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;