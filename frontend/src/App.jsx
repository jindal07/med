import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportDetail from './pages/ReportDetail';
import ToastProvider from './components/ToastProvider';
import { AuthProvider } from './hooks/useAuth.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastProvider />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 