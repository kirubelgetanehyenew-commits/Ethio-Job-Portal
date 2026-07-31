import api from "./api";

export const applyForJob = async (jobId) => {
  const response = await api.post(
    `/applications/${jobId}`,
    {
      coverLetter: "",
    }
  );

  return response.data;
};
export const getMyApplications = async () => {
  const response = await api.get("/applications/my");
  return response.data;
};
export const getApplicationsForJob = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);
  return response.data;
};

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await api.put(
    `/applications/${applicationId}`,
    { status }
  );

  return response.data;
};