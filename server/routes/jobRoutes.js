const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
  getJobsByCompany,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Public Routes
router.get("/", getAllJobs);

// Employer Routes
router.post("/", protect, authorize("employer"), createJob);

router.get(
  "/my",
  protect,
  authorize("employer"),
  getMyJobs
);

// Get jobs belonging to one company
router.get(
  "/company/:companyId",
  protect,
  authorize("employer"),
  getJobsByCompany
);

router.put(
  "/:id",
  protect,
  authorize("employer"),
  updateJob
);

router.delete(
  "/:id",
  protect,
  authorize("employer"),
  deleteJob
);

// Get single job
router.get("/:id", getJobById);

module.exports = router;