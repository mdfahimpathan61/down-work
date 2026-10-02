import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  WalletCards,
  FileText,
  GraduationCap,
  Gift,
  Clock3,
  Send,
  Plus,
  Trash2,
  Upload,
  ChevronRight,
  Check,
  Sparkles,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import { data, useLoaderData, useParams } from "react-router";

const initialForm = {
  title: "",
  category: "",
  job_type: "",
  employment_type: "",

  companyName: "",
  companyWebsite: "",
  industry: "",
  companySize: "",
  companyLogo: "",

  country: "",
  city: "",
  address: "",
  work_mode: "",

  experienceLevel: "",
  minExperience: "",
  maxExperience: "",

  currency: "BDT",
  minSalary: "",
  maxSalary: "",
  salaryPeriod: "Monthly",
  negotiable: true,

  description: "",

  responsibilities: [""],
  requirements: [""],
  preferred_qualifications: [""],

  skills: [],

  degree: "",
  educationField: "",
  educationRequired: false,

  benefits: [""],

  workingDays: "",
  startTime: "09:00 AM",
  endTime: "06:00 PM",

  vacancy: 1,

  applicationMethod: "",
  applicationEmail: "",
  applyUrl: "",
  deadline: "",

  status: "Open",
  featured: false,
};

const categories = [
  "Customer Support",
  "Software & IT",
  "UI/UX Design",

  "Web Development",
  "Data Science",
  "Human Resources",
  "Sales & Marketing",
  "Finance & Accounting",
];

const skillsList = [
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "PHP",
  "WordPress",
  "Figma",
  "UI Design",
  "UX Design",
  "SEO",
  "Google Analytics",
  "SQL",
  "Excel",
  "Power BI",
  "REST API",
  "Git",
];

const sections = [
  { id: "basic", label: "Basic Information", icon: BriefcaseBusiness },
  { id: "company", label: "Company", icon: Building2 },
  { id: "location", label: "Location", icon: MapPin },
  { id: "compensation", label: "Compensation", icon: WalletCards },
  { id: "details", label: "Job Details", icon: FileText },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "benefits", label: "Benefits", icon: Gift },
  { id: "schedule", label: "Schedule", icon: Clock3 },
  { id: "application", label: "Application", icon: Send },
];

function Input({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
      required 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </div>
  );
}

function Select({
  label,
  required,
  value,
  onChange,
  children,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <select
      required
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-primary focus:ring-4 focus:ring-primary/10"
      >
        {children}
      </select>
    </div>
  );
}

function Textarea({ label, required, value, onChange, placeholder, rows = 5 }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <textarea
      required
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </div>
  );
}

