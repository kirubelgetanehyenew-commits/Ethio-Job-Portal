const express = require("express");
const router = express.Router();

const { createJob } = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Create Job (Employer only)
router.post("/", protect, authorize("employer"), createJob);

module.exports = router;