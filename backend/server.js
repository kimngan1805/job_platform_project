import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import onboardingRoutes from './routes/onboardingRoutes.js';
import multer from 'multer';
import path from 'path';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình nơi lưu CV (tạo thư mục 'uploads' trong folder backend nhé ck)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// API Nộp hồ sơ
app.post('/api/applications', upload.single('cvFile'), async (req, res) => {
    try {
        const { jobId, candidateId, fullName, email, phone, coverLetter } = req.body;
        const cvUrl = req.file ? req.file.path : '';

        const query = `
            INSERT INTO job_applications (job_id, candidate_id, full_name, email, phone, cover_letter, cv_url, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending') RETURNING *`;
        
        const result = await pool.query(query, [jobId, candidateId, fullName, email, phone, coverLetter, cvUrl]);
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/onboarding', onboardingRoutes);

app.get('/', (req, res) => {
    res.send('API đang chạy ngon lành cành đào! 🚀');
});


// --- 1. ROUTE TẠO BÀI ĐĂNG (Mặc định là pending) ---
app.post('/api/job-posts', async (req, res) => {
    const { userId, title, salary, location, experience, description, requirements, benefits, deadline } = req.body;
    try {
        const profile = await pool.query('SELECT id FROM recruiter_profiles WHERE user_id = $1', [userId]);
        
        if (profile.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Ck chưa tạo hồ sơ Nhà tuyển dụng!" });
        }

        const recruiterId = profile.rows[0].id;

        // Thêm cột status và đặt giá trị mặc định là 'pending'
        const query = `
            INSERT INTO job_posts (
                recruiter_id, title, salary, location, experience, 
                description, requirements, benefits, deadline, status
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending') 
            RETURNING *`;
        
        const result = await pool.query(query, [
            recruiterId, title, salary, location, experience, 
            description, requirements, benefits, deadline
        ]);
        res.json({ success: true, data: result.rows[0] });
    } catch (err) { 
        res.status(500).json({ success: false, message: err.message }); 
    }
});

// --- 2. ROUTE LẤY TẤT CẢ BÀI ĐĂNG (Chỉ lấy bài đã duyệt - approved) ---
app.get('/api/all-job-posts', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT j.*, r.company_name 
             FROM job_posts j 
             LEFT JOIN recruiter_profiles r ON j.recruiter_id = r.id 
             WHERE j.status = 'approved' -- CHỈ LẤY BÀI ĐÃ DUYỆT
             ORDER BY j.created_at DESC`
        );
        res.json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
// --- ĐOẠN NÀY ĐỂ SOI DỮ LIỆU TRONG TERMINAL ---
app.get('/api/job-posts/:userId', async (req, res) => {
    const { userId } = req.params;
    
    console.log(`\n--- 🔔 BẮT ĐẦU KIỂM TRA CHO NGÂN (User ID: ${userId}) ---`);

    try {
        // Câu lệnh này nó sẽ tự "bắc cầu" từ User ID sang thẳng bài đăng luôn
        const query = `
            SELECT 
                j.id as job_id, 
                j.title, 
                j.status, 
                j.rejection_reason,
                r.company_name
            FROM job_posts j
            JOIN recruiter_profiles r ON j.recruiter_id = r.id
            WHERE r.user_id = $1
        `;
        
        const result = await pool.query(query, [userId]);

        if (result.rows.length > 0) {
            console.log(`✅ ĐÃ LẤY ĐƯỢC ${result.rows.length} BÀI TRONG DATABASE:`);
            console.table(result.rows); // Nó hiện cái bảng cực đẹp ở Terminal nè
        } else {
            console.log(`⚠️ CẢNH BÁO: Database đang trống trơn!`);
            console.log(`Lý do có thể: User ${userId} chưa có hồ sơ Recruiter hoặc chưa đăng bài nào.`);
        }

        res.json({ success: true, data: result.rows });

    } catch (err) {
        console.error("❌ LỖI RỒI CK ƠI:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- 3. ROUTE CHI TIẾT BÀI ĐĂNG ---
app.get('/api/job-detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT j.*, r.company_name, r.company_size, r.headquarters_address 
             FROM job_posts j 
             LEFT JOIN recruiter_profiles r ON j.recruiter_id = r.id 
             WHERE j.id = $1`, 
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy!" });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// --- 4. ROUTE LẤY BÀI ĐĂNG CỦA RIÊNG RECRUITER (Thấy cả bài đang chờ) ---
app.get('/api/job-posts/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query(
            `SELECT j.* FROM job_posts j 
             JOIN recruiter_profiles r ON j.recruiter_id = r.id 
             WHERE r.user_id = $1 ORDER BY j.created_at DESC`,
            [userId]
        );
        res.json({ success: true, data: result.rows });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// API lấy thông tin chi tiết của User
// API lấy thông tin chi tiết của User theo ID
app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Truy vấn đúng bảng users mà ck vừa tạo
        const result = await pool.query(
            'SELECT full_name, email FROM users WHERE id = $1', 
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng!" });
        }
        
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error("Lỗi API /api/user:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});