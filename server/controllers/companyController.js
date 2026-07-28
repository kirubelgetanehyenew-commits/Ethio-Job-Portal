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
module.exports = {
  createCompany,
  getMyCompanies,
};