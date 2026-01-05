import pool from '../config/db.js';

// Đăng ký
export const register = async (req, res) => {
    const { email, password, full_name, role } = req.body;
    try {
        // Kiểm tra email tồn tại chưa
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: "Email đã tồn tại!" });
        }

        // Tạo user mới (Thực tế nên hash password nha chồng)
        const newUser = await pool.query(
            "INSERT INTO users (email, password, full_name, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, password, full_name, role || 'candidate']
        );

        res.json({ success: true, user: newUser.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server!" });
    }
};

// Đăng nhập
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Email không tồn tại!" });
        }

        // Check password
        if (user.rows[0].password !== password) {
            return res.status(401).json({ error: "Sai mật khẩu!" });
        }

        res.json({ success: true, user: user.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server!" });
    }
};