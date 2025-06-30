import React, { useRef, useState } from 'react';

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'text/plain',
];

const FileUpload = ({ onUpload, uploading }) => {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && !ACCEPTED_TYPES.includes(selected.type)) {
      setError('Only PDF, DOCX, or TXT files are allowed.');
      setFile(null);
      return;
    }
    setError('');
    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && !ACCEPTED_TYPES.includes(dropped.type)) {
      setError('Only PDF, DOCX, or TXT files are allowed.');
      setFile(null);
      return;
    }
    setError('');
    setFile(dropped);
  };

  const handleUpload = () => {
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center cursor-pointer bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-colors"
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        role="button"
        tabIndex={0}
        aria-label="Upload medical report file"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current.click();
          }
        }}
      >
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
          aria-describedby="file-upload-help"
        />
        <div className="mb-4">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">
          Drag & drop a PDF, DOCX, or TXT file here, or <span className="text-blue-600 underline">browse</span>
        </p>
        <p id="file-upload-help" className="text-xs text-gray-500 mt-2">
          Supported formats: PDF, DOCX, TXT
        </p>
        {file && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Selected: {file.name}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
      <button
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleUpload}
        disabled={!file || !!error || uploading}
        aria-describedby={uploading ? "upload-status" : undefined}
      >
        {uploading ? 'Uploading...' : 'Upload Report'}
      </button>
      {uploading && (
        <div id="upload-status" className="sr-only" aria-live="polite">
          Uploading your medical report
        </div>
      )}
    </div>
  );
};

export default FileUpload; 