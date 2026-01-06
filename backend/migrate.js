import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/db.js'; // Nhớ phải có đuôi .js ở đây

// Thiết lập __dirname cho ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
    const migrationsDir = path.join(__dirname, 'migrations');
    
    try {
        // Đọc tất cả file .sql trong thư mục migrations
        const files = fs.readdirSync(migrationsDir).sort();
        
        for (const file of files) {
            if (file.endsWith('.sql')) {
                console.log(`🚀 Đang chạy migration: ${file}...`);
                const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
                
                // Thực thi câu lệnh SQL
                await pool.query(sql);
                console.log(`✅ Hoàn thành: ${file}`);
            }
        }
        
        console.log("\n🎉 CHÚC MỪNG CK! TẤT CẢ BẢNG ĐÃ ĐƯỢC TẠO THÀNH CÔNG.");
    } catch (err) {
        console.error("❌ Lỗi trong quá trình chạy migration:", err.message);
    } finally {
        await pool.end(); // Đóng kết nối sau khi xong
        process.exit();
    }
}

runMigrations();