const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Kết nối thẳng tới Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ROUTE 1: Test xem server có sống không
app.get('/', (req, res) => res.send("🚀 SERVER ĐANG SỐNG, ĐỪNG TẮT TERMINAL NHA ANH!"));

// ROUTE 2: Lấy data từ bảng recruiter_profiles
app.get('/api/admin/companies', async (req, res) => {
  try {
    console.log("--- ĐANG QUÉT DATABASE NEON ---");
    const result = await pool.query('SELECT * FROM recruiter_profiles');
    console.log("✅ Đã thấy " + result.rows.length + " công ty!");
    
    res.json({ success: true, data: { newToday: result.rows, pending: [], verified: [], banned: [] } });
  } catch (err) {
    console.error("❌ LỖI KẾT NỐI NEON:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n🔥 SERVER ĐANG TÚC TRỰC TẠI PORT ${PORT}`);
  console.log(`👉 Link 1 (Test sống): http://localhost:5000/`);
  console.log(`👉 Link 2 (Lấy data): http://localhost:5000/api/admin/companies`);
  console.log(`\n⚠️  LƯU Ý: Nếu thấy hiện lại dòng chữ '(base)...%' ở dưới là server đã tắt, anh phải chạy lại lệnh!`);
});

// Giữ cho process không bị exit vô duyên
setInterval(() => {}, 1000 * 60 * 60);