function Section({ id, icon: Icon, title, description, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-primary">
          <Icon size={19} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}

function Repeater({ label, values, setValues, placeholder, required = false }) {
  const updateItem = (index, value) => {
    const next = [...values];
    next[index] = value;
    setValues(next);
  };

  const addItem = () => {
    setValues([...values, ""]);
  };

  const removeItem = (index) => {
    if (values.length === 1) return;

    setValues(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>

        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary"
        >
          <Plus size={16} />
          Add another
        </button>
      </div>

      <div className="space-y-3">
        {values.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-500">
              {index + 1}
            </div>

            <input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="h-11 flex-1 rounded-xl border border-slate-200 px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Postjob({ mode }) {
  const [form, setForm] = useState(initialForm);
  const [activeSection, setActiveSection] = useState("basic");
  const [skillInput, setSkillInput] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [date, setDate] = useState("posted_date");
  const { activeUser, successAlert } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/category")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
      });

    if (mode == "update") {
      fetch(`http://localhost:3000/jobs?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setForm(data);
          setDate("updated_date");
        });
    }
  }, [id, mode]);
  // console.log(allCategories)
  const update = (field, value) => {
    if (field == "category") {
      //console.log(allCategories)
      const category = allCategories.find((category) => category.name == value);
      if (category) {
        //console.log(category._id)
        setForm((prev) => ({
          ...prev,
          category_id: category._id,
        }));
      }
    }
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const scrollToSection = (id) => {
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const addSkill = (skill) => {
    const cleanSkill = skill.trim();

    if (!cleanSkill) return;

    if (!form.skills.includes(cleanSkill)) {
      update("skills", [...form.skills, cleanSkill]);
    }

    setSkillInput("");
  };

  const removeSkill = (skill) => {
    update(
      "skills",
      form.skills.filter((item) => item !== skill),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      category_id: form.category_id,

      title: form.title,

      company: {
        name: form.companyName,
        website: form.companyWebsite,
        industry: form.industry,
        company_size: form.companySize,
        logo: form.companyLogo,
      },

      location: {
        city: form.city,
        country: form.country,
        address: form.address,
        work_mode: form.work_mode,
      },

      job_type: form.job_type,

      employment_type: form.employment_type,

      experience: {
        minimum: Number(form.minExperience) || 0,
        maximum: Number(form.maxExperience) || 0,
        level: form.experienceLevel,
      },

      salary: {
        currency: form.currency,
        minimum: Number(form.minSalary) || 0,
        maximum: Number(form.maxSalary) || 0,
        period: form.salaryPeriod,
        negotiable: form.negotiable,
      },

      description: form.description,

      responsibilities: form.responsibilities,

      requirements: form.requirements,

      preferred_qualifications: form.preferred_qualifications,

      skills: form.skills,

      education: [
        {
          degree: form.degree,
          field: form.educationField,
          required: form.educationRequired,
        },
      ],

      benefits: form.benefits,

      working_hours: {
        days: form.workingDays,
        start: form.startTime,
        end: form.endTime,
      },

      vacancy: Number(form.vacancy) || 0,

      application: {
        deadline: form.deadline,
        method: form.applicationMethod,
        email: form.applicationEmail,
        apply_url: form.applyUrl,
      },
      status:form.status,

      client: activeUser.email,

      [date]: new Date(),
    };

    if (mode == "create") {
      fetch("http://localhost:3000/jobpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            successAlert("You Successfully Create a job");
          }
        });
    }
    else{
      fetch(`http://localhost:3000/updatejob?id=${id}`,{
        method:"PATCH",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        //console.log(data.acknowledged)
        if(data.acknowledged){
          successAlert("Your job is updated.")
        }
      })
      console.log(payload)
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header */}

      <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <p className="px-3 pb-3 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Job Information
              </p>

              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const active = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-slate-600 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <Icon size={17} />
                      <span>{section.label}</span>
                      {active && <ChevronRight size={15} className="ml-auto" />}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-slate-800">
                    Job quality
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[35%] rounded-full bg-primary" />
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Complete all required fields before publishing.
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <form
            id="create-job-form"
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl space-y-6"
          >
            {/* Basic */}
            <Section
              id="basic"
              icon={BriefcaseBusiness}
              title="Basic Information"
              description="Start with the core information about this position."
            >
              <div className="grid gap-5">
                <Input
                  name="title"
                  required
                  label="Job Title"
                  
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                />

                <div className="grid gap-5 md:grid-cols-3">
                  <Select
                    name="category"
                    label="Category"
                    required
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </Select>

                  <Select
                    label="Job Type"
                    required
                    value={form.job_type}
                    onChange={(e) => update("job_type", e.target.value)}
                  ><option value="" disabled>Select Job Type</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Freelance</option>
                    <option>Internship</option>
                  </Select>

                  <Select
                    label="Employment Type"
                    value={form.employment_type}
                    onChange={(e) => update("employment_type", e.target.value)}
                  >
                    <option value="" disabled>Select Type</option>
                    <option>Permanent</option>
                    <option>Contractual</option>
                    <option>Temporary</option>
                  </Select>
                </div>

                <Textarea
                  label="Job Description"
                  required
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe the role, team, and what the successful candidate will work on..."
                  rows={7}
                />
              </div>
            </Section>

            {/* Company */}
            <Section
              id="company"
              icon={Building2}
              title="Company Information"
              description="Tell candidates about the company hiring for this position."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Company Name"
                  required
                  required
                  value={mode == 'update' ? form.company?.name : form.companyName }
                  onChange={(e) => update("companyName", e.target.value)}
                  placeholder="e.g. DigitalEdge Solutions"
                />

                <Input
                  label="Company Website"
                  required
                  value={mode == 'update'? form.company?.website : form.companyWebsite}
                  onChange={(e) => update("companyWebsite", e.target.value)}
                  placeholder="https://company.com"
                />

                <Input
                  label="Industry"
                  required
                  value={mode == 'update'?form.company?.industry: form.industry}
                  onChange={(e) => update("industry", e.target.value)}
                  placeholder="e.g. Software & IT"
                />

                <Select
                  label="Company Size"
                  value={mode == 'update'?form.company?.companySize : form.companySize}
                  onChange={(e) => update("companySize", e.target.value)}
                >
                  <option value="">Select company size</option>
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>500+ employees</option>
                </Select>

                <Input
                  label="Company Logo URL"
                  required
                  
                  value={mode == 'update'?form.company?.logo : form.companyLogo}
                  placeholder="Upload company logo URL"
                  className=""
                  onChange={(e) => update("companyLogo", e.target.value)}
                />
              </div>
            </Section>

            {/* Location */}
            <Section
              id="location"
              icon={MapPin}
              title="Location & Workplace"
              description="Define where the candidate will work."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Country"
                  required
                  
                  value={mode == 'update'? form.location?.country : form.country}
                  onChange={(e) => update("country", e.target.value)}
                  placeholder="Bangladesh"
                />

                <Input
                  label="City"
                  required
                  
                  value={mode == 'update'?form.location?.city : form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Dhaka"
                />

                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    required
                    value={mode == 'update'?form.location?.address:form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="e.g. Dhanmondi, Dhaka"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-medium text-slate-700">
                    Work Mode <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {["On-site", "Hybrid", "Remote"].map((mode) => {
                      const active =mode == 'update'? form.location?.work_mode :form.work_mode === mode;

                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => update("work_mode", mode)}
                          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                            active
                              ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/10"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {active && (
                            <Check size={15} className="mr-1.5 inline" />
                          )}
                          {mode}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Section>

            {/* Compensation */}
            <Section
              id="compensation"
              icon={WalletCards}
              title="Experience & Compensation"
              description="Set experience requirements and salary details."
            >
              <div className="grid gap-5 md:grid-cols-3">
                <Select
                  label="Experience Level"
                  required
                  value={mode == 'update'?form.experience?.level:form.experienceLevel}
                  onChange={(e) => update("experienceLevel", e.target.value)}
                >
                  <option value="">Select level</option>
                  <option>Entry Level</option>
                  <option>Junior</option>
                  <option>Junior / Mid Level</option>
                  <option>Mid Level</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </Select>

                <Input
                  label="Minimum Experience"
                  required
                  type="number"
                  value={mode == 'update'?form.experience?.minimum:form.minExperience}
                  onChange={(e) => update("minExperience", e.target.value)}
                  placeholder="0"
                />

                <Input
                  label="Maximum Experience"
                  required
                  type="number"
                  value={mode == 'update'?form.experience?.maximum:form.maxExperience}
                  onChange={(e) => update("maxExperience", e.target.value)}
                  placeholder="5"
                />
              </div>

              <div className="my-6 border-t border-slate-100" />

              <div className="grid gap-5 md:grid-cols-4">
                <Select
                  label="Currency"
                  value={mode == 'update'?form.salary?.currency:form.currency}
                  onChange={(e) => update("currency", e.target.value)}
                >
                  <option>BDT</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </Select>

                <Input
                  label="Minimum Salary"
                  required
                  type="number"
                  value={mode == 'update'?form.salary?.minimum:form.minSalary}
                  onChange={(e) => update("minSalary", e.target.value)}
                  placeholder="30000"
                />

                <Input
                  label="Maximum Salary"
                  required
                  type="number"
                  value={mode == 'update'?form.salary?.maximum : form.maxSalary}
                  onChange={(e) => update("maxSalary", e.target.value)}
                  placeholder="50000"
                />

                <Select
                  label="Salary Period"
                  value={mode == 'update'?form.salary?.period: form.salaryPeriod}
                  onChange={(e) => update("salaryPeriod", e.target.value)}
                >
                  <option>Monthly</option>
                  <option>Yearly</option>
                  <option>Weekly</option>
                  <option>Hourly</option>
                </Select>
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={mode == 'update'?form.salary?.negotiable:form.negotiable}
                  onChange={(e) => update("negotiable", e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700">
                  Salary is negotiable
                </span>
              </label>
            </Section>

            {/* Details */}
            <Section
              id="details"
              icon={FileText}
              title="Job Details"
              description="Add responsibilities, requirements and skills."
            >
              <div className="space-y-8">
                <Repeater
                  label="Responsibilities"
                  required
                  values={form.responsibilities}
                  setValues={(value) => update("responsibilities", value)}
                  placeholder="e.g. Collaborate with team members and stakeholders."
                />

                <Repeater
                  label="Requirements"
                  required
                  values={form.requirements}
                  setValues={(value) => update("requirements", value)}
                  placeholder="e.g. 2+ years of relevant experience."
                />

                <Repeater
                  label="Preferred Qualifications"
                  values={form.preferred_qualifications}
                  setValues={(value) =>
                    update("preferred_qualifications", value)
                  }
                  placeholder="e.g. Experience with REST API."
                />

                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-700">
                    Skills
                  </label>

                  <div className="rounded-xl border border-slate-200 p-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {form.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-primary"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-primary/60 hover:text-primary"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                      placeholder="Type a skill and press Enter..."
                      className="h-9 w-full border-0 text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {skillsList
                      .filter((skill) => !form.skills.includes(skill))
                      .slice(0, 10)
                      .map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-primary"
                        >
                          + {skill}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Education */}
            <Section
              id="education"
              icon={GraduationCap}
              title="Education"
              description="Define the educational background required for this role."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Select
                  label="Degree"
                  value={form.degree}
                  onChange={(e) => update("degree", e.target.value)}
                >
                  <option value="">Select degree</option>
                  <option>High School</option>
                  <option>Diploma</option>
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>PhD</option>
                </Select>

                <Input
                  label="Field of Study"
                  required
                  value={form.educationField}
                  onChange={(e) => update("educationField", e.target.value)}
                  placeholder="e.g. Computer Science / Software Engineering"
                />
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.educationRequired}
                  onChange={(e) =>
                    update("educationRequired", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700">
                  This education requirement is mandatory
                </span>
              </label>
            </Section>

            {/* Benefits */}
            <Section
              id="benefits"
              icon={Gift}
              title="Benefits"
              description="Highlight the benefits candidates will receive."
            >
              <Repeater
                label="Job Benefits"
                values={form.benefits}
                setValues={(value) => update("benefits", value)}
                placeholder="e.g. Professional development opportunities"
              />
            </Section>

            {/* Schedule */}
            <Section
              id="schedule"
              icon={Clock3}
              title="Working Hours"
              description="Set the regular working schedule for this position."
            >
              <div className="grid gap-5 md:grid-cols-3">
                <Input
                  label="Working Days"
                  required
                  value={form.workingDays}
                  onChange={(e) => update("workingDays", e.target.value)}
                  placeholder="Sunday - Thursday"
                />

                <Input
                  label="Start Time"
                  required
                  type="time"
                  value={form.startTime}
                  onChange={(e) => update("startTime", e.target.value)}
                />

                <Input
                  label="End Time"
                  required
                  type="time"
                  value={form.endTime}
                  onChange={(e) => update("endTime", e.target.value)}
                />
              </div>
            </Section>

            {/* Application */}
            <Section
              id="application"
              icon={Send}
              title="Hiring & Application"
              description="Tell candidates how and when they can apply."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Number of Vacancies"
                  required
                  required
                  type="number"
                  value={form.vacancy}
                  onChange={(e) => update("vacancy", Number(e.target.value))}
                  placeholder="1"
                />

                <Select
                  label="Application Method"
                  value={form.applicationMethod}
                  onChange={(e) => update("applicationMethod", e.target.value)}
                >
                  <option>Online</option>
                  <option>Email</option>
                  <option>External Website</option>
                </Select>

                <Input
                  label="Application Email"
                  required
                  type="email"
                  value={form.applicationEmail}
                  onChange={(e) => update("applicationEmail", e.target.value)}
                  placeholder="careers@company.com"
                />

                

                <Input
                  label="Application Deadline"
                  required
                  type="date"
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />

                <Select
                  label="Status"
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="hired">Hired</option>
                </Select>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Feature this job
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Highlight this job in featured listings.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => update("featured", !form.featured)}
                    className={`relative h-6 w-11 rounded-full transition ${
                      form.featured ? "bg-primary" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                        form.featured ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Section>

            {/* Bottom actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setForm(initialForm)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Reset Form
              </button>

              <button
                type="submit"
                onClick={() => update("status", "Open")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary"
              >
                {mode == "update" ? "Update" : " Publish Job"}
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
