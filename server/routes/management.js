import express from 'express';
import {
  getAdmins,
  getUserPerformance, // Giữ lại hàm cũ
  // Thêm các hàm quản lý công ty
  getCompanies, 
  createCompany, 
  updateCompany, 
  deleteCompany, 
} from '../controllers/management.js';

const router = express.Router();

/* --- USER MANAGEMENT --- */
router.get('/admins', getAdmins);
router.get('/performance/:id', getUserPerformance);

/* --- COMPANY MANAGEMENT ROUTES --- */
router.get('/companies', getCompanies); // Lấy danh sách
router.post('/companies', createCompany); // Thêm mới
router.put('/companies/:id', updateCompany); // Sửa, Xác thực, Cấm, Bỏ cấm
router.delete('/companies/:id', deleteCompany); // Xóa (Soft Delete)

export default router;