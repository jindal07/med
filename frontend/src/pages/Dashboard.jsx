import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth.jsx';
import FileUpload from '../components/FileUpload';
import ReportList from '../components/ReportList';
import LoadingOverlay from '../components/LoadingOverlay';
import { uploadReportApi, getReportsApi } from '../utils/api';

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const [reports, setReports] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchReports();
    }
  }, [isAuthenticated]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getReportsApi();
      setReports(response.data.reports || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const response = await uploadReportApi(file);
      toast.success('Report uploaded and processed successfully!');
      // Refresh reports list
      await fetchReports();
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error.response?.data?.message || 'Failed to upload report');
    } finally {
      setUploading(false);
    }
  };

  const handleSelectReport = (report) => {
    navigate(`/report/${report.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingOverlay show={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-2">
      <LoadingOverlay show={uploading} />
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">Your Medical Reports</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-6 py-3 sm:px-4 sm:py-2 rounded-lg sm:rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
            aria-label="Logout from account"
          >
            Logout
          </button>
        </div>
        <FileUpload onUpload={handleUpload} uploading={uploading} />
        <ReportList reports={reports} onSelect={handleSelectReport} />
      </div>
    </div>
  );
};

export default Dashboard; 