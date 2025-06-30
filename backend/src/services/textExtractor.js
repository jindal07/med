import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

export class TextExtractor {
  /**
   * Extract text from a file based on its type
   * @param {string} filePath - Path to the file
   * @param {string} fileType - Type of file (pdf, docx, txt)
   * @returns {Promise<string>} - Extracted text
   */
  static async extractText(filePath, fileType) {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      
      switch (fileType.toLowerCase()) {
        case 'pdf':
          return await this.extractFromPDF(fileBuffer);
        case 'docx':
          return await this.extractFromDOCX(fileBuffer);
        case 'txt':
          return await this.extractFromTXT(fileBuffer);
        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }
    } catch (error) {
      console.error('Text extraction error:', error);
      throw new Error(`Failed to extract text from file: ${error.message}`);
    }
  }

  /**
   * Extract text from PDF file
   * @param {Buffer} fileBuffer - PDF file buffer
   * @returns {Promise<string>} - Extracted text
   */
  static async extractFromPDF(fileBuffer) {
    try {
      const data = await pdfParse(fileBuffer);
      return data.text;
    } catch (error) {
      throw new Error(`PDF extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract text from DOCX file
   * @param {Buffer} fileBuffer - DOCX file buffer
   * @returns {Promise<string>} - Extracted text
   */
  static async extractFromDOCX(fileBuffer) {
    try {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value;
    } catch (error) {
      throw new Error(`DOCX extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract text from TXT file
   * @param {Buffer} fileBuffer - TXT file buffer
   * @returns {Promise<string>} - Extracted text
   */
  static async extractFromTXT(fileBuffer) {
    try {
      return fileBuffer.toString('utf-8');
    } catch (error) {
      throw new Error(`TXT extraction failed: ${error.message}`);
    }
  }

  /**
   * Get file type from filename
   * @param {string} filename - Name of the file
   * @returns {string} - File type
   */
  static getFileType(filename) {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
      case '.pdf':
        return 'pdf';
      case '.docx':
        return 'docx';
      case '.txt':
        return 'txt';
      default:
        throw new Error(`Unsupported file extension: ${ext}`);
    }
  }
} 