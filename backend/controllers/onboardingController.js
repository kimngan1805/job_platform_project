import pool from '../config/db.js';

// Lưu hồ sơ Ứng viên
export const saveCandidateProfile = async (req, res) => {
    const { user_id, desired_position, current_level, interested_industries, desired_location, salary_min, salary_max, work_types, skills } = req.body;

    try {
        await pool.query(
            `INSERT INTO candidate_profiles 
            (user_id, desired_position, current_level, interested_industries, desired_location, salary_min, salary_max, work_types, skills)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [user_id, desired_position, current_level, interested_industries, desired_location, salary_min, salary_max, work_types, skills]
        );

        // Update role cho chắc ăn
        await pool.query("UPDATE users SET role = 'candidate' WHERE id = $1", [user_id]);

        res.json({ success: true, message: "Lưu hồ sơ ứng viên thành công!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server!" });
    }
};

// Lưu hồ sơ Nhà tuyển dụng
export const saveRecruiterProfile = async (req, res) => {
    const { user_id, company_name, tax_code, website_url, company_size, headquarters_address, description, benefits } = req.body;

    try {
        await pool.query(
            `INSERT INTO recruiter_profiles 
            (user_id, company_name, tax_code, website_url, company_size, headquarters_address, description, benefits)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [user_id, company_name, tax_code, website_url, company_size, headquarters_address, description, benefits]
        );

        // Update role
        await pool.query("UPDATE users SET role = 'recruiter' WHERE id = $1", [user_id]);

        res.json({ success: true, message: "Lưu hồ sơ công ty thành công!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server!" });
    }
};