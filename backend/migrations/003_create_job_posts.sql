CREATE TABLE IF NOT EXISTS job_posts (
    id SERIAL PRIMARY KEY,
    recruiter_id INTEGER REFERENCES recruiter_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255), -- Lấy từ recruiter_profiles
    salary VARCHAR(100),       -- VD: $2,000 - $3,500
    location VARCHAR(255),     -- VD: Hồ Chí Minh
    experience VARCHAR(100),   -- VD: 3 - 5 Năm
    category VARCHAR(100),     -- VD: UI/UX Designer
    description TEXT,          -- Mô tả công việc
    requirements TEXT,         -- Yêu cầu ứng viên
    benefits TEXT[],           -- Mảng quyền lợi
    skills TEXT[],             -- Mảng kỹ năng
    deadline DATE,             -- Hạn nộp hồ sơ
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);