import OpenAI from 'openai';
import { config } from '../config/env.js';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export class AIService {
  /**
   * Summarize medical report text
   * @param {string} text - Medical report text
   * @returns {Promise<Object>} - Summary with diagnosis, abnormal results, and next steps
   */
  static async summarizeReport(text) {
    try {
      const prompt = `
        Analyze the following medical report and provide a structured summary. 
        Extract and organize the information into these categories:
        
        1. Summary: A concise overview of the patient's condition and findings
        2. Diagnosis: The primary diagnosis or diagnoses
        3. Abnormal Results: Any abnormal test results or findings
        4. Next Steps: Recommended actions, treatments, or follow-up instructions
        
        Medical Report:
        ${text}
        
        Please respond in JSON format:
        {
          "summary": "brief summary",
          "diagnosis": "diagnosis",
          "abnormalResults": "abnormal results",
          "nextSteps": "next steps"
        }
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a medical assistant that helps summarize medical reports. Provide accurate, clear, and structured summaries."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const response = completion.choices[0].message.content;
      
      // Try to parse JSON response
      try {
        return JSON.parse(response);
      } catch (parseError) {
        // If JSON parsing fails, return structured text
        return {
          summary: response,
          diagnosis: "See summary for details",
          abnormalResults: "See summary for details",
          nextSteps: "See summary for details"
        };
      }
    } catch (error) {
      console.error('AI summarization error:', error);
      throw new Error(`Failed to summarize report: ${error.message}`);
    }
  }

  /**
   * Extract medical keywords from text
   * @param {string} text - Medical report text
   * @returns {Promise<string[]>} - Array of medical keywords
   */
  static async extractKeywords(text) {
    try {
      const prompt = `
        Extract medical keywords from the following text. 
        Focus on medical terms, conditions, medications, tests, and procedures.
        Return only the keywords as a JSON array.
        
        Text:
        ${text}
        
        Example response: ["hypertension", "diabetes", "metformin", "CBC", "creatinine"]
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a medical assistant that extracts medical keywords from text. Return only the keywords as a JSON array."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 500,
      });

      const response = completion.choices[0].message.content;
      
      try {
        return JSON.parse(response);
      } catch (parseError) {
        // Fallback: return common medical terms found in text
        return this.extractCommonMedicalTerms(text);
      }
    } catch (error) {
      console.error('Keyword extraction error:', error);
      // Fallback to common medical terms
      return this.extractCommonMedicalTerms(text);
    }
  }

  /**
   * Explain a medical term
   * @param {string} term - Medical term to explain
   * @returns {Promise<string>} - Explanation of the term
   */
  static async explainTerm(term) {
    try {
      const prompt = `
        Explain the medical term "${term}" in simple, patient-friendly language.
        Keep the explanation concise (2-3 sentences) and easy to understand.
        Focus on what the term means in the context of medical care.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a medical assistant that explains medical terms in simple, patient-friendly language."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 200,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Term explanation error:', error);
      throw new Error(`Failed to explain term: ${error.message}`);
    }
  }

  /**
   * Fallback method to extract common medical terms
   * @param {string} text - Medical report text
   * @returns {string[]} - Array of common medical terms
   */
  static extractCommonMedicalTerms(text) {
    const commonTerms = [
      'hypertension', 'diabetes', 'asthma', 'metformin', 'insulin', 'cbc', 
      'hemoglobin', 'creatinine', 'hyperkalemia', 'cholesterol', 'statin', 
      'antibiotic', 'infection', 'fracture', 'mri', 'ct', 'x-ray', 'cancer', 
      'tumor', 'biopsy', 'anemia', 'pneumonia', 'covid', 'glucose', 
      'potassium', 'sodium', 'lisinopril', 'atorvastatin', 'amoxicillin'
    ];

    const foundTerms = commonTerms.filter(term => 
      text.toLowerCase().includes(term.toLowerCase())
    );

    return foundTerms.slice(0, 10); // Limit to 10 terms
  }
} 