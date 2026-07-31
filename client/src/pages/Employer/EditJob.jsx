import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../../services/jobService";

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

  useEffect(() => {
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
    <section className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company ID"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          placeholder="Job Type"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
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
          Update Job
        </button>
      </form>
    </section>
  );
}

export default EditJob;