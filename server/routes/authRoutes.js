const express = require("express");
const router = express.Router();

const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");

const validateRequest = require("../middleware/validateRequest");
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
  "/register",
  registerValidation,
  validateRequest,
  register
);
router.post(
  "/login",
  loginValidation,
  validateRequest,
  login
);
router.get("/profile", protect, getProfile);
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin!",
    });
  }
);

module.exports = router;