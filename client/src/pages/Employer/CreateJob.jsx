import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/jobService";

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
    <section className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company ID"
          value={formData.company}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="jobType"
          placeholder="Job Type"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </section>
  );
}

export default CreateJob;