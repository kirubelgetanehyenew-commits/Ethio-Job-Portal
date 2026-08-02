import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/jobService";
import { getMyCompanies } from "../../services/companyService";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Award,
  FileText,
} from "lucide-react";

function CreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    deadline: "",
  });
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const data = await getMyCompanies();
      setCompanies(data.companies);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCompanies();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createJob(formData);

      alert(data.message);

      navigate("/employer/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create job."
      );
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 py-12">

      <div className="max-w-5xl mx-auto px-6">

        <div className="mb-10">

          <p className="uppercase tracking-widest text-orange-500 font-bold">
            Employer
          </p>

          <h1 className="text-5xl font-black text-slate-900 mt-2">
            Create New Job
          </h1>

          <p className="text-slate-500 mt-3">
            Publish a professional job listing and reach thousands of candidates.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-10"
        >

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <label className="font-semibold mb-2 block">
                Job Title
              </label>

              <div className="relative">

                <Briefcase
                  className="absolute left-4 top-4 text-orange-500"
                  size={20}
                />

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                />

              </div>

            </div>

            <div>

            <label className="font-semibold mb-2 block">
  Company
</label>

<div className="relative">

  <Building2
    className="absolute left-4 top-4 text-orange-500 z-10"
    size={20}
    style={{ top: "18px" }}
  />

  <select
    name="company"
    value={formData.company}
    onChange={handleChange}
    className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-400 outline-none appearance-none bg-white"
    required
  >
    <option value="">
      Select Your Company
    </option>

    {companies.map((company) => (
      <option
        key={company._id}
        value={company._id}
      >
        {company.companyName}
      </option>
    ))}

  </select>

</div>

            </div>

            <div>

              <label className="font-semibold mb-2 block">
                Location
              </label>

              <div className="relative">

                <MapPin
                  className="absolute left-4 top-4 text-orange-500"
                  size={20}
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Addis Ababa"
                  className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                />

              </div>

            </div>

            <div>

              <label className="font-semibold mb-2 block">
                Salary (ETB)
              </label>

              <div className="relative">

                <DollarSign
                  className="absolute left-4 top-4 text-orange-500"
                  size={20}
                />

                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="30000"
                  className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                />

              </div>

            </div>

            <div>

              <label className="font-semibold mb-2 block">
                Job Type
              </label>

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
                required
              >
                <option value="">Select Job Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>

            </div>

            <div>

              <label className="font-semibold mb-2 block">
                Experience
              </label>

              <div className="relative">

                <Award
                  className="absolute left-4 top-4 text-orange-500"
                  size={20}
                />

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="2 Years"
                  className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                />

              </div>

            </div>

          </div>

          <div className="mt-8">

            <label className="font-semibold mb-2 block">
              Application Deadline
            </label>

            <div className="relative">

              <Calendar
                className="absolute left-4 top-4 text-orange-500"
                size={20}
              />

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

            </div>

          </div>

          <div className="mt-8">

            <label className="font-semibold mb-2 block">
              Job Description
            </label>

            <div className="relative">

              <FileText
                className="absolute left-4 top-4 text-orange-500"
                size={20}
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="8"
                placeholder="Describe the role, responsibilities and qualifications..."
                className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-400 outline-none resize-none"
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className="mt-10 w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-2xl transition duration-300"
          >
            Publish Job
          </button>

        </form>

      </div>

    </section>
  );
}

export default CreateJob;