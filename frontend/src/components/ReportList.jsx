import React from 'react';

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <svg className="w-16 h-16 text-blue-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5V3.6A1.6 1.6 0 0 1 10.6 2h2.8A1.6 1.6 0 0 1 15 3.6V5m3.4 0A1.6 1.6 0 0 1 20 6.6v12.8A1.6 1.6 0 0 1 18.4 21H5.6A1.6 1.6 0 0 1 4 19.4V6.6A1.6 1.6 0 0 1 5.6 5H18.4z" />
    </svg>
    <p className="text-gray-500 text-center">No reports uploaded yet.<br />Upload your first medical report to get started!</p>
  </div>
);

const ReportList = ({ reports = [], onSelect }) => {
  if (!reports.length) {
    return <EmptyState />;
  }
  return (
    <ul className="divide-y divide-gray-200 bg-white rounded shadow mt-6">
      {reports.map((report) => (
        <li
          key={report.id}
          className="p-4 hover:bg-gray-50 cursor-pointer transition"
          onClick={() => onSelect && onSelect(report)}
        >
          <div className="flex justify-between items-center flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="w-full sm:w-auto">
              <p className="font-medium text-gray-800">{report.fileName || report.file_path}</p>
              <p className="text-xs text-gray-500">Uploaded: {new Date(report.uploaded_at).toLocaleString()}</p>
            </div>
            <div className="w-full sm:w-1/2 text-sm text-gray-600 truncate">
              {report.summary ? report.summary.slice(0, 80) + (report.summary.length > 80 ? '...' : '') : 'No summary yet.'}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReportList; 