import User from "../models/User.js";
import Company from "../models/Company.js";


// lấy thông tin công ty
export const getCompanies = async (req, res) => {
  try {
    // Chỉ cần tìm và trả về tất cả các công ty
    // Mọi thông tin cần thiết (isVerified, isBanned, description, email...)
    // đã được nhúng trong schema Company
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// lấy thông tin người dùng
export const getUser = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
