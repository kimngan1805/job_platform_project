const pool = require('../config/db');
// 1. Lấy danh sách chia 4 luồng
// File: server/src/controllers/adminController.js
exports.getCompaniesBySections = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recruiter_profiles ORDER BY created_at DESC');
    const all = result.rows;

    res.json({
      success: true,
      data: {
        // Lọc đúng cột 'verification_status' từ Neon
        newToday: all.filter(c => c.verification_status === 'pending'), 
        pending: [], 
        verified: all.filter(c => c.verification_status === 'verified'),
        banned: all.filter(c => c.verification_status === 'rejected')
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. AI Duyệt thử (Chỉ phân tích, chưa lưu vào DB)
exports.analyzeWithAI = async (req, res) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const result = await pool.query(
      "SELECT * FROM recruiter_profiles WHERE created_at > $1 AND verification_status = 'pending'",
      [oneHourAgo]
    );
    
    // Giả lập logic AI phân tích (Sau này anh có thể gọi API OpenAI ở đây)
    const analyzedData = result.rows.map(company => ({
      ...company,
      aiScore: Math.floor(Math.random() * 40) + 60, // Giả lập điểm từ 60-100
      analysis: company.tax_code ? "MST hợp lệ. Website hoạt động." : "Thiếu thông tin xác thực.",
      suggestion: company.tax_code ? "VERIFY" : "BAN"
    }));

    res.json({ success: true, results: analyzedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Cập nhật trạng thái sau khi Admin nhấn "Đồng ý"
exports.updateStatus = async (req, res) => {
  const { id, status } = req.body; // status: 'verified' hoặc 'rejected'
  try {
    await pool.query(
      'UPDATE recruiter_profiles SET verification_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [status, id]
    );
    res.json({ success: true, message: `Đã cập nhật trạng thái thành ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};