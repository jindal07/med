import prisma from '../lib/prisma.js';
import { TextExtractor } from '../services/textExtractor.js';
import { AIService } from '../services/aiService.js';
import path from 'path';

export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    const { originalname, filename, mimetype, size, path: filePath } = req.file;
    const fileType = TextExtractor.getFileType(originalname);
    const extractedText = await TextExtractor.extractText(filePath, fileType);
    // AI summarization
    const summaryObj = await AIService.summarizeReport(extractedText);
    // AI keyword extraction
    const keywords = await AIService.extractKeywords(extractedText);
    // Save report in DB
    const report = await prisma.report.create({
      data: {
        fileName: originalname,
        filePath: filename,
        fileSize: size,
        fileType: fileType,
        extractedText,
        summary: summaryObj.summary,
        diagnosis: summaryObj.diagnosis,
        abnormalResults: summaryObj.abnormalResults,
        nextSteps: summaryObj.nextSteps,
        keywords,
        user: { connect: { id: req.user.id } },
      },
    });
    return res.status(201).json({ success: true, report });
  } catch (error) {
    console.error('Upload report error:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload and process report.' });
  }
};

export const listReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: { userId: req.user.id },
      orderBy: { uploadedAt: 'desc' },
      select: {
        id: true,
        fileName: true,
        filePath: true,
        uploadedAt: true,
        summary: true,
        diagnosis: true,
        abnormalResults: true,
        nextSteps: true,
        keywords: true,
      },
    });
    return res.json({ success: true, reports });
  } catch (error) {
    console.error('List reports error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch reports.' });
  }
};

export const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await prisma.report.findUnique({
      where: { id },
      select: {
        id: true,
        fileName: true,
        filePath: true,
        uploadedAt: true,
        summary: true,
        diagnosis: true,
        abnormalResults: true,
        nextSteps: true,
        keywords: true,
        extractedText: true,
      },
    });
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }
    // Only allow access to user's own reports
    const userReport = await prisma.report.findFirst({ where: { id, userId: req.user.id } });
    if (!userReport) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }
    return res.json({ success: true, report });
  } catch (error) {
    console.error('Get report error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch report.' });
  }
}; 