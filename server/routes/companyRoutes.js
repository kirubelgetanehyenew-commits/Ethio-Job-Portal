const express = require("express");
const router = express.Router();

const { createCompany } = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Employer only
router.post("/", protect, authorize("employer"), createCompany);

module.exports = router;