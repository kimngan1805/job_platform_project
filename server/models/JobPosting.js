import mongoose from "mongoose";

const JobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    companyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Liên kết với Công ty sở hữu bài đăng
      required: true,
    },
    postedByRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Người dùng Employer đã đăng bài
      required: true,
    },
    location: {
      type: String, // Địa điểm làm việc (dùng cho lọc)
      required: true,
    },
    salary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: null },
      currency: { type: String, default: "VND" },
    },
    industry: {
      type: String, // Ngành nghề (dùng cho lọc và phân loại)
      required: true,
    },
    experienceRequired: {
      type: String, // Kinh nghiệm yêu cầu (ví dụ: "1-2 năm", "Senior")
      default: "Không yêu cầu",
    },
    description: {
      type: String,
      required: true,
    },
    
    // --- CÁC TRƯỜNG QUẢN LÝ VÀ KIỂM DUYỆT (ADMIN) ---
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "closed", "deleted", "expired"], 
      default: "pending", // Trạng thái mặc định là Chờ duyệt
    },
    rejectionReason: {
      type: String, // Lý do Admin từ chối
      default: null,
    },
    
    // --- TRƯỜNG THỐNG KÊ & TƯƠNG TÁC ---
    viewsCount: {
      type: Number,
      default: 0, // Số lượt xem tin
    },
    applicantsCount: {
      type: Number,
      default: 0, // Số lượt ứng tuyển
    },
    savedByUsers: [{ // Danh sách User (JobSeeker) đã lưu tin này
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    expirationDate: {
      type: Date, // Ngày hết hạn của tin
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Mặc định 30 ngày
    }
  },
  { timestamps: true } // createdAt, updatedAt
);

const JobPosting = mongoose.model("JobPosting", JobPostingSchema);
export default JobPosting;