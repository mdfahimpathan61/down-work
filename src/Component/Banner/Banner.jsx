import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import Typewriter from "typewriter-effect";

const Banner = () => {
  return (
    <div className="max-w-360 mx-auto relative">
      <div className="">
        <img src="/banner.png" alt="" />
      </div>

      <div className="absolute bg-linear-to-r from-gray-100 to-white/30 inset-0 flex flex-col justify-center  ">
        <div className="p-5 md:ml-20">
          <div className="text-start md:pb-10">
            <h3 className="text-lg md:text-4xl text-black font-semibold">
              <Typewriter
                options={{
                  delay: 200,
                  cursor: "|",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Find your passion Job")

                    .start();
                }}
              />
            </h3>

            <p className=" md:text-2xl font-normal my-2 text-accent">
              Thousend of people have find their job on
              <span className="font-bold md:text-3xl text-primary"> Down Work</span>
            </p>
          </div>
          <div className="md:relative w-6/10 flex">
            <input
              className=" bg-white shadow-md shadow-base-500 md:rounded rounded-r-none w-full md:p-5 py-1 px-3 "
              type="text"
              placeholder="Search here"
            />
            <button className="md:btn-md btn btn-sm max-w-3/10 rounded-none min-w-1/10 bg-primary text-white hover:bg-secondary md:absolute top-3.5 right-10 shadow-sm">
              {" "}
              <span className="hidden md:block">Search</span>{" "}
              <MdOutlineSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
