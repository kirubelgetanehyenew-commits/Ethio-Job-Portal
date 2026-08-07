const express = require("express");
const router = express.Router();

const {
  getStatistics,
} = require("../controllers/statController");

router.get("/", getStatistics);

module.exports = router;