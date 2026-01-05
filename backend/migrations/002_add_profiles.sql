-- 1. Bảng Hồ sơ Ứng viên (Candidate Profiles)
-- Lưu thông tin từ form CandidateOnboardingPage
CREATE TABLE IF NOT EXISTS candidate_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE, -- Một user chỉ có 1 hồ sơ ứng viên
    
    -- Step 1: Định hướng nghề nghiệp
    desired_position VARCHAR(255), -- Vị trí mong muốn (VD: Frontend Developer)
    current_level VARCHAR(100),    -- Cấp bậc hiện tại (Fresher, Junior...)
    interested_industries TEXT[],  -- Mảng các ngành quan tâm (VD: ['IT', 'Marketing'])
    
    -- Step 2: Nhu cầu & Mong muốn
    desired_location VARCHAR(100), -- Địa điểm (HCM, HN...)
    salary_min BIGINT,             -- Lương tối thiểu (VNĐ - dùng BIGINT cho số lớn)
    salary_max BIGINT,             -- Lương tối đa
    work_types TEXT[],             -- Hình thức làm việc (VD: ['Full-time', 'Remote'])
    
    -- Step 3: Kỹ năng & CV
    skills TEXT[],                 -- Mảng kỹ năng (VD: ['React', 'NodeJS'])
    cv_url TEXT,                   -- Link file CV đã upload (được trả về từ Firebase/Cloudinary)
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Hồ sơ Nhà tuyển dụng (Recruiter Profiles)
-- Lưu thông tin từ form RecruiterOnboardingPage
CREATE TABLE IF NOT EXISTS recruiter_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE, -- Một user chỉ có 1 hồ sơ công ty
    
    -- Step 1: Xác thực danh tính
    company_name VARCHAR(255),
    tax_code VARCHAR(50),
    business_license_url TEXT,     -- Link ảnh giấy phép kinh doanh
    verification_status VARCHAR(50) DEFAULT 'pending', -- Trạng thái: 'pending' (chờ duyệt), 'verified' (đã duyệt), 'rejected'
    
    -- Step 2: Hiện diện & Quy mô
    website_url TEXT,
    company_size VARCHAR(100),     -- VD: 50-100 nhân viên
    headquarters_address TEXT,     -- Địa chỉ trụ sở chính
    
    -- Step 3: Văn hóa & Phúc lợi
    description TEXT,              -- Giới thiệu công ty
    benefits TEXT[],               -- Mảng phúc lợi (VD: ['Lương tháng 13', 'Macbook'])
    office_images_url TEXT[],      -- Mảng link ảnh văn phòng
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);