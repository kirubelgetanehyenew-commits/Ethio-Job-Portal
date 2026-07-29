const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllCompanies,
  deleteCompany,
  getAllJobs,
  deleteJob,
  getAllApplications,
} = require("../controllers/adminController");

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

module.exports = router;