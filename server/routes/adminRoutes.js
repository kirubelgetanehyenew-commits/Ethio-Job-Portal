const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getPublicStatistics,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllCompanies,
  deleteCompany,
  getAllJobs,
  deleteJob,
  getAllApplications,
  deleteApplication,
} = require("../controllers/adminController");

// Public Statistics
router.get("/public-statistics", getPublicStatistics);
// Dashboard Statistics
router.get("/dashboard", protect, adminOnly, getDashboardStats);
// User Management
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.put("/users/:id/role", protect, adminOnly, updateUserRole);
router.get("/companies", protect, adminOnly, getAllCompanies);
router.delete("/companies/:id", protect, adminOnly, deleteCompany);
router.get("/jobs", protect, adminOnly, getAllJobs);
router.delete("/jobs/:id", protect, adminOnly, deleteJob);
router.get("/applications", protect, adminOnly, getAllApplications);
router.get("/applications", protect, adminOnly, getAllApplications);
router.delete("/applications/:id", protect, adminOnly, deleteApplication);

module.exports = router;