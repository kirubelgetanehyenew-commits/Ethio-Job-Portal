import api from "./api";

// Get all jobs
export const getAllJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

// Get single job by ID
export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

// Get jobs created by the logged-in employer
export const getMyJobs = async () => {
  const response = await api.get("/jobs/my");
  return response.data;
};

// Get jobs belonging to a specific company
export const getJobsByCompany = async (companyId) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/jobs/company/${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Create a new job
export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

// Update a job
export const updateJob = async (id, jobData) => {
  const response = await api.put(`/jobs/${id}`, jobData);
  return response.data;
};

// Delete a job
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};