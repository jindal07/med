import { AIService } from '../services/aiService.js';

export const summarize = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required.' });
    }
    const summary = await AIService.summarizeReport(text);
    return res.json({ success: true, summary });
  } catch (error) {
    console.error('Summarize error:', error);
    return res.status(500).json({ success: false, message: 'Failed to summarize text.' });
  }
};

export const explainTerm = async (req, res) => {
  try {
    const { term } = req.body;
    if (!term) {
      return res.status(400).json({ success: false, message: 'Term is required.' });
    }
    const explanation = await AIService.explainTerm(term);
    return res.json({ success: true, explanation });
  } catch (error) {
    console.error('Explain term error:', error);
    return res.status(500).json({ success: false, message: 'Failed to explain term.' });
  }
}; 