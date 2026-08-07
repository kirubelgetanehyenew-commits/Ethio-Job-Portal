const User = require("../models/User");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");

const getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEmployers = await User.countDocuments({
      role: "employer",
    });

    const totalJobSeekers = await User.countDocuments({
      role: "jobseeker",
    });

    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      success: true,
      statistics: {
        totalUsers,
        totalEmployers,
        totalJobSeekers,
        totalCompanies,
        totalJobs,
        totalApplications,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStatistics,
};