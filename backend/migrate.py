import os
import psycopg2
from dotenv import load_dotenv

# Load biến môi trường từ file .env
load_dotenv()

# Lấy đường dẫn kết nối
db_url = os.getenv("DATABASE_URL")

def run_migration():
    if not db_url:
        print("❌ Lỗi: Không tìm thấy DATABASE_URL trong file .env")
        return

    try:
        print("🚀 Đang kết nối tới Neon Postgres...")
        # Kết nối Database
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()

        # Đường dẫn folder migrations
        migrations_dir = "migrations"
        
        # Kiểm tra folder có tồn tại không
        if not os.path.exists(migrations_dir):
            print(f"❌ Lỗi: Không tìm thấy folder '{migrations_dir}'")
            return

        # Lấy danh sách file .sql và sắp xếp theo tên (001 -> 002 -> ...)
        migration_files = sorted([f for f in os.listdir(migrations_dir) if f.endswith(".sql")])

        if not migration_files:
            print("⚠️ Không tìm thấy file .sql nào để chạy.")
            return

        print(f"📂 Tìm thấy {len(migration_files)} file migration. Bắt đầu chạy...")

        # Chạy từng file
        for filename in migration_files:
            file_path = os.path.join(migrations_dir, filename)
            print(f"▶️  Đang chạy file: {filename}...")
            
            with open(file_path, "r", encoding="utf-8") as f:
                sql_commands = f.read()
            
            # Thực thi SQL
            cur.execute(sql_commands)
            conn.commit() # Lưu lại ngay sau khi chạy xong 1 file
            print(f"✅  Xong file: {filename}")

        print("🎉 TẤT CẢ MIGRATION ĐÃ HOÀN TẤT THÀNH CÔNG!")
        
        # Đóng kết nối
        cur.close()
        conn.close()

    except Exception as e:
        print(f"❌ Có lỗi xảy ra: {e}")
        # Nếu lỗi thì rollback (hoàn tác) để tránh dữ liệu bị hỏng giữa chừng
        if 'conn' in locals() and conn:
            conn.rollback()

if __name__ == "__main__":
    run_migration()