import mongoose from "mongoose";

const JobSeekerProfileSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu ngược đến User
      required: true,
      unique: true,
    },
    personalInfo: { // Thông tin cá nhân
      fullName: String,
      phone: String,
      dateOfBirth: Date,
    },
    careerObjective: String, // Mục tiêu nghề nghiệp
    
    experiences: [ // Kinh nghiệm làm việc
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
        isCurrent: Boolean,
      },
    ],
    
    education: [ // Học vấn
      {
        school: String,
        major: String,
        degree: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    
    certificates: [ 
      {
        name: String,
        issuingOrganization: String,
        issueDate: Date,
        credentialUrl: String,
      },
    ],
    
    skills: [String], // Kỹ năng
    
    projects: [ // Dự án (Portfolio)
      {
        name: String,
        description: String,
        url: String,
        technologies: [String],
      },
    ],
    
    uploadedCVUrl: String, // Tải lên file CV đính kèm
    
    favoriteJobs: [{ // Lưu các công việc yêu thích
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPosting",
    }],
  },
  { timestamps: true }
);

const JobSeekerProfile = mongoose.model("JobSeekerProfile", JobSeekerProfileSchema);
export default JobSeekerProfile;