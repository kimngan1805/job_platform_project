// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; 
import FindJobPage from './pages/FindJobPage';// <--- 1. Import vào

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* 2. Thêm dòng này để định nghĩa đường dẫn */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/find-jobs" element={<FindJobPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;