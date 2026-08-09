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
import Applicants from "./pages/Employer/Applicants";
import EditCompany from "./pages/Employer/EditCompany";
import MyCompanies from "./pages/Employer/MyCompanies";
import CreateCompany from "./pages/Employer/CreateCompany";
import CompanyJobs from "./pages/Employer/CompanyJobs";

// =========================
// Job Seeker Pages
// =========================
import Dashboard from "./pages/JobSeeker/Dashboard";
import MyApplications from "./pages/applications/MyApplications";
import Profile from "./pages/JobSeeker/Profile";

// =========================
// Admin Pages
// =========================
import AdminDashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Analytics from "./pages/Admin/Analytics";

// =========================
// Admin Components
// =========================
import JobsTable from "./components/dashboard/admin/JobsTable";
import CompaniesTable from "./components/dashboard/admin/CompaniesTable";
import Applications from "./pages/Admin/Applications";

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

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

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

        <Route
          path="/employer/dashboard"
          element={<EmployerDashboard />}
        />

        <Route
          path="/employer/create-company"
          element={<CreateCompany />}
        />

        <Route
          path="/employer/my-companies"
          element={<MyCompanies />}
        />

        <Route
          path="/employer/edit-company/:id"
          element={<EditCompany />}
        />

        <Route
          path="/employer/company-jobs/:companyId"
          element={<CompanyJobs />}
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

        <Route
          path="/jobseeker/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/jobseeker/profile"
          element={<Profile />}
        />

        <Route
          path="/jobseeker/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobseeker/jobs/:id"
          element={<JobDetails />}
        />

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
          element={<Applications  />}
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