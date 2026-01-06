from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
from datetime import datetime

# Load biến môi trường từ file .env (DATABASE_URL)
load_dotenv()

app = Flask(__name__)
# Cho phép React (Port 3000/5173) gọi vào API này mà không bị chặn
CORS(app) 

# Hàm kết nối tới database Neon của Ngân
def get_db_connection():
    try:
        conn = psycopg2.connect(os.getenv('DATABASE_URL'), sslmode='require')
        return conn
    except Exception as e:
        print(f"❌ Lỗi kết nối Neon: {e}")
        return None

# 1. API lấy danh sách công ty chia theo 4 luồng
@app.route('/api/admin/companies', methods=['GET'])
def get_companies():
    conn = get_db_connection()
    if not conn:
        return jsonify({"success": False, "error": "Database connection failed"}), 500
    
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        # Truy vấn đúng bảng recruiter_profiles
        cur.execute('SELECT * FROM recruiter_profiles ORDER BY created_at DESC')
        all_rows = cur.fetchall()
        cur.close()
        conn.close()

        # Phân loại dựa trên cột 'verification_status' trong Neon
        data = {
            "newToday": [c for c in all_rows if c['verification_status'] == 'pending'],
            "pending": [], # Logic pending cũ có thể thêm sau
            "verified": [c for c in all_rows if c['verification_status'] == 'verified'],
            "banned": [c for c in all_rows if c['verification_status'] == 'rejected']
        }
        
        return jsonify({"success": True, "data": data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# 2. API Cập nhật trạng thái (Duyệt/Cấm)
@app.route('/api/admin/update-status', methods=['POST'])
def update_status():
    req_data = request.json
    company_id = req_data.get('id')
    new_status = req_data.get('status') # 'verified' hoặc 'rejected'

    conn = get_db_connection()
    try:
        cur = conn.cursor()
        # Cập nhật trực tiếp vào Neon
        cur.execute(
            'UPDATE recruiter_profiles SET verification_status = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s',
            (new_status, company_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"success": True, "message": f"Đã chuyển sang {new_status}"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# API dành riêng để duyệt bài đăng tuyển dụng
@app.route('/api/admin/approve-job', methods=['POST'])
def approve_job():
    req_data = request.json
    job_id = req_data.get('id')
    
    conn = get_db_connection()
    try:
        cur = conn.cursor()
        # Cập nhật trạng thái thành 'approved' trong bảng job_posts
        cur.execute(
            "UPDATE job_posts SET status = 'approved' WHERE id = %s",
            (job_id,)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"success": True, "message": "Đã duyệt bài đăng thành công!"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/admin/reject-job', methods=['POST'])
def reject_job():
    req_data = request.json
    job_id = req_data.get('id')
    reason = req_data.get('reason') # Lấy lý do từ UI gửi lên
    
    conn = get_db_connection()
    try:
        cur = conn.cursor()
        # Cập nhật trạng thái thành 'rejected' và lưu lý do
        cur.execute(
            "UPDATE job_posts SET status = 'rejected', rejection_reason = %s WHERE id = %s",
            (reason, job_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"success": True, "message": "Đã từ chối bài đăng."})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@app.route('/api/admin/all-jobs', methods=['GET'])
def get_all_jobs_admin():
    conn = get_db_connection()
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        # JOIN hai bảng để lấy cả tên công ty
        cur.execute('''
            SELECT j.*, r.company_name 
            FROM job_posts j 
            LEFT JOIN recruiter_profiles r ON j.recruiter_id = r.id 
            ORDER BY j.created_at DESC
        ''')
        jobs = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({"success": True, "data": jobs})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
# 3. Route phụ để anh test trên trình duyệt
@app.route('/test')
def test_server():
    return "🚀 Server Python của anh đang chạy cực khỏe tại Port 5001!"

if __name__ == '__main__':
    print("\n✅ SERVER ĐANG CHẠY TẠI CỔNG 5050")
    print("👉 Link test: http://127.0.0.1:5050/api/admin/companies\n")
    # Chạy ở cổng 5050 cho an toàn tuyệt đối
    app.run(host='127.0.0.1', port=5050, debug=True)