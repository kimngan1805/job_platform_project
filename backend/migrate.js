// backend/migrate.js
const fs = require('fs');
const path = require('path');
const pool = require('./db');

const migrate = async () => {
  const client = await pool.connect();
  try {
    console.log('🚀 Đang bắt đầu chạy migration...');

    // Đọc file SQL
    const sqlPath = path.join(__dirname, 'migrations', '001_init_users.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Chạy lệnh SQL
    await client.query(sql);

    console.log('✅ Tạo bảng thành công!');
    console.log('🎉 Đã thêm User Admin mặc định (nếu chưa có).');
  } catch (err) {
    console.error('❌ Lỗi migration:', err);
  } finally {
    client.release();
    pool.end(); // Đóng kết nối
  }
};

migrate();