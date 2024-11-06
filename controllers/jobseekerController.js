// controllers/jobseekerController.js
console.log("controller is triggered");
const { Job, Company } = require('../models');

// Fetch all job listings
getJobListings = async (req, res) => {
  console.log("getJobListings is triggered");
  try {
    const jobs = await Job.findAll({
      attributes: ['id', 'jobTitle', 'location', 'companyId'],
      include: { model: Company, attributes: ['companyName'] },
    });
 
    res.render('jobseekerDashboard', { jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching job listings' });
  }
};

// Handle job application
applyForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.userId; // Assume this is set by auth middleware

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({ where: { userId, jobId } });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create a new application
    await Application.create({ userId, jobId });
    res.redirect('/jobseekerDashboard'); // Redirect back to job listings
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error applying for job' });
  }
};
module.exports = { getJobListings, applyForJob };
