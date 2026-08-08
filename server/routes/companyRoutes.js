const express = require("express");
const router = express.Router();

const {
  createCompany,
  getMyCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getAllCompaniesPublic,
} = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Public
router.get("/", getAllCompaniesPublic);
// Employer only
router.post("/", protect, authorize("employer"), createCompany);
router.get("/my", protect, authorize("employer"), getMyCompanies);
router.get("/:id", protect, getCompanyById);
router.put("/:id", protect, authorize("employer"), updateCompany);
router.delete(
  "/:id",
  protect,
  authorize("employer"),
  deleteCompany
);

module.exports = router;