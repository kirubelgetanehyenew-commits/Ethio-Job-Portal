const Job = require("../models/Job");
const Company = require("../models/Company");

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experience,
      deadline,
    } = req.body;

    // Check if company exists
    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Check ownership
    if (existingCompany.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only post jobs for your own company.",
      });
    }

    const job = await Job.create({
      title,
      description,
      company,
      employer: req.user.id,
      location,
      salary,
      jobType,
      experience,
      deadline,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
};