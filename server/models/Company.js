import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    email: {
      type: String,
      unique: true,
    },
    address: String,
    industry: String,
    website: String,
    status: {
      type: String,
      enum: ['Pending', 'Verified', 'Banned'],
      // enum: ["pending", "approved", "rejected"],
      default: 'Pending',
    },
    
    // YÊU CẦU QUẢN LÝ
    isVerified: { // Dành cho "Hàng đợi xác thực công ty"
      type: Boolean,
      default: false,
    },
    isBanned: { // Dành cho "Quản lý công ty bị cấm"
      type: Boolean,
      default: false,
    },
    bannedDetails: { // Chi tiết lệnh cấm
      reason: String,
      adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
      },
      banDate: Date,
    },
    
    // LIÊN KẾT
    userOwner: { // Chủ sở hữu hoặc tài khoản quản trị công ty
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;