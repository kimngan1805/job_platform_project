import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./components/pages/Auth/Signup";
import Login from "./components/pages/Auth/Login";
import LandingPage from "./components/pages/LandingPage/LandingPage";

import UserProfile from "./components/pages/JobSeeker/UserProfile";
import JobSeekerDashboard from "./components/pages/JobSeeker/JobSeekerDashboard";
import JobDetails from "./components/pages/JobSeeker/JobDetails";
import SaveJobs from "./components/pages/JobSeeker/SaveJobs";

import ProtectedRoute from "./routes/ProtectedRoute";
import EmployerDashboard from "./components/pages/Employer/EmployerDashboard";
import JobPostingForm from "./components/pages/Employer/JobPostingForm";
import ManageJobs from "./components/pages/Employer/ManageJobs";
import EmployerProfilePage from "./components/pages/Employer/EmployerProfilePage";
import ApplicationViewer from "./components/pages/Employer/ApplicationViewer";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* route chung */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/find-job" element={<JobSeekerDashboard />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/saved-job" element={<SaveJobs />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute requiredRole="employer" />}>
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<JobPostingForm />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/applicants" element={<ApplicationViewer />} />
            <Route path="/company-profile" element={<EmployerProfilePage />} />
          </Route>

          {/* catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
};

export default App;
