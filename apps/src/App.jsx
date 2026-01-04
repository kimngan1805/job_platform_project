// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages cũ
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FindJobPage from './pages/FindJobPage';
import JobDetailPage from './pages/JobDetailPage';

// Pages Recruiter Dashboard
import RecruiterPage from './pages/RecruiterPage';
import InfoCvPage from './pages/recruiter/InfoCvPage.jsx';
import MessagesPage from './pages/recruiter/MessagesPage'; 
import StatisticsPage from './pages/recruiter/StatisticsPage';
import SettingsPage from './pages/recruiter/SettingsPage';

// --- LUỒNG ONBOARDING ---
// 1. Trang chọn vai trò (Nằm ở pages/)
import RoleSelectionPage from './pages/RoleSelectionPage';

// 2. Hai trang khảo sát (Nằm ở pages/onboarding/)
import CandidateOnboardingPage from './pages/onboarding/CandidateOnboardingPage';
import RecruiterOnboardingPage from './pages/onboarding/RecruiterOnboardingPage';


import ProfilePage from './pages/personal/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* --- LUỒNG ONBOARDING (Đã kết nối đủ 3 trang) --- */}
        <Route path="/role-selection" element={<RoleSelectionPage />} />
        <Route path="/onboarding/candidate" element={<CandidateOnboardingPage />} />
        <Route path="/onboarding/recruiter" element={<RecruiterOnboardingPage />} />

        {/* Candidate Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/find-jobs" element={<FindJobPage />} />
        <Route path="/job-detail" element={<JobDetailPage />} />

        {/* Recruiter Routes */}
        <Route path="/recruiter" element={<RecruiterPage />} />
        <Route path="/recruiter/info-cv" element={<InfoCvPage />} />
        <Route path="/recruiter/messages" element={<MessagesPage />} />
        <Route path="/recruiter/statistics" element={<StatisticsPage />} />
        <Route path="/recruiter/settings" element={<SettingsPage />} />
        <Route path="/profile-cv" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;