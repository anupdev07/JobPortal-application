// routes/job.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

// Render form to create a new job for a specific company
router.get('/company/:companyId/create', authMiddleware, jobController.renderCreateJobForm);

// Render job dashboard for a specific company
router.get('/company/:companyId/jobs', authMiddleware, jobController.renderJobDashboard);

// Render job creation form for a specific company
router.get('/company/:companyId/jobs/create', authMiddleware, jobController.renderCreateJobForm);

// Handle job creation for a specific company
router.post('/company/:companyId/jobs/create', authMiddleware, jobController.createJob);

// Handle job creation for a specific company
router.post('/company/:companyId/create', authMiddleware, jobController.createJob);

// Route to view job listings
router.get('/company/:companyId/jobs/view', authMiddleware, jobController.viewJobs);

module.exports = router;
