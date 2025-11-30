import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
// Core Management Routes - Renaming imports of existing components
import Companies from "scenes/companies";
import Users from "scenes/users";

import ManageBannedCompanies from "scenes/ManageBannedCompanies";
import ReviewCompanyVerification from "scenes/ReviewCompanyVerification";
import JobPosts from "scenes/posts";
import Admin from "scenes/admin";
import Login from "scenes/login";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
const loggedIn = useSelector((state) => state.global.loggedIn);
  // console.log("TOKEN FROM REDUX:", token);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={loggedIn ? <Layout /> : <Navigate to="/login" />}>
            {/* <Route element={<Layout />}> */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/users" element={<Users />} />
              <Route path="/jobposts" element={<JobPosts />} />
              <Route path="/admin" element={<Admin />} />

              <Route path="/review-company-verification"
                element={<ReviewCompanyVerification />}
              />
              <Route
                path="/manage-banned-companies"
                element={<ManageBannedCompanies />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
