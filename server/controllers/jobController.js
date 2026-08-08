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

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      experience,
      minSalary,
      page = 1,
      limit = 5,
      sort = "newest",
    } = req.query;

    let query = {
      isActive: true,
    };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (jobType) {
      query.jobType = {
        $regex: jobType,
        $options: "i",
      };
    }

    if (experience) {
      query.experience = {
        $regex: experience,
        $options: "i",
      };
    }

    if (minSalary) {
      query.salary = {
        $gte: Number(minSalary),
      };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    if (sort === "salary-high") {
      sortOption = { salary: -1 };
    }

    if (sort === "salary-low") {
      sortOption = { salary: 1 };
    }

    const jobs = await Job.find(query)
      .populate("company", "companyName location industry")
      .populate("employer", "fullName email")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const totalJobs = await Job.countDocuments(query);

    const totalPages = Math.ceil(totalJobs / limitNumber);

    res.status(200).json({
      success: true,
      count: jobs.length,
      currentPage: pageNumber,
      totalPages,
      totalJobs,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Job By ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company", "companyName location industry website")
      .populate("employer", "fullName email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own job.",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own job.",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Jobs
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id })
      .populate("company", "companyName location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Jobs By Company
const getJobsByCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Check that the employer owns the company
    if (company.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only view jobs for your own company.",
      });
    }

    const jobs = await Job.find({
      company: req.params.companyId,
      employer: req.user.id,
    })
      .populate("company", "companyName location industry")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
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
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
  getJobsByCompany,
};