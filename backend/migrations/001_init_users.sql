-- Tạo bảng Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    
    -- QUAN TRỌNG: Chỉ cho phép 3 role này
    role VARCHAR(50) CHECK (role IN ('admin', 'candidate', 'recruiter')) DEFAULT 'candidate',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- (Optional) Tạo sẵn 1 ông Admin để test
-- Pass: 123456 (Lưu ý: thực tế phải hash password, đây là ví dụ demo chạy cho lẹ)
INSERT INTO users (email, password, full_name, role)
VALUES ('admin@finder.com', '123456', 'Super Admin', 'admin')
ON CONFLICT (email) DO NOTHING;