import { Routes, Route } from "react-router-dom";

// =========================
// Layouts
// =========================
import PublicLayout from "./layouts/PublicLayout";
import EmployerLayout from "./layouts/EmployerLayout";
import JobSeekerLayout from "./layouts/JobSeekerLayout";
import AdminLayout from "./layouts/AdminLayout";

// =========================
// Public Pages
// =========================
import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import JobDetails from "./pages/Jobs/JobDetails";
import Companies from "./pages/Companies/Companies";
import Login from "./pages/Login";
import Register from "./pages/Register";

// =========================
// Employer Pages
// =========================
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import CreateJob from "./pages/Employer/CreateJob";
import EditJob from "./pages/Employer/EditJob";
import MyJobs from "./pages/Employer/MyJobs";
import Applicants from "./pages/Employer/Applicants";
import EditCompany from "./pages/Employer/EditCompany";
import MyCompanies from "./pages/Employer/MyCompanies";
import CreateCompany from "./pages/Employer/CreateCompany";
import CompanyJobs from "./pages/Employer/CompanyJobs";
import EmployerJobDetails from "./pages/Employer/EmployerJobDetails";

// =========================
// Job Seeker Pages
// =========================
import Dashboard from "./pages/JobSeeker/Dashboard";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import MyApplications from "./pages/applications/MyApplications";
import Profile from "./pages/JobSeeker/Profile";

// =========================
// Admin Pages
// =========================
import AdminDashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Records from "./pages/Admin/Records";
import Analytics from "./pages/Admin/Analytics";
import Applications from "./pages/Admin/Applications";

// =========================
// Admin Components
// =========================
import JobsTable from "./components/dashboard/admin/JobsTable";
import CompaniesTable from "./components/dashboard/admin/CompaniesTable";

// =========================
// Protected Route
// =========================
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route element={<PublicLayout />}>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Public Jobs */}
        <Route
          path="/jobs"
          element={<Jobs />}
        />

        {/* Public Job Details */}
        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        {/* Public Companies */}
        <Route
          path="/companies"
          element={<Companies />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

      </Route>


      {/* =====================================================
          EMPLOYER ROUTES
      ===================================================== */}

      <Route
        element={
          <ProtectedRoute allowedRole="employer">
            <EmployerLayout />
          </ProtectedRoute>
        }
      >

        {/* Employer Dashboard */}
        <Route
          path="/employer/dashboard"
          element={<EmployerDashboard />}
        />

        {/* Create Company */}
        <Route
          path="/employer/create-company"
          element={<CreateCompany />}
        />

        {/* My Companies */}
        <Route
          path="/employer/my-companies"
          element={<MyCompanies />}
        />

        {/* Edit Company */}
        <Route
          path="/employer/edit-company/:id"
          element={<EditCompany />}
        />

        {/* Company Jobs */}
        <Route
          path="/employer/company-jobs/:companyId"
          element={<CompanyJobs />}
        />

        {/* My Jobs */}
        <Route
          path="/employer/my-jobs"
          element={<MyJobs />}
        />

        {/* Employer Job Details */}
        <Route
          path="/employer/jobs/:id"
          element={<EmployerJobDetails />}
        />

        {/* Create Job */}
        <Route
          path="/employer/create-job"
          element={<CreateJob />}
        />

        {/* Edit Job */}
        <Route
          path="/employer/edit-job/:id"
          element={<EditJob />}
        />

        {/* Applicants */}
        <Route
          path="/employer/applicants/:jobId"
          element={<Applicants />}
        />

      </Route>


      {/* =====================================================
          JOB SEEKER ROUTES
      ===================================================== */}

      <Route
        element={
          <ProtectedRoute allowedRole="jobseeker">
            <JobSeekerLayout />
          </ProtectedRoute>
        }
      >

        {/* Job Seeker Dashboard */}
        <Route
          path="/jobseeker/dashboard"
          element={<Dashboard />}
        />

        {/* Job Seeker Profile */}
        <Route
          path="/jobseeker/profile"
          element={<Profile />}
        />

        {/* Job Seeker Jobs */}
        <Route
          path="/jobseeker/jobs"
          element={<Jobs />}
        />

        {/* Job Seeker Job Details */}
        <Route
          path="/jobseeker/jobs/:id"
          element={<JobDetails />}
        />

        {/* Job Seeker Companies */}
        <Route
          path="/jobseeker/companies"
          element={<Companies />}
        />

        {/* Job Seeker Saved Jobs */}
        <Route
          path="/jobseeker/saved-jobs"
          element={<SavedJobs />}
        />

        {/* Job Seeker Applications */}
        <Route
          path="/my-applications"
          element={<MyApplications />}
        />

      </Route>


      {/* =====================================================
          ADMIN ROUTES
      ===================================================== */}

      <Route
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* Admin Users */}
        <Route
          path="/admin/users"
          element={<Users />}
        />

        {/* Admin All Records */}
        <Route
          path="/admin/records"
          element={<Records />}
        />

        {/* Admin Jobs */}
        <Route
          path="/admin/jobs"
          element={<JobsTable />}
        />

        {/* Admin Companies */}
        <Route
          path="/admin/companies"
          element={<CompaniesTable />}
        />

        {/* Admin Applications */}
        <Route
          path="/admin/applications"
          element={<Applications />}
        />

        {/* Admin Analytics */}
        <Route
          path="/admin/analytics"
          element={<Analytics />}
        />

      </Route>

    </Routes>
  );
}

export default App;