import User from "../models/User.js";
import Company from "../models/Company.js";
import JobPosting from "../models/JobPosting.js";
import mongoose from "mongoose"; // Cần thiết cho aggregation
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// server/controllers/general.js (Phần đầu)
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user); 
  } catch (error) {
    return res.status(404).json({ message: error.message }); 
  }
};

// Hàm tạo mảng 12 tháng gần nhất
const generateLast12Months = () => {
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
  }
  return months;
};

/* --- Hàm lấy các chỉ số thống kê chính cho Dashboard ---- */
export const getJobPortalDashboardStats = async (req, res) => {
  try {
    // --- 1. Thống kê Người dùng ---
    const totalUsers = await User.countDocuments();
    const totalEmployers = await User.countDocuments({ role: "employer" });
    const totalJobSeekers = await User.countDocuments({ role: "jobseeker" });

    // --- 2. Thống kê Công ty ---
    const totalCompanies = await Company.countDocuments();
    const verifiedCompanies = await Company.countDocuments({
      status: "Verified",
    });
    const pendingCompanies = await Company.countDocuments({
      status: "Pending",
    });

    // --- 3. Thống kê Bài đăng ---
    const totalJobPosts = await JobPosting.countDocuments();
    const approvedJobPosts = await JobPosting.countDocuments({
      status: "approved",
    });
    const pendingJobPosts = await JobPosting.countDocuments({
      status: "pending",
    });
    const rejectedJobPosts = await JobPosting.countDocuments({
      status: "rejected",
    });

    // --- 4. Lấy 5 Bài đăng gần đây ---
    const recentJobPosts = await JobPosting.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "companyRef",
        select: "name",
      })
      .select("title status applicantsCount companyRef createdAt");


    // --- 5. Thống kê theo thời gian (Line Chart Data) ---
    const last12Months = generateLast12Months();
    const lastYearDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    const monthlyJobPostStatsRaw = await JobPosting.aggregate([
      { $match: { createdAt: { $gte: lastYearDate } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalNewPosts: { $sum: 1 },
          totalApprovedPosts: {
            $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Gộp dữ liệu thực tế vào 12 tháng (điền các tháng thiếu bằng 0)
    const statsMap = monthlyJobPostStatsRaw.reduce((acc, curr) => {
      const key = `${curr._id.month}/${curr._id.year}`;
      acc[key] = {
        monthYear: key,
        totalNewPosts: curr.totalNewPosts,
        totalApprovedPosts: curr.totalApprovedPosts,
      };
      return acc;
    }, {});

    const monthlyJobPostStats = last12Months.map(({ year, month }) => {
      const key = `${month}/${year}`;
      return (
        statsMap[key] || {
          monthYear: key,
          totalNewPosts: 0,
          totalApprovedPosts: 0,
        }
      );
    });

    // --- GỬI PHẢN HỒI CUỐI CÙNG VÀ DUY NHẤT (Chứa tất cả data) ---
    return res.status(200).json({ 
      totalUsers,
      totalEmployers,
      totalJobSeekers,
      totalCompanies,
      verifiedCompanies,
      pendingCompanies,
      totalJobPosts,
      approvedJobPosts,
      pendingJobPosts,
      rejectedJobPosts,
      recentJobPosts,
      monthlyJobPostStats: monthlyJobPostStats, 
    });

  } catch (error) {
    console.error("LỖI DASHBOARD 500:", error);
    return res.status(500).json({
      message: error.message || "Lỗi máy chủ không xác định khi lấy thống kê.",
    });
  }
};
//  --- AUTHENTICATION---

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email }); 
        
        if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng." });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied. You are not an administrator." });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng." });
        }

      
        
        // Chuyển Mongoose Document sang Object JS và xóa mật khẩu
        const userWithoutPassword = user.toObject(); 
        delete userWithoutPassword.password; 
        
        // Trả về thông tin người dùng đã xác thực (Không có Token)
        res.status(200).json({ 
            message: "Login successful (No token provided)", // Thông báo
            user: userWithoutPassword 
        });

    } catch (err) {
        console.error("Lỗi đăng nhập:", err);
        // Trả về lỗi 500 nếu có lỗi server khác (ví dụ: lỗi kết nối DB)
        res.status(500).json({ error: err.message });
    }
};