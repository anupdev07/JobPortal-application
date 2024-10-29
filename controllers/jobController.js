const { Job, Company } = require('../models');


// Render Job Creation Form
exports.renderCreateJobForm = (req, res) => {
  const { companyId } = req.params; // Get companyId from the route
  res.render('createJob', { companyId }); // Pass companyId to the form
};

// Handle Job Creation
exports.createJob = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { jobTitle, jobDescription, salary, location, jobType, postingDate, expiryDate } = req.body;

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

    res.redirect(`/company/${companyId}/jobs`); // Redirect to job listings for the company
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating job' });
  }
};

exports.renderJobDashboard = async (req, res) => {
    try {
      const { companyId } = req.params;
  
      // Fetch the company details to display on the dashboard
      const company = await Company.findByPk(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      res.render('jobDashboard', { company });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error loading job dashboard' });
    }
  };

  // controllers/jobController.js

exports.viewJobs = async (req, res) => {
    try {
      const { companyId } = req.params;
      const jobs = await Job.findAll({ where: { companyId } });
  
      res.render('viewJobs', { jobs, companyId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving jobs' });
    }
  };
  

