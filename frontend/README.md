# Medical Report Summarizer - Frontend

A React-based frontend for the Medical Report Summarizer application, featuring AI-powered medical report analysis, keyword highlighting, and export functionality.

## 🚀 Features

- **User Authentication**: Register, login, and logout with JWT
- **File Upload**: Support for PDF, DOCX, and TXT files
- **AI Summarization**: View AI-generated summaries of medical reports
- **Keyword Highlighting**: Interactive medical term highlighting
- **Click-to-Explain**: Get explanations for medical terms
- **Export Functionality**: Export summaries as PDF or text
- **Responsive Design**: Mobile-first, accessible design
- **Real-time Feedback**: Toast notifications and loading states

## 🛠️ Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Toastify** for notifications
- **File Saver** & **HTML2PDF** for export functionality

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:4000/api
   VITE_APP_NAME=Medical Report Summarizer
   VITE_APP_VERSION=1.0.0
   VITE_DEBUG=true
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AuthForm.jsx
│   │   ├── FileUpload.jsx
│   │   ├── KeywordHighlighter.jsx
│   │   ├── LoadingOverlay.jsx
│   │   ├── ReportList.jsx
│   │   └── ToastProvider.jsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ReportDetail.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.js
│   ├── utils/              # Utility functions
│   │   ├── api.js
│   │   └── highlight.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🎨 Styling

The app uses **Tailwind CSS** for styling with:
- Custom color palette
- Responsive design utilities
- Custom animations
- Accessibility-focused components

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` includes:
- Custom color palette
- Extended font families
- Custom animations
- Responsive breakpoints

### Vite
Development server configuration in `vite.config.js`:
- React plugin
- Development server on port 3000
- Source maps for debugging

## 🌐 API Integration

The frontend is configured to communicate with a backend API:
- Base URL: `http://localhost:4000/api`
- JWT authentication
- File upload endpoints
- Report management endpoints

## 📱 Responsive Design

The app is built with a mobile-first approach:
- Responsive breakpoints for all screen sizes
- Touch-friendly interface elements
- Optimized layouts for mobile devices

## ♿ Accessibility

Built with accessibility in mind:
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Medical Report Summarizer application. 