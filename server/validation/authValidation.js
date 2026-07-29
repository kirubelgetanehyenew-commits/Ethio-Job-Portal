const { body } = require("express-validator");

const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),

  body("role")
    .isIn(["admin", "employer", "jobseeker"])
    .withMessage("Invalid role."),
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required."),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];

module.exports = {
  registerValidation,
  loginValidation,
};