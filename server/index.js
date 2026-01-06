const express = require('express');
const cors = require('cors');
require('dotenv').config();
const adminRoutes = require('./src/routes/adminRoutes');
const app = express();
app.use(cors()); // Bắt buộc phải có để React gọi được API
app.use(express.json());

// 2. Thêm cái này để test cực nhanh trên trình duyệt
app.get('/api/test', (req, res) => res.json({ message: "Server đang sống!" }));

// 3. Đăng ký route chính
app.use('/api/admin', adminRoutes);
// TRONG FILE REACT (Frontend)
const fetchCompanies = async () => {
    try {
        // ĐỔI TỪ 5000 SANG 5050 ĐỂ GỌI ĐÚNG SERVER PYTHON
        const res = await fetch('http://localhost:5050/api/admin/companies'); 
        const result = await res.json();
        if (result.success) setCompanies(result.data);
    } catch (err) {
        console.log("Lỗi:", err);
    }
};
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));