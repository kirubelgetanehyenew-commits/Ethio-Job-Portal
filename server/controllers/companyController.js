const Company = require("../models/Company");

const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      description,
      website,
      logo,
      location,
      industry,
    } = req.body;
    
    // Validate required fields
if (!companyName || !description || !location || !industry) {
  return res.status(400).json({
    success: false,
    message:
      "Company name, description, location, and industry are required.",
  });
}

    // Check if the employer already has a company with the same name
const existingCompany = await Company.findOne({
  companyName,
  owner: req.user.id,
});

if (existingCompany) {
  return res.status(400).json({
    success: false,
    message: "You already created a company with this name.",
  });
}

    const company = await Company.create({
      companyName,
      description,
      website,
      logo,
      location,
      industry,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Check ownership
    if (company.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own company.",
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createCompany,
  getMyCompanies,
  getCompanyById,
  updateCompany,
};