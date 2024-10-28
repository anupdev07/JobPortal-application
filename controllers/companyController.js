// controllers/companyController.js
const { Company } = require('../models');

exports.renderRegisterForm = (req, res) => {
  res.render('companyRegister'); // Render the company registration form
};

exports.registerCompany = async (req, res) => {
  try {
    const { companyName, address, contactInfo } = req.body;
    const userId = req.userId; // Get employer's user ID from the auth middleware

    // Check if the employer already has a registered company
    // const existingCompany = await Company.findOne({ where: { id: userId } });
    // if (existingCompany) {
    //   return res.redirect('/employer/dashboard'); // Redirect to the dashboard if a company already exists
    // }

    // Register a new company
    await Company.create({
      id: userId, // Link company to the employer's user ID
      companyName,
      address,
      contactInfo
    });

    res.redirect('/employer/dashboard'); // Redirect to dashboard after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
