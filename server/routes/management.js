import express from "express";
import {
  getAdmins,
  getUsers,
  updateUser,
  // Thêm các hàm quản lý công ty
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  // Quản lý bài đăng
  getJobPosts,
  updateJobPostStatus,
  deleteJobPost,
} from "../controllers/management.js";

const router = express.Router();

/* --- USER MANAGEMENT --- */
router.get("/admins", getAdmins);
// router.get("/performance/:id", getUserPerformance);
router.get("/users", getUsers);
router.patch("/users/:id", updateUser); // <--- ROUTE CẬP NHẬT ADMIN

/* --- COMPANY MANAGEMENT ROUTES --- */
router.get("/companies", getCompanies); // Lấy danh sách
router.post("/companies", createCompany); // Thêm mới
router.put("/companies/:id", updateCompany); // Sửa, Xác thực, Cấm, Bỏ cấm
router.delete("/companies/:id", deleteCompany); // Xóa (Soft Delete)
/* JOB POSTS ROUTES */
router.get("/jobposts", getJobPosts);
router.patch("/jobposts/:id/status", updateJobPostStatus);
router.delete("/jobposts/:id", deleteJobPost);

export default router;
