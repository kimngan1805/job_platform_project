import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();

    // --- STATE QUẢN LÝ ---
    const [activeTab, setActiveTab] = useState('applications'); // Tab đang chọn
    const [modalType, setModalType] = useState(null); // Modal: 'cv', 'feedback'

    // --- STATE USER & NAVBAR ---
    const [userRole, setUserRole] = useState('');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const userRef = useRef(null);

    // --- EFFECT: LẤY DATA & ANIMATION ---
    useEffect(() => {
        // 1. Lấy role user
        const savedData = localStorage.getItem('user_data');
        if (savedData) {
            const user = JSON.parse(savedData);
            setUserRole(user.role);
        }

        // 2. Animation thanh % hồ sơ
        const timer = setTimeout(() => {
            const fill = document.querySelector('.score-fill');
            if (fill) fill.style.width = '70%';
        }, 500);

        // 3. Xử lý click ra ngoài để tắt dropdown
        function handleClickOutside(event) {
            if (userRef.current && !userRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // --- LOGOUT ---
    const handleLogout = () => {
        if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
            localStorage.removeItem('user_data');
            navigate('/login');
        }
    };

    return (
        <div className="profile-wrapper">

            {/* ================= HEADER / NAVBAR ================= */}
            <header className="profile-navbar">
                <div className="nav-content">
                    {/* Logo */}
                    <div className="logo-area" onClick={() => navigate('/dashboard')}>
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">Finder.</span>
                    </div>

                    {/* Menu Links */}
                    <nav className="nav-links">
                        <a onClick={() => navigate('/find-jobs')}>Tìm Việc</a>
                        <a className="active">Hồ Sơ & CV</a>
                        <a onClick={() => navigate('/recruiter')}>Công Ty</a>
                        <a onClick={() => navigate('/tools')}>Công Cụ</a>
                    </nav>

                    {/* User Area */}
                    <div className="user-area" ref={userRef} onClick={() => setShowUserDropdown(!showUserDropdown)}>
                        <span className="user-name">{userRole === 'recruiter' ? 'HR Manager' : 'Ngân Kim'}</span>
                        <div className="user-avatar-small">
                            {userRole === 'recruiter' ? 'HR' : 'NK'}
                        </div>

                        {/* Dropdown Menu */}
                        {showUserDropdown && (
                            <div className="user-dropdown">
                                <div className="dropdown-item" onClick={() => setActiveTab('profile')}>Hồ sơ cá nhân</div>
                                <div className="dropdown-item" onClick={() => navigate('/settings')}>Cài đặt</div>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item logout" onClick={handleLogout}>Đăng xuất</div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ================= BODY CONTENT ================= */}
            <div className="profile-container">

                {/* --- SIDEBAR TRÁI --- */}
                <div className="profile-sidebar">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            👤
                            <div className="avatar-upload">📷</div>
                        </div>
                        <div className="profile-name">Ngân Kim</div>
                        <div className="profile-title">Frontend Developer</div>

                        <div className="profile-score">
                            <div className="score-label">Độ hoàn thiện hồ sơ</div>
                            <div className="score-bar">
                                <div className="score-fill" style={{ width: '0%' }}></div>
                            </div>
                            <div className="score-text">70% - Thêm Portfolio để đạt 100%</div>
                        </div>
                    </div>

                    <div className="profile-menu">
                        <div className={`menu-item ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
                            <span className="menu-icon">📋</span>
                            <span className="menu-label">Lịch sử ứng tuyển</span>
                            <span className="menu-badge">5</span>
                        </div>
                        <div className={`menu-item ${activeTab === 'cvs' ? 'active' : ''}`} onClick={() => setActiveTab('cvs')}>
                            <span className="menu-icon">📄</span>
                            <span className="menu-label">Kho CV</span>
                        </div>
                        <div className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                            <span className="menu-icon">👤</span>
                            <span className="menu-label">Hồ sơ cá nhân</span>
                        </div>
                        <div className={`menu-item ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
                            <span className="menu-icon">❤️</span>
                            <span className="menu-label">Việc đã lưu</span>
                            <span className="menu-badge">12</span>
                        </div>
                        <div className={`menu-item ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')}>
                            <span className="menu-icon">📊</span>
                            <span className="menu-label">Thống kê</span>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT PHẢI --- */}
                <div className="profile-main-content">

                    {/* TAB 1: LỊCH SỬ ỨNG TUYỂN */}
                    {activeTab === 'applications' && (
                        <div className="tab-content active">
                            <div className="content-header">
                                <h1>📋 Lịch sử ứng tuyển</h1>
                                <p>Theo dõi trạng thái các đơn ứng tuyển của bạn</p>
                            </div>

                            <div className="filter-bar">
                                <label>Lọc theo trạng thái:</label>
                                <select>
                                    <option value="">Tất cả</option>
                                    <option value="submitted">Đã nộp</option>
                                    <option value="viewed">Đã xem</option>
                                    <option value="interview">Phỏng vấn</option>
                                    <option value="accepted">Trúng tuyển</option>
                                    <option value="rejected">Từ chối</option>
                                </select>
                                <select>
                                    <option value="">Sắp xếp</option>
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                </select>
                            </div>

                            <div className="cards-grid">
                                {/* Card 1 */}
                                <div className="app-card">
                                    <div className="card-header">
                                        <div>
                                            <div className="card-title">Senior UI/UX Designer</div>
                                            <div className="card-company">🏢 Google Inc.</div>
                                        </div>
                                        <span className="status-badge status-interview">Phỏng vấn</span>
                                    </div>
                                    <div className="card-date">📅 Nộp ngày: 15/12/2024</div>
                                    <div className="card-actions">
                                        <button className="action-btn action-btn-primary" onClick={() => setModalType('cv')}>
                                            👁️ Xem CV đã nộp
                                        </button>
                                        <button className="action-btn action-btn-secondary" onClick={() => setModalType('feedback')}>
                                            💬 Xem Feedback
                                        </button>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="app-card">
                                    <div className="card-header">
                                        <div>
                                            <div className="card-title">Frontend Developer</div>
                                            <div className="card-company">🏢 FPT Software</div>
                                        </div>
                                        <span className="status-badge status-viewed">Đã xem</span>
                                    </div>
                                    <div className="card-date">📅 Nộp ngày: 18/12/2024</div>
                                    <div className="card-actions">
                                        <button className="action-btn action-btn-primary" onClick={() => setModalType('cv')}>
                                            👁️ Xem CV đã nộp
                                        </button>
                                        <button className="action-btn action-btn-secondary" onClick={() => setModalType('feedback')}>
                                            💬 Xem Feedback
                                        </button>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="app-card">
                                    <div className="card-header">
                                        <div>
                                            <div className="card-title">Business Analyst</div>
                                            <div className="card-company">🏢 Techcombank</div>
                                        </div>
                                        <span className="status-badge status-rejected">Từ chối</span>
                                    </div>
                                    <div className="card-date">📅 Nộp ngày: 10/12/2024</div>
                                    <div className="card-actions">
                                        <button className="action-btn action-btn-primary" onClick={() => setModalType('cv')}>
                                            👁️ Xem CV đã nộp
                                        </button>
                                        <button className="action-btn action-btn-secondary" onClick={() => setModalType('feedback')}>
                                            💬 Xem Feedback
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: CV LIBRARY (ĐÃ CẬP NHẬT) */}
                    {activeTab === 'cvs' && (
                        <div className="tab-content active">
                            <div className="content-header">
                                <h1>📄 Kho CV & Thiết kế</h1>
                                <p>Quản lý CV cá nhân và khám phá kho mẫu chuyên nghiệp</p>
                            </div>

                            {/* PHẦN 1: CV CỦA TÔI */}
                            <h3 className="cv-section-title">📂 CV Của Bạn</h3>
                            <div className="cv-library">
                                {/* Nút tạo mới */}
                                <div className="cv-card create-cv-card" onClick={() => alert("Mở trình Design CV!")}>
                                    <div className="create-cv-icon">➕</div>
                                    <h3>Tạo CV mới</h3>
                                    <p>Tự thiết kế hoặc dùng AI</p>
                                </div>

                                {/* Các CV đã có */}
                                <div className="cv-card">
                                    <div className="cv-default-badge">⭐ Mặc định</div>
                                    <div className="cv-icon">📄</div>
                                    <div className="cv-name">CV Tiếng Anh - IT</div>
                                    <div className="cv-date">Cập nhật: 20/12/2024</div>
                                    <div className="cv-actions">
                                        <button className="cv-btn btn-edit">✏️ Sửa</button>
                                        <button className="cv-btn btn-download">⬇️ Tải</button>
                                        <button className="cv-btn btn-delete">🗑️</button>
                                    </div>
                                </div>

                                <div className="cv-card">
                                    <div className="cv-icon">📄</div>
                                    <div className="cv-name">CV Tiếng Việt</div>
                                    <div className="cv-date">Cập nhật: 15/12/2024</div>
                                    <div className="cv-actions">
                                        <button className="cv-btn btn-edit">✏️ Sửa</button>
                                        <button className="cv-btn btn-download">⬇️ Tải</button>
                                        <button className="cv-btn btn-delete">🗑️</button>
                                    </div>
                                </div>
                            </div>

                            {/* PHẦN 2: KHO GIAO DIỆN MẪU (TEMPLATE GALLERY) */}
                            <div className="template-gallery">

                                {/* Dòng 1: Mẫu Phổ Biến */}
                                <div className="template-section">
                                    <div className="section-title-row">
                                        <h3>🔥 Mẫu Phổ Biến Nhất</h3>
                                        <span className="view-all">Xem tất cả →</span>
                                    </div>
                                    <div className="template-grid">
                                        {/* Template 1 */}
                                        <div className="template-card">
                                            <div className="template-preview" style={{ background: 'linear-gradient(to bottom right, #e0f2fe, #3b82f6)' }}>
                                                <div className="preview-lines"></div>
                                                <span className="template-tag">Modern</span>
                                            </div>
                                            <div className="template-info">
                                                <h4>Modern Blue</h4>
                                                <p>Phù hợp: IT, Kỹ thuật</p>
                                                <button className="btn-use-template">Dùng mẫu này</button>
                                            </div>
                                        </div>

                                        {/* Template 2 */}
                                        <div className="template-card">
                                            <div className="template-preview" style={{ background: 'linear-gradient(to bottom right, #fdf4ff, #d946ef)' }}>
                                                <div className="preview-lines"></div>
                                                <span className="template-tag">Creative</span>
                                            </div>
                                            <div className="template-info">
                                                <h4>Creative Pink</h4>
                                                <p>Phù hợp: Marketing, Design</p>
                                                <button className="btn-use-template">Dùng mẫu này</button>
                                            </div>
                                        </div>

                                        {/* Template 3 */}
                                        <div className="template-card">
                                            <div className="template-preview" style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #22c55e)' }}>
                                                <div className="preview-lines"></div>
                                                <span className="template-tag">Professional</span>
                                            </div>
                                            <div className="template-info">
                                                <h4>Clean Green</h4>
                                                <p>Phù hợp: Kinh doanh, Bank</p>
                                                <button className="btn-use-template">Dùng mẫu này</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dòng 2: Mẫu Harvard / Academic */}
                                <div className="template-section">
                                    <div className="section-title-row">
                                        <h3>🎓 Mẫu Harvard / Học thuật</h3>
                                        <span className="view-all">Xem tất cả →</span>
                                    </div>
                                    <div className="template-grid">
                                        <div className="template-card">
                                            <div className="template-preview" style={{ background: '#ffffff', border: '1px solid #eee' }}>
                                                <div className="preview-lines" style={{ opacity: 0.3, background: 'black' }}></div>
                                                <span className="template-tag" style={{ background: '#333' }}>Classic</span>
                                            </div>
                                            <div className="template-info">
                                                <h4>Harvard Classic</h4>
                                                <p>Phù hợp: Fresher, Học bổng</p>
                                                <button className="btn-use-template">Dùng mẫu này</button>
                                            </div>
                                        </div>

                                        <div className="template-card">
                                            <div className="template-preview" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                                <div className="preview-lines" style={{ opacity: 0.4, background: '#475569' }}></div>
                                                <span className="template-tag" style={{ background: '#475569' }}>Minimal</span>
                                            </div>
                                            <div className="template-info">
                                                <h4>Minimal Grey</h4>
                                                <p>Phù hợp: Quản lý, HR</p>
                                                <button className="btn-use-template">Dùng mẫu này</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* TAB 3: HỒ SƠ CÁ NHÂN */}
                    {activeTab === 'profile' && (
                        <div className="tab-content active">
                            <div className="content-header">
                                <h1>👤 Hồ sơ cá nhân</h1>
                                <p>Thông tin này sẽ tự động điền vào CV của bạn</p>
                            </div>

                            <div className="profile-form">
                                <div className="form-section">
                                    <h3>Thông tin cơ bản</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Họ và tên *</label>
                                            <input type="text" defaultValue="Ngân Kim" />
                                        </div>
                                        <div className="form-group">
                                            <label>Tiêu đề nghề nghiệp *</label>
                                            <input type="text" defaultValue="Frontend Developer" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" defaultValue="ngankim@example.com" />
                                        </div>
                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input type="tel" defaultValue="0123456789" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Giới thiệu bản thân</label>
                                        <textarea defaultValue="Tôi là một Frontend Developer với 3 năm kinh nghiệm..."></textarea>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Kinh nghiệm làm việc</h3>
                                    <div className="timeline">
                                        <div className="timeline-item">
                                            <h4>Frontend Developer</h4>
                                            <p style={{ color: '#667eea', margin: '5px 0' }}>ABC Tech Company</p>
                                            <p style={{ color: '#999', fontSize: '0.9em' }}>01/2022 - Hiện tại</p>
                                        </div>
                                    </div>
                                    <button className="btn-add-item">➕ Thêm kinh nghiệm</button>
                                </div>

                                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                                    <button className="btn-add-item" style={{ width: 'auto' }}>💾 Lưu thay đổi</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 4: VIỆC ĐÃ LƯU */}
                    {activeTab === 'saved' && (
                        <div className="tab-content active">
                            <div className="content-header">
                                <h1>❤️ Việc làm đã lưu</h1>
                                <p>Những công việc bạn quan tâm</p>
                            </div>
                            <div className="cards-grid">
                                <div className="app-card">
                                    <div className="card-header">
                                        <div>
                                            <div className="card-title">Senior React Developer</div>
                                            <div className="card-company">Tech Innovation Co.</div>
                                        </div>
                                        <span style={{ cursor: 'pointer', fontSize: '1.2em' }}>❤️</span>
                                    </div>
                                    <div style={{ color: '#667eea', fontWeight: 'bold', margin: '10px 0' }}>$1500 - $2500</div>
                                    <div className="card-date">⏰ Còn 5 ngày để nộp đơn</div>
                                    <div className="card-actions">
                                        <button className="action-btn action-btn-primary" onClick={() => navigate('/job-detail')}>Ứng tuyển ngay</button>
                                    </div>
                                </div>
                                <div className="app-card">
                                    <div className="card-header">
                                        <div>
                                            <div className="card-title">Product Owner</div>
                                            <div className="card-company">VNG Corp</div>
                                        </div>
                                        <span style={{ cursor: 'pointer', fontSize: '1.2em' }}>❤️</span>
                                    </div>
                                    <div style={{ color: '#667eea', fontWeight: 'bold', margin: '10px 0' }}>Thỏa thuận</div>
                                    <div className="card-date">⏰ Còn 10 ngày để nộp đơn</div>
                                    <div className="card-actions">
                                        <button className="action-btn action-btn-primary" onClick={() => navigate('/job-detail')}>Ứng tuyển ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 5: THỐNG KÊ */}
                    {activeTab === 'insights' && (
                        <div className="tab-content active">
                            <div className="content-header">
                                <h1>📊 Thống kê & Insight</h1>
                                <p>Hiệu quả hồ sơ của bạn</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2em', marginBottom: '10px' }}>👁️</div>
                                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>24</div>
                                    <div style={{ color: '#666' }}>Lượt xem hồ sơ</div>
                                </div>
                                <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2em', marginBottom: '10px' }}>📨</div>
                                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>12</div>
                                    <div style={{ color: '#666' }}>Đơn đã nộp</div>
                                </div>
                                <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2em', marginBottom: '10px' }}>🎯</div>
                                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>33%</div>
                                    <div style={{ color: '#666' }}>Tỷ lệ phản hồi</div>
                                </div>
                                <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2em', marginBottom: '10px' }}>⭐</div>
                                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>85%</div>
                                    <div style={{ color: '#666' }}>Điểm hồ sơ</div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* ================= MODALS (POPUP) ================= */}
            {modalType && (
                <div className="modal-overlay" onClick={() => setModalType(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{modalType === 'cv' ? '📄 CV đã nộp' : '💬 Lịch sử & Feedback'}</h2>
                            <span className="modal-close" onClick={() => setModalType(null)}>✕</span>
                        </div>

                        {modalType === 'cv' && (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <div style={{ height: '200px', background: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '3em' }}>📄</span>
                                    <p style={{ marginTop: '10px' }}>Preview CV File.pdf</p>
                                </div>
                                <button className="btn-add-item" style={{ width: '100%', justifyContent: 'center' }}>📥 Tải xuống CV</button>
                            </div>
                        )}

                        {modalType === 'feedback' && (
                            <div className="feedback-timeline">
                                <div className="timeline-item">
                                    <h4>✅ HR đã xem hồ sơ</h4>
                                    <p style={{ fontSize: '0.9em', color: '#666' }}>20/12/2024 - 10:30 AM</p>
                                </div>
                                <div className="timeline-item">
                                    <h4>📧 Mời phỏng vấn</h4>
                                    <p style={{ fontSize: '0.9em', color: '#666' }}>Bạn được mời phỏng vấn lúc 9:00 AM.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;