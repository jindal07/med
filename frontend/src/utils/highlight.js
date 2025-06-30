// Placeholder: In production, use AI/NER for real extraction
const MEDICAL_TERMS = [
  'hypertension', 'diabetes', 'asthma', 'metformin', 'insulin', 'cbc', 'hemoglobin', 'creatinine',
  'hyperkalemia', 'cholesterol', 'statin', 'antibiotic', 'infection', 'fracture', 'MRI', 'CT', 'X-ray',
  'cancer', 'tumor', 'biopsy', 'anemia', 'pneumonia', 'covid', 'glucose', 'potassium', 'sodium',
  'lisinopril', 'atorvastatin', 'amoxicillin', 'paracetamol', 'ibuprofen', 'blood pressure',
];

export function extractMedicalKeywords(text) {
  if (!text) return [];
  const found = new Set();
  for (const term of MEDICAL_TERMS) {
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    if (regex.test(text)) {
      found.add(term);
    }
  }
  return Array.from(found);
} 