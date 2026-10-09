import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit3,
  FiBookOpen,
} from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";

const Profile = () => {
  const { freelancerId } = useParams();

  const [user, setUser] = useState({});

  const { activeUser, role } = useAuth();

  const axiosSecure = useAxiosSecure()
  const axios = useAxios()

  useEffect(() => {
    if (freelancerId) {
      axios.get(`/profile?id=${freelancerId}`)
      .then(result => {
        setUser(result.data)
      })
      // fetch(`http://localhost:3000/profile?id=${freelancerId}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setUser(data);
      //   });
    } else if (activeUser?.email) {
      axiosSecure.get(`/user?email=${activeUser.email}`)
      .then(result => {
        setUser(result.data)
      })
      
    }
  }, [activeUser, freelancerId]);

  return (
    <div className="min-h-screen bg-base-200/40 px-3 py-6 sm:px-5 sm:py-10">
      <div className="mx-auto max-w-270">
        {/* =========================
            PROFILE HEADER
        ========================== */}

        <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          {/* Cover */}
          <div className="h-32 bg-linear-to-r from-primary/80 via-primary to-secondary sm:h-45"></div>

          {/* Profile information */}
          <div className="relative px-5 pb-6 sm:px-8">
            {/* Profile image */}
            <div className="-mt-14 mb-4 sm:-mt-18">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-base-100 bg-primary/10 text-primary shadow-md sm:h-36 sm:w-36">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user?.name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaRegUser className="text-4xl sm:text-5xl" />
                )}
              </div>
            </div>

            {/* Name + Edit */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {user?.name || "Freelancer"}
                </h1>

                <p className="mt-1 text-sm font-medium text-primary">
                  Freelancer
                </p>

                {user?.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-accent">
                    <FiMapPin />
                    {user.location}
                  </p>
                )}
              </div>

              {/* =========================
                  EDIT BUTTON
                  Only Freelancer can see
              ========================== */}
              {role === "freelancer" && (
                <Link
                  to="/freelancer/profile/update"
                  className="btn btn-primary text-white"
                >
                  <FiEdit3 />
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* =========================
            MAIN CONTENT
        ========================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* =========================
              LEFT SIDE
          ========================== */}

          <div className="space-y-5 lg:col-span-2">
            {/* =========================
                About
            ========================== */}

            <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaRegUser />
                </div>

                <h2 className="text-lg font-bold sm:text-xl">
                  About Me
                </h2>
              </div>

              <p className="text-sm leading-7 text-accent sm:text-base">
                {user?.bio ||
                  "This freelancer hasn't added a professional bio yet."}
              </p>
            </section>

            {/* =========================
                Skills
            ========================== */}

            <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MdOutlineWorkOutline className="text-xl" />
                </div>

                <div>
                  <h2 className="text-lg font-bold sm:text-xl">
                    Skills
                  </h2>

                  <p className="text-xs text-accent">
                    Professional skills and expertise
                  </p>
                </div>
              </div>

              {user?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-accent">
                  No skills have been added yet.
                </p>
              )}
            </section>

            {/* =========================
                Education
            ========================== */}

            <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiBookOpen className="text-xl" />
                </div>

                <h2 className="text-lg font-bold sm:text-xl">
                  Education
                </h2>
              </div>

              {user?.education ? (
                <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4">
                  <h3 className="font-semibold">
                    {user.education.degree || "Degree not specified"}
                  </h3>

                  <p className="mt-1 text-sm text-accent">
                    {user.education.field || "Field not specified"}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-accent">
                  No education information has been added yet.
                </p>
              )}
            </section>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================== */}

          <div className="space-y-5">
            {/* =========================
                Experience
            ========================== */}

            <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MdOutlineWorkOutline className="text-xl" />
                </div>

                <div>
                  <p className="text-xs text-accent">
                    Experience
                  </p>

                  <h3 className="text-xl font-bold">
                    {user?.experience || 0} Years
                  </h3>
                </div>
              </div>
            </section>

            {/* =========================
                Contact
            ========================== */}

            <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 text-lg font-bold">
                Contact Information
              </h2>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiMail />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-accent">
                      Email
                    </p>

                    <p className="break-all text-sm font-medium">
                      {user?.email || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiPhone />
                  </div>

                  <div>
                    <p className="text-xs text-accent">
                      Phone
                    </p>

                    <p className="text-sm font-medium">
                      {user?.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiMapPin />
                  </div>

                  <div>
                    <p className="text-xs text-accent">
                      Location
                    </p>

                    <p className="text-sm font-medium">
                      {user?.location || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================
                PROFILE UPDATE SECTION
                Only Freelancer can see
            ========================== */}

            {role === "freelancer" && (
              <section className="rounded-3xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="font-bold">
                  Keep your profile updated
                </h3>

                <p className="mt-2 text-sm leading-6 text-accent">
                  A complete profile helps clients understand your
                  experience, skills and background.
                </p>

                <Link
                  to="/freelancer/profile/update"
                  className="btn btn-primary btn-sm mt-4 text-white"
                >
                  Update Profile
                </Link>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;