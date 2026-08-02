import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import JobDetails from "./pages/jobs/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MyApplications from "./pages/applications/MyApplications";

import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import JobSeekerDashboard from "./pages/JobSeeker/Dashboard";
import CreateJob from "./pages/Employer/CreateJob";
import EditJob from "./pages/Employer/EditJob";
import Applicants from "./pages/Employer/Applicants";
import Jobs from "./pages/Jobs/Jobs";
import Companies from "./pages/Companies/Companies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Job Seeker */}
          <Route
            path="/my-applications"
            element={<MyApplications />}
          />

          <Route
            path="/jobseeker/dashboard"
            element={<JobSeekerDashboard />}
          />

          {/* Employer */}
          <Route
            path="/employer/dashboard"
            element={<EmployerDashboard />}
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
          <Route
           path="/employer/create-job"
            element={<CreateJob />}
          />
          <Route
  path="/employer/edit-job/:id"
  element={<EditJob />}
/>
<Route
  path="/employer/applicants/:jobId"
  element={<Applicants />}
/>
<Route path="/jobs" element={<Jobs />} />
<Route path="/companies" element={<Companies />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;