const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Public Routes
router.get("/", getAllJobs);
router.post("/", protect, authorize("employer"), createJob);
router.get("/my", protect, authorize("employer"), getMyJobs);
router.put("/:id", protect, authorize("employer"), updateJob);
router.delete("/:id", protect, authorize("employer"), deleteJob);
router.get("/:id", getJobById);

module.exports = router;