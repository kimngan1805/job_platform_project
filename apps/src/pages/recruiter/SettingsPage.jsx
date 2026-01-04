// src/pages/recruiter/SettingsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.css';
// Dùng chung style sidebar từ InfoCvPage nếu muốn, hoặc dùng style trong SettingsPage.css ở trên
import './InfoCvPage.css';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');

    // Hàm render nội dung theo Tab
    const renderContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <div className="settings-panel fade-in">
                        <h2 className="settings-section-title">Thông tin tài khoản</h2>
                        <p className="settings-section-desc">Quản lý thông tin cá nhân và cài đặt đăng nhập của bạn.</p>

                        <div className="avatar-upload">
                            <div className="current-avatar">HR</div>
                            <div>
                                <button className="upload-btn">Thay đổi ảnh đại diện</button>
                                <div style={{ marginTop: '5px', fontSize: '0.85em', color: '#6b7280' }}>JPG, GIF or PNG. Max size 800K</div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col form-group">
                                <label className="form-label">Họ và tên</label>
                                <input type="text" className="form-input" defaultValue="Nguyễn Văn HR" />
                            </div>
                            <div className="form-col form-group">
                                <label className="form-label">Chức vụ</label>
                                <input type="text" className="form-input" defaultValue="HR Manager" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email đăng nhập</label>
                            <input type="email" className="form-input" defaultValue="hr.manager@gojobs.com" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Số điện thoại</label>
                            <input type="tel" className="form-input" defaultValue="0912 345 678" />
                        </div>

                        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                            <button className="cancel-btn">Hủy bỏ</button>
                            <button className="save-btn">Lưu thay đổi</button>
                        </div>
                    </div>
                );
            case 'company':
                return (
                    <div className="settings-panel fade-in">
                        <h2 className="settings-section-title">Hồ sơ công ty</h2>
                        <p className="settings-section-desc">Cập nhật thông tin công ty hiển thị trên trang tuyển dụng.</p>

                        <div className="form-group">
                            <label className="form-label">Tên công ty</label>
                            <input type="text" className="form-input" defaultValue="GoJobs Technology JSC" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Giới thiệu ngắn</label>
                            <textarea className="form-textarea" defaultValue="Công ty công nghệ hàng đầu..." />
                        </div>

                        <div className="form-row">
                            <div className="form-col form-group">
                                <label className="form-label">Website</label>
                                <input type="url" className="form-input" defaultValue="https://gojobs.vn" />
                            </div>
                            <div className="form-col form-group">
                                <label className="form-label">Quy mô</label>
                                <select className="form-input">
                                    <option>10-50 nhân viên</option>
                                    <option>50-100 nhân viên</option>
                                    <option selected>100-500 nhân viên</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                            <button className="cancel-btn">Hủy bỏ</button>
                            <button className="save-btn">Cập nhật hồ sơ</button>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="settings-panel fade-in">
                        <h2 className="settings-section-title">Cài đặt thông báo</h2>
                        <p className="settings-section-desc">Tùy chỉnh cách bạn nhận thông báo từ hệ thống.</p>

                        <div className="setting-toggle-item">
                            <div className="toggle-label">
                                <h4>Email ứng tuyển mới</h4>
                                <p>Nhận email khi có ứng viên nộp hồ sơ</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <div className="setting-toggle-item">
                            <div className="toggle-label">
                                <h4>Thông báo tin nhắn</h4>
                                <p>Nhận email khi có tin nhắn mới từ ứng viên</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <div className="setting-toggle-item">
                            <div className="toggle-label">
                                <h4>Báo cáo hàng tuần</h4>
                                <p>Nhận thống kê hiệu quả tuyển dụng mỗi tuần</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="settings-panel fade-in">
                        <h2 className="settings-section-title">Bảo mật</h2>
                        <p className="settings-section-desc">Quản lý mật khẩu và bảo mật tài khoản.</p>

                        <div className="form-group">
                            <label className="form-label">Mật khẩu hiện tại</label>
                            <input type="password" class="form-input" placeholder="••••••••" />
                        </div>

                        <div className="form-row">
                            <div className="form-col form-group">
                                <label className="form-label">Mật khẩu mới</label>
                                <input type="password" class="form-input" placeholder="••••••••" />
                            </div>
                            <div className="form-col form-group">
                                <label className="form-label">Nhập lại mật khẩu mới</label>
                                <input type="password" class="form-input" placeholder="••••••••" />
                            </div>
                        </div>

                        <button className="save-btn" style={{ marginTop: '10px' }}>Đổi mật khẩu</button>

                        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                            <h4 style={{ color: '#dc2626', marginBottom: '10px' }}>Vùng nguy hiểm</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ color: '#6b7280', fontSize: '0.9em' }}>Xóa tài khoản vĩnh viễn và toàn bộ dữ liệu.</p>
                                <button className="danger-btn">Xóa tài khoản</button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="settings-page-body">
            {/* Header */}
            <header className="settings-header">
                <div className="settings-logo"><span>⚡</span><span>GoJobs Recruiter</span></div>
                <nav>
                    <ul className="settings-nav-menu">
                        {/* 1. Tìm Việc -> Về trang FindJob */}
                        <li><a onClick={() => navigate('/find-jobs')}>Tìm Việc</a></li>

                        {/* 2. Hồ Sơ & CV -> Link tạm */}
                        <li><a onClick={() => navigate('/profile-cv')}>Hồ Sơ & CV</a></li>

                        {/* 3. Nhà Tuyển Dụng -> Về trang chủ Recruiter (Đang active) */}
                        <li><a className="active" onClick={() => navigate('/recruiter')}>Nhà Tuyển Dụng</a></li>

                        {/* 4. Công Cụ -> Link tạm */}
                        <li><a onClick={() => navigate('/tools')}>Công Cụ</a></li>
                    </ul>
                </nav>
                <div className="settings-header-right">
                    <button className="settings-notification-btn">🔔<span className="settings-notification-badge">3</span></button>
                    <div className="settings-user-profile"><div className="settings-user-avatar">HR</div><span>HR Manager</span></div>
                </div>
            </header>

            {/* Main Container */}
            <div className="settings-container">
                {/* Sidebar Main */}
                <aside className="stats-sidebar" style={{ width: '280px', background: 'white', padding: '30px 20px', boxShadow: '2px 0 10px rgba(0,0,0,0.05)', minHeight: 'calc(100vh - 70px)', height: '100%' }}>
                    <ul className="info-cv-sidebar-menu" style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '8px' }}>
                            <a onClick={() => navigate('/recruiter/info-cv')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', textDecoration: 'none', color: '#666', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>
                                📂 Hồ sơ ứng viên
                            </a>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <a onClick={() => navigate('/recruiter')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', textDecoration: 'none', color: '#666', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>
                                💼 Công việc đã đăng
                            </a>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <a onClick={() => navigate('/recruiter/messages')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', textDecoration: 'none', color: '#666', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>
                                💬 Tin nhắn
                            </a>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <a onClick={() => navigate('/recruiter/statistics')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', textDecoration: 'none', color: '#666', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>
                                📊 Thống kê
                            </a>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <a className="active" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', textDecoration: 'none', color: 'white', background: '#6366f1', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>
                                ⚙️ Cài đặt
                            </a>
                        </li>
                    </ul>
                </aside>

                {/* Content */}
                <main className="settings-content">
                    <h1 className="settings-page-title">Cài đặt</h1>

                    <div className="settings-wrapper">
                        {/* Settings Menu Tabs */}
                        <div className="settings-tabs">
                            <div className={`settings-tab-item ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>
                                <span>👤</span> Tài khoản
                            </div>
                            <div className={`settings-tab-item ${activeTab === 'company' ? 'active' : ''}`} onClick={() => setActiveTab('company')}>
                                <span>🏢</span> Hồ sơ công ty
                            </div>
                            <div className={`settings-tab-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
                                <span>🔔</span> Thông báo
                            </div>
                            <div className={`settings-tab-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                                <span>🔒</span> Bảo mật
                            </div>
                        </div>

                        {/* Settings Panel Content */}
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;