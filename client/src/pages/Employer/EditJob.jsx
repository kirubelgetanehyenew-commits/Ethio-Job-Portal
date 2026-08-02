import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../../services/jobService";
import { getMyCompanies } from "../../services/companyService";

function EditJob() {
  const { id } = useParams();
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
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);

        setFormData({
          title: data.job.title,
          description: data.job.description,
          company: data.job.company?._id || data.job.company,
          location: data.job.location,
          salary: data.job.salary,
          jobType: data.job.jobType,
          experience: data.job.experience,
          deadline: data.job.deadline
            ? data.job.deadline.substring(0, 10)
            : "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateJob(id, formData);

      alert(data.message);

      navigate("/employer/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update job."
      );
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 py-12">
  <div className="max-w-4xl mx-auto px-6">

    <div className="mb-10">

      <h1 className="text-5xl font-black text-slate-900">
        Edit Job
      </h1>

      <p className="text-gray-500 mt-3">
        Update your job posting information.
      </p>
</div>


      <form
  onSubmit={handleSubmit}
  className="bg-white rounded-3xl shadow-xl p-10 space-y-6 border border-gray-100"
>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          required
        />

        <textarea
  rows={6}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          required
        />

        <select
  name="company"
  value={formData.company}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
  required
>
  <option value="">Select Company</option>

  {companies.map((company) => (
    <option
      key={company._id}
      value={company._id}
    >
      {company.companyName}
    </option>
  ))}
</select>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          required
        />

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          required
        />

        <input
          type="text"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          placeholder="Job Type"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          required
        />

        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
         className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          required
        />

        <button
  type="submit"
  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all"
>
  Update Job
</button>
      </form>

  </div>

</section>
  );
}

export default EditJob;