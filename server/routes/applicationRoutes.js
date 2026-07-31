const express = require("express");
const router = express.Router();

const {
  applyForJob,
  getApplicationsForJob,
  updateApplicationStatus,
  getMyApplications,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

// Apply for a Job (Job Seekers only)
router.post("/:jobId", protect, applyForJob);
router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicationsForJob);
router.put("/:applicationId", protect, updateApplicationStatus);

module.exports = router;