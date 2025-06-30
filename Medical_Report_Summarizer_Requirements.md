
# 🩺 Medical Report Summarizer – Project Overview

## ✅ Problem It Solves
Medical reports (diagnostics, lab results, prescriptions) are often lengthy and complex. This tool helps patients or doctors quickly understand the core information via AI-powered summaries and highlights.

---

## 💡 Key Features (MVP)
1. **User Authentication** – Register/Login using JWT or Firebase  
2. **Upload Medical Documents** – PDF, DOCX, or plain text upload  
3. **AI-Powered Summarization** – Extract and summarize key details (e.g., diagnosis, test results, recommendations)  
4. **Highlight Medical Keywords** – Drugs, conditions, and test names auto-highlighted  
5. **Explain Medical Terms** – One-click AI explanation of jargon  
6. **Summary Export** – Download or share summary as PDF/text  

---

## 🔧 Tech Stack

| Layer        | Technology                              |
|--------------|------------------------------------------|
| **Frontend** | React + Tailwind CSS                     |
| **Backend**  | Node.js + Express                        |
| **Database** | PostgreSQL (Prisma or Sequelize)         |
| **Auth**     | JWT or Firebase Auth                     |
| **AI**       | OpenAI API (GPT-4 / gpt-3.5)              |
| **OCR**      | Tesseract.js or Google Vision API        |
| **File Upload** | Multer / Firebase Storage / Cloudinary |
| **PDF Parsing** | pdf-parse / mammoth.js (for DOCX)     |

---

## 🔐 API Overview

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### File Upload
- `POST /upload/report` → stores file & parses content

### AI Summarization
- `POST /summarize` → sends parsed text to OpenAI API  
- `POST /explain-term` → explain a medical term via AI  

---

## 🧠 OpenAI Prompt Examples

**Summarization Prompt**
```
Summarize the following medical report and highlight the diagnosis, abnormal test results, and suggested next steps:

[PASTE REPORT CONTENT]
```

**Term Explanation Prompt**
```
Explain the medical term 'hyperkalemia' in simple terms a patient can understand.
```

---

## 🗂️ Database Schema (Simplified)

### Users
- `id`, `name`, `email`, `password`, `created_at`

### Reports
- `id`, `user_id`, `file_path`, `extracted_text`, `summary`, `uploaded_at`

---

## 🎯 Stretch Goals
- Voice-based summary (TTS)
- Multilingual output
- Medical terminology glossary
- Integration with health portals

---

## 🧪 Testing
- File parsing tests
- API route tests
- Prompt-response evaluation
- Use real anonymized reports for testing

---

## 💵 Monetization Ideas
- Free tier: limit uploads or summary length
- Paid plan: longer reports, priority response, doctor-facing tools
- Hospitals/Clinics API licensing
