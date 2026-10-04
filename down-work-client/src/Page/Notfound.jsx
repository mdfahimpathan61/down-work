
import React from "react";
import { Link } from "react-router";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";
import { IoSadOutline } from "react-icons/io5";

const Notfound = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl text-center">

        {/* 404 */}

        <div className="relative mb-6">

          <h1 className="text-[100px] sm:text-[150px] md:text-[180px] font-black leading-none text-primary/10 select-none">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-sm">
              <IoSadOutline className="text-4xl sm:text-5xl" />
            </div>
          </div>

        </div>

        {/* Content */}

        <div className="rounded-3xl border border-base-300 bg-base-200/40 p-6 sm:p-10 shadow-sm">

          <h2 className="text-2xl sm:text-3xl font-bold">
            Page Not Found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm sm:text-base text-accent">
            Sorry, the page you're looking for doesn't exist or may have
            been moved to another location.
          </p>

          {/* Buttons */}

          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">

            <Link
              to="/"
              className="btn btn-primary text-white rounded-xl px-6"
            >
              <FiHome className="text-lg" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn btn-outline rounded-xl px-6"
            >
              <FiArrowLeft className="text-lg" />
              Go Back
            </button>

          </div>

        </div>

        {/* Small hint */}

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-accent">
          <FiSearch />
          <span>Try checking the URL or return to the homepage.</span>
        </div>

      </div>

    </div>
  );
};

export default Notfound;

