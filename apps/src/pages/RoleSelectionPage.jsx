// src/pages/onboarding/RoleSelectionPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RoleSelectionPage.css';

const RoleSelectionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="role-page-body">
            <div className="role-container">
                <div className="role-header">
                    <h1 className="role-title">Chào mừng đến với Finder! 🚀</h1>
                    <p className="role-subtitle">Bạn muốn tham gia hệ thống với vai trò gì?</p>
                </div>

                <div className="role-cards">
                    {/* Card 1: Ứng viên */}
                    <div className="role-card candidate" onClick={() => navigate('/onboarding/candidate')}>
                        <div className="role-icon-wrapper">
                            <span className="role-icon">👨‍💻</span>
                        </div>
                        <h3 className="role-name">Tôi là Ứng viên</h3>
                        <p className="role-desc">
                            Tôi đang tìm kiếm việc làm, muốn tạo CV và kết nối với các công ty hàng đầu.
                        </p>
                        <button className="role-btn">Chọn Ứng viên ➝</button>
                    </div>

                    {/* Card 2: Nhà tuyển dụng */}
                    <div className="role-card recruiter" onClick={() => navigate('/onboarding/recruiter')}>
                        <div className="role-icon-wrapper">
                            <span className="role-icon">🏢</span>
                        </div>
                        <h3 className="role-name">Tôi là Nhà tuyển dụng</h3>
                        <p className="role-desc">
                            Tôi muốn đăng tin tuyển dụng, tìm kiếm nhân tài và quản lý hồ sơ ứng viên.
                        </p>
                        <button className="role-btn">Chọn Nhà tuyển dụng ➝</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionPage;