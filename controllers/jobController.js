// controllers/jobController.js
const { Job, Company } = require('../models');

// Render Job Dashboard with Create Job Form and Job Listings
exports.renderJobDashboard = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Fetch the company and its associated jobs
    const company = await Company.findByPk(companyId);
    const jobs = await Job.findAll({ where: { companyId } });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Render the dashboard with company details and job listings
    res.render('jobDashboard', { company, jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error loading job dashboard' });
  }
};

// Handle Job Creation
exports.createJob = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { jobTitle, jobDescription, salary, location, jobType, postingDate, expiryDate } = req.body;

    // Create a new job for the specified company
    await Job.create({
      companyId,
      jobTitle,
      jobDescription,
      salary,
      location,
      jobType,
      postingDate,
      expiryDate,
    });

    res.redirect(`/company/${companyId}/jobs`); // Redirect back to job dashboard to see the updated job listings
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating job' });
  }
};
