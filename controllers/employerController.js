// controllers/employerController.js
const { Company } = require('../models');

exports.dashboard = async (req, res) => {
  try {
    const employerId = req.userId; // Assuming userId is stored in req via authMiddleware

    // Fetch all companies associated with this employer
    const companies = await Company.findAll({ where: { id: employerId } });

    // Render the employer dashboard with the list of companies
    res.render('employerDashboard', { companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error loading dashboard' });
  }
};
