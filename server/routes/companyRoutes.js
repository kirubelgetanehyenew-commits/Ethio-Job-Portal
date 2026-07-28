const express = require("express");
const router = express.Router();

const {
  createCompany,
  getMyCompanies,
} = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Employer only
router.post("/", protect, authorize("employer"), createCompany);
router.get("/my", protect, authorize("employer"), getMyCompanies);

module.exports = router;