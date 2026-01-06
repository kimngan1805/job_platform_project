const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// THÊM ĐOẠN NÀY ĐỂ TEST KẾT NỐI
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Lỗi kết nối database Neon:', err.stack);
  }
  console.log('✅ Đã kết nối thành công với Neon Database!');
  release();
});

module.exports = pool;