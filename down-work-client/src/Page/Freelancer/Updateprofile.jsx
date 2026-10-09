
import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiBookOpen } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Updateprofile = () => {
  const { activeUser,successAlert } = useAuth();

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [id,setId] = useState(null)
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    experience: "",
    degree: "",
    educationField: "",
  });

  // -----------------------------------
  // Load current user information
  // -----------------------------------

  useEffect(() => {
    if (activeUser?.email) {
      axiosSecure.get(`/user?email=${activeUser.email}`)
      .then(result => {
        console.log(result.data)
        setForm({
            name: result.data?.name || "",
            email: result.data?.email || activeUser.email,
            phone: result.data?.phone || "",
            image: result.data?.image || "",
            location: result.data?.location || "",
            bio: result.data?.bio || "",
            experience: result.data?.experience || "",
            degree: result.data?.education?.degree || "",
            educationField: result.data?.education?.field || "",
          });
          setId(result.data._id)
          setSkills(result.data?.skills || []);
      })
      // fetch(`http://localhost:3000/user?email=${activeUser.email}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setForm({
      //       name: data?.name || "",
      //       email: data?.email || activeUser.email,
      //       phone: data?.phone || "",
      //       image: data?.image || "",
      //       location: data?.location || "",
      //       bio: data?.bio || "",
      //       experience: data?.experience || "",
      //       degree: data?.education?.degree || "",
      //       educationField: data?.education?.field || "",
      //     });
      //     setId(data._id)
      //     setSkills(data?.skills || []);
      //   });
    }
  }, [activeUser?.email]);

  //console.log(form.image)
  // -----------------------------------
  // Handle input change
  // -----------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------------
  // Add skill
  // -----------------------------------

  const handleAddSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (skills.includes(skill)) {
      setSkillInput("");
      return;
    }

    setSkills((prev) => [...prev, skill]);
    setSkillInput("");
  };

  // -----------------------------------
  // Remove skill
  // -----------------------------------

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) =>
      prev.filter((skill) => skill !== skillToRemove)
    );
  };

  // -----------------------------------
  // Submit profile
  // -----------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      bio: form.bio,
      experience: Number(form.experience) || 0,

      skills: skills,

      education: {
        degree: form.degree,
        field: form.educationField,
      },
    };

    fetch(`http://localhost:3000/updateuser?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          
          successAlert("Profile updated successfully!")
          navigate('/freelancer/profile')
        }
      });
  };

  return (
    <div className="min-h-screen bg-base-100 px-3 py-6 sm:px-5 sm:py-10">

      <div className="mx-auto max-w-230">

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <div className="mb-6 rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-sm sm:p-7">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-16 sm:w-16">
              {
                form?.image ? <img src={form.image} alt="" /> : <FiUser className="text-2xl sm:text-3xl" />
              }
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Freelancer Profile
              </p>

              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                Update Your Profile
              </h1>

              <p className="mt-1 text-sm text-accent">
                Keep your professional information up to date.
              </p>
            </div>

          </div>

        </div>

        {/* -------------------------------- */}
        {/* Form */}
        {/* -------------------------------- */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-7"
        >

          {/* Personal Information */}

          <section>

            <div className="mb-5">
              <h2 className="text-lg font-bold sm:text-xl">
                Personal Information
              </h2>

              <p className="text-sm text-accent">
                Tell clients a little about yourself.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="input w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    className="input w-full bg-base-200 pl-10"
                    readOnly
                  />
                </div>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone
                </label>

                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="input w-full pl-10"
                  />
                </div>
              </div>

              {/* Location */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>

                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Dhaka, Bangladesh"
                    className="input w-full pl-10"
                  />
                </div>
              </div>

            </div>

            {/* Bio */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                Professional Bio
              </label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Write a short description about yourself and your professional background..."
                className="textarea min-h-30 w-full"
              ></textarea>
            </div>

          </section>

          <div className="my-8 border-t border-base-300"></div>

          {/* Professional Information */}

          <section>

            <div className="mb-5">
              <h2 className="text-lg font-bold sm:text-xl">
                Professional Information
              </h2>

              <p className="text-sm text-accent">
                Add your experience and technical skills.
              </p>
            </div>

            {/* Experience */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Years of Experience
              </label>

              <div className="relative max-w-sm">
                <MdOutlineWorkOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />

                <input
                  type="number"
                  name="experience"
                  min="0"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className="input w-full pl-10"
                />
              </div>
            </div>

            {/* Skills */}

            <div className="mt-5">

              <label className="mb-2 block text-sm font-medium">
                Skills
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="e.g. React"
                  className="input flex-1"
                />

                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="btn btn-primary text-white"
                >
                  <IoAddOutline className="text-lg" />
                  <span className="hidden sm:inline">
                    Add
                  </span>
                </button>

              </div>

              {skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">

                  {skills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {skill}

                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
                      >
                        <IoCloseOutline />
                      </button>
                    </div>
                  ))}

                </div>
              )}

            </div>

          </section>

          <div className="my-8 border-t border-base-300"></div>

          {/* Education */}

          <section>

            <div className="mb-5">
              <h2 className="text-lg font-bold sm:text-xl">
                Education
              </h2>

              <p className="text-sm text-accent">
                Add your educational background.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Degree
                </label>

                <div className="relative">
                  <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />

                  <input
                    type="text"
                    name="degree"
                    value={form.degree}
                    onChange={handleChange}
                    placeholder="Bachelor's"
                    className="input w-full pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Field of Study
                </label>

                <input
                  type="text"
                  name="educationField"
                  value={form.educationField}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  className="input w-full"
                />
              </div>

            </div>

          </section>

          {/* -------------------------------- */}
          {/* Submit */}
          {/* -------------------------------- */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-base-300 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              className="btn btn-ghost"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary px-8 text-white"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Updateprofile;

