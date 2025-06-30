import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import KeywordHighlighter from '../components/KeywordHighlighter';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import { getReportApi, explainTermApi } from '../utils/api';
import LoadingOverlay from '../components/LoadingOverlay';

const ReportDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const contentRef = useRef();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [explaining, setExplaining] = useState(false);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchReport();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await getReportApi(id);
      setReport(response.data.report);
    } catch (error) {
      toast.error('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleExplain = async (term) => {
    setExplaining(true);
    try {
      const response = await explainTermApi(term);
      toast.info(response.data.explanation, { autoClose: 7000 });
    } catch (error) {
      toast.error('Failed to explain term');
    } finally {
      setExplaining(false);
    }
  };

  const handleExport = (type) => {
    if (!report) return;
    if (type === 'PDF') {
      if (contentRef.current) {
        html2pdf().from(contentRef.current).set({ margin: 0.5, filename: 'medical-summary.pdf', html2canvas: { scale: 2 } }).save();
      }
    } else if (type === 'Text') {
      const text = `Summary: ${report.summary}\n\nDiagnosis: ${report.diagnosis}\nAbnormal Results: ${report.abnormalResults}\nNext Steps: ${report.nextSteps}`;
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'medical-summary.txt');
    } else {
      toast.info(`Export as ${type} coming soon!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingOverlay show={true} />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Report not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-2">
      <LoadingOverlay show={explaining} />
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Report Summary</h1>
        <div ref={contentRef} className="mb-6">
          <div className="mb-4">
            <KeywordHighlighter text={report.summary || ''} keywords={report.keywords || []} onClickKeyword={handleExplain} />
          </div>
          <div className="space-y-3 sm:space-y-2">
            <div className="p-3 sm:p-0">
              <span className="font-semibold text-gray-800">Diagnosis:</span>
              <p className="mt-1 sm:mt-0 sm:inline sm:ml-2">{report.diagnosis || 'N/A'}</p>
            </div>
            <div className="p-3 sm:p-0">
              <span className="font-semibold text-gray-800">Abnormal Results:</span>
              <p className="mt-1 sm:mt-0 sm:inline sm:ml-2">{report.abnormalResults || 'N/A'}</p>
            </div>
            <div className="p-3 sm:p-0">
              <span className="font-semibold text-gray-800">Next Steps:</span>
              <p className="mt-1 sm:mt-0 sm:inline sm:ml-2">{report.nextSteps || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <button
            className="bg-blue-600 text-white px-6 py-3 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex-1 sm:flex-none"
            onClick={() => handleExport('PDF')}
            aria-label="Export summary as PDF"
          >
            Export as PDF
          </button>
          <button
            className="bg-gray-600 text-white px-6 py-3 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex-1 sm:flex-none"
            onClick={() => handleExport('Text')}
            aria-label="Export summary as text file"
          >
            Export as Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail; 