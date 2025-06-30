import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

// Attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth helpers
export const loginApi = (data) => api.post('/auth/login', data);
export const registerApi = (data) => api.post('/auth/register', data);
export const getMeApi = () => api.get('/auth/me');

// Report helpers
export const uploadReportApi = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/report', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getReportsApi = () => api.get('/reports');
export const getReportApi = (id) => api.get(`/reports/${id}`);

// AI helpers
export const summarizeApi = (text) => api.post('/summarize', { text });
export const explainTermApi = (term) => api.post('/explain-term', { term });

// Health check
export const healthCheckApi = () => api.get('/health');

export default api; 