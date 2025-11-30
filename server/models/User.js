import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    // TRƯỜNG MỚI: Phân quyền và Tham chiếu
    role: {
      type: String,
      enum: ["admin", "employer", "jobseeker"], // Vai trò: Quản trị/Nhà tuyển dụng/Ứng viên
      default: "jobseeker",
    },
    profileRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeekerProfile", // Tham chiếu đến Hồ sơ ứng viên
      required: function() { return this.role === 'jobseeker'; },
    },
    companyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Tham chiếu đến Công ty
      // required: function() { return this.role === 'employer'; },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"], // Trạng thái tài khoản
      default: "active",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;