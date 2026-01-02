// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FindJobPage from './pages/FindJobPage';
import JobDetailPage from './pages/JobDetailPage'; // <--- 1. Import trang mới vào

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/find-jobs" element={<FindJobPage />} />

        {/* 2. Thêm route này để kết nối */}
        <Route path="/job-detail" element={<JobDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;