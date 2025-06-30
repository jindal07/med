import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import upload, { handleUploadError } from '../middleware/upload.js';
import { uploadReport, listReports, getReport } from '../controllers/reportController.js';

const router = express.Router();

// POST /upload/report (protected, file upload)
router.post(
  '/upload/report',
  authenticateToken,
  upload.single('file'),
  handleUploadError,
  uploadReport
);

// GET /reports (protected, list user's reports)
router.get('/reports', authenticateToken, listReports);

// GET /reports/:id (protected, get single report)
router.get('/reports/:id', authenticateToken, getReport);

export default router; 