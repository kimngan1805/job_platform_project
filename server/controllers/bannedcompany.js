import Company from "../models/Company.js"; // Đảm bảo import model Company
import mongoose from "mongoose";

// Lấy danh sách các công ty bị cấm
export const getBannedCompanies = async (req, res) => {
  try {
    // Chỉ lấy các công ty có trường isBanned là true
    const bannedCompanies = await Company.find({ isBanned: true });
    res.status(200).json(bannedCompanies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Logic Bỏ Cấm (Unban)
export const unbanCompany = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid Company ID." });
    }

    // Sử dụng findByIdAndUpdate để cập nhật trực tiếp trong DB
    const unbannedCompany = await Company.findByIdAndUpdate(
        id, 
        { 
            isBanned: false, 
            status: 'Pending', // Đặt lại trạng thái chính thành Pending
            bannedDetails: null // Xóa chi tiết cấm
        },
        { new: true } // *** QUAN TRỌNG: Đảm bảo trả về tài liệu mới đã cập nhật ***
    );

    if (!unbannedCompany) {
        return res.status(404).json({ message: "Company record not found." });
    }

    // Nếu lệnh này thành công, frontend sẽ nhận được phản hồi 200, 
    // và RTK Query sẽ tự động làm mới (do invalidatesTags đã được thiết lập đúng).
    res.status(200).json({ message: "Công ty đã được bỏ cấm thành công.", company: unbannedCompany });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};