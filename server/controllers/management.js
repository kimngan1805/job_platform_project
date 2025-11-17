import mongoose from 'mongoose';
import User from "../models/User.js"; // Giữ nguyên
import Transaction from "../models/Transaction.js"; // Giữ nguyên
import Company from '../models/Company.js'; // Import model Company

/* --- USER MANAGEMENT FUNCTIONS (Existing) --- */

export const getAdmins = async (req, res) => {
  try {
    // Giả định role cho admin là "platform_admin" theo schema đã thảo luận trước
    const admins = await User.find({ role: "platform_admin" }).select("-password"); 
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    // Kiểm tra nếu không tìm thấy dữ liệu user
    if (!userWithStats || userWithStats.length === 0) {
        return res.status(404).json({ message: "User or stats not found." });
    }

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


/* --- COMPANY MANAGEMENT FUNCTIONS (New) --- */

// Hàm lấy danh sách công ty (chỉ lấy công ty chưa bị xóa)
export const getCompanies = async (req, res) => {
  try {
    // Trả về tất cả công ty ngoại trừ những công ty đã bị đánh dấu là 'Deleted' (Soft Delete)
    const companies = await Company.find({ status: { $ne: 'Deleted' } });
    res.status(200).json(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Hàm thêm công ty mới
export const createCompany = async (req, res) => {
  try {
    const { name, description, email, address, industry, website, userOwner } = req.body;
    
    const newCompany = new Company({
      name,
      description,
      email,
      address,
      industry,
      website,
      // Status mặc định là 'Pending'
      // userOwner: req.user.id, 
    });

    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    // 409 Conflict cho lỗi trùng key unique (name, email)
    res.status(409).json({ message: error.message }); 
  }
};

// Hàm sửa thông tin, Xác thực, Cấm, Bỏ Cấm
export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { status, banReason, adminId } = updates;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: `Không tìm thấy công ty với ID: ${id}` });
  }

  try {
    let updateFields = { ...updates };

    // Xử lý logic Cấm/Bỏ Cấm
    if (status === 'Banned') {
      updateFields.isBanned = true;
      updateFields.bannedDetails = {
        reason: banReason || "Bị cấm bởi quản trị viên",
        adminId: adminId || '63701cc1f03239c72c000050', // Placeholder Admin ID
        banDate: new Date(),
      };
    } else if (status === 'Verified') {
      updateFields.isVerified = true;
      updateFields.isBanned = false; // Đảm bảo không bị cấm khi xác thực
      updateFields.bannedDetails = null; // Xóa chi tiết cấm
    } else if (status === 'Pending' && updates.unban) {
       // Xử lý Bỏ Cấm từ trạng thái 'Banned'
      updateFields.isBanned = false;
      updateFields.bannedDetails = null; 
      updateFields.isVerified = false; // Đặt lại trạng thái xác thực nếu cần
    } else if (status === 'Deleted') {
      updateFields.isBanned = false; // Đảm bảo bỏ cấm nếu bị xóa
      updateFields.isVerified = false;
    }
    
    delete updateFields._id;
    
    const updatedCompany = await Company.findByIdAndUpdate(id, updateFields, { new: true });
    
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Không tìm thấy công ty để cập nhật.' });
    }
    
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm xóa công ty (Soft Delete)
export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: `Không tìm thấy công ty với ID: ${id}` });
  }

  try {
    // Soft Delete: Thay đổi status thành 'Deleted'
    const deletedCompany = await Company.findByIdAndUpdate(
      id, 
      { status: 'Deleted', isBanned: false, isVerified: false }, 
      { new: true }
    );
    res.status(200).json(deletedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};