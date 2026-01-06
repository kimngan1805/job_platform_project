import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/scenes/dashboard/index.jsx";
import Companies from "./components/scenes/companies/index.jsx";
import BannedCompanies from "./components/scenes/banned/index.jsx";
import JobManagement from "./components/scenes/jobs/index.jsx";

// XÓA DÒNG NÀY: const Companies = () => <h1>Trang Quản Lý Công Ty</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="banned" element={<BannedCompanies />} />
          <Route path="posts" element={<JobManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;