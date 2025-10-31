import React from "react";
// import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = true;
  const user = { fullName: "Nguyen Hong", role: "admin" };
  const navigate = useNavigate();
  return (
    <header>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* logo với tên*/}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Job</span>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a onClick={() => navigate("find-job")}
             className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Tìm kiếm việc làm
            </a>
            <a
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === "admin"
                    ? "/employer-dashboard"
                    : "/login"
                );
              }}
             className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              For Admin
            </a>
          </nav>
          {/* authentic button */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Chào mừng, {user?.fullName}</span>
                <a
                  href={
                    user?.role == "admin" ? "/employer-dashboard" : "/find-job"
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <a href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-50">
                  Login
                </a>
                <a href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
