// src/pages/recruiter/InfoCvPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoCvPage.css';

const InfoCvPage = () => {
    const navigate = useNavigate();

    // --- States Quản lý View ---
    const [showCandidatesSection, setShowCandidatesSection] = useState(false);
    const [selectedJobName, setSelectedJobName] = useState('');

    // State cho phần Sidebar chi tiết ứng viên
    const [selectedCandidate, setSelectedCandidate] = useState(null); // null = ẩn, có object = hiện

    // --- Handlers Logic ---

    // 1. Hàm hiển thị danh sách ứng viên
    const showCandidates = (jobTitle) => {
        setSelectedJobName(jobTitle);
        setShowCandidatesSection(true);
        window.scrollTo(0, 0);
    };

    // 2. Hàm quay lại danh sách công việc
    const backToJobs = () => {
        setShowCandidatesSection(false);
        setSelectedJobName('');
        window.scrollTo(0, 0);
    };

    // 3. Hàm hiện Sidebar chi tiết ứng viên
    const showCandidateDetail = (candidateName) => {
        setSelectedCandidate({
            name: candidateName,
            email: 'nguyenvanan@email.com' // Demo data
        });
        document.body.style.overflow = 'hidden';
    };

    // 4. Hàm đóng Sidebar
    const closeCandidateDetail = () => {
        setSelectedCandidate(null);
        document.body.style.overflow = 'auto';
    };

    // 5. Hàm chuyển sang trang Tin nhắn (MỚI THÊM)
    const goToMessages = () => {
        // Chuyển trang và mang theo thông tin ứng viên (nếu cần dùng bên kia)
        navigate('/recruiter/messages', { state: { candidate: selectedCandidate } });
    };

    return (
        <div className="info-cv-body">
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <span>⚡</span> GoJobs Recruiter
                </div>

                <nav className="nav-menu">
                    {/* 1. Tìm Việc -> Về trang FindJob */}
                    <a className="nav-link" onClick={() => navigate('/find-jobs')}>Tìm Việc</a>

                    {/* 2. Hồ sơ & CV -> Tạm thời chưa có */}
                    <a className="nav-link" onClick={() => navigate('/profile-cv')}>Hồ Sơ & CV</a>

                    {/* 3. Nhà Tuyển Dụng -> Về trang chủ Recruiter (Trang hiện tại) */}
                    <a className="nav-link active" onClick={() => navigate('/recruiter')} style={{ color: '#8B5CF6' }}>Nhà Tuyển Dụng</a>

                    {/* 4. Công Cụ -> Tạm thời chưa có */}
                    <a className="nav-link" onClick={() => navigate('/tools')}>Công Cụ</a>
                </nav>

                <div className="header-right">
                    <div className="notification-icon">
                        <i className="fas fa-bell"></i>
                        <span className="notification-badge">5</span>
                    </div>
                    <div className="user-profile">
                        <div className="user-avatar">HR</div>
                        <span>HR Manager</span>
                    </div>
                </div>
            </header>

            {/* Main Container */}
            <div className="main-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <ul className="sidebar-menu">
                        {/* 1. Hồ sơ ứng viên -> Đang ở đây (Active) */}
                        <li>
                            <a className="active" style={{ cursor: 'pointer' }}>
                                <span style={{ marginRight: '10px' }}>📂</span> Hồ sơ ứng viên
                            </a>
                        </li>

                        {/* 2. Công việc đã đăng -> Về trang chủ Recruiter */}
                        <li>
                            <a onClick={() => navigate('/recruiter')} style={{ cursor: 'pointer' }}>
                                <span style={{ marginRight: '10px' }}>💼</span> Công việc đã đăng
                            </a>
                        </li>

                        {/* 3. Tin nhắn -> Qua trang Message */}
                        <li>
                            <a onClick={() => navigate('/recruiter/messages')} style={{ cursor: 'pointer' }}>
                                <span style={{ marginRight: '10px' }}>💬</span> Tin nhắn
                            </a>
                        </li>

                        <li><a onClick={() => navigate('/recruiter/statistics')} style={{ cursor: 'pointer' }}><span style={{ marginRight: '10px' }}>📊</span> Thống kê</a></li>
                        <li><a onClick={() => navigate('/recruiter/settings')} style={{ cursor: 'pointer' }}><span style={{ marginRight: '10px' }}>⚙️</span> Cài đặt</a></li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="content">
                    <div className="content-header">
                        <div>
                            <div className="breadcrumb">
                                <span
                                    className={!showCandidatesSection ? 'active' : ''}
                                    onClick={backToJobs}
                                    id="breadcrumb-jobs"
                                >
                                    Tin tuyển dụng
                                </span>
                                {showCandidatesSection && (
                                    <>
                                        <span id="breadcrumb-arrow">→</span>
                                        <span className="active" id="breadcrumb-candidates">Danh sách ứng viên</span>
                                    </>
                                )}
                            </div>
                            <h1 className="content-title">Quản lý hồ sơ ứng viên</h1>
                        </div>
                    </div>

                    {/* Search & Filter */}
                    <div className="search-filter-bar">
                        <div className="search-box">
                            <input type="text" className="search-input" placeholder="🔍 Tìm kiếm theo tên công việc, vị trí..." />
                            <button className="btn-search">Tìm kiếm</button>
                        </div>
                        <div className="filters">
                            <select className="filter-select">
                                <option>Tất cả trạng thái</option>
                                <option>Đang tuyển</option>
                                <option>Tạm dừng</option>
                                <option>Đã đóng</option>
                            </select>
                            <select className="filter-select">
                                <option>Ngày đăng gần nhất</option>
                                <option>Nhiều ứng viên nhất</option>
                                <option>Ít ứng viên nhất</option>
                            </select>
                        </div>
                    </div>

                    {/* Job Cards Section - Ẩn khi showCandidatesSection = true */}
                    {!showCandidatesSection && (
                        <div id="jobs-section" className="jobs-grid">
                            <div className="job-card" onClick={() => showCandidates('Frontend Developer')}>
                                <div className="job-icon">💻</div>
                                <h3 className="job-title">Frontend Developer</h3>
                                <div className="job-meta">
                                    <div>📍 Hà Nội, Việt Nam</div>
                                    <div>💰 15-25 triệu VNĐ</div>
                                    <div>🕒 Đăng 5 ngày trước</div>
                                </div>
                                <div className="job-stats">
                                    <div className="stat-item">
                                        <div className="stat-number">15</div>
                                        <div className="stat-label">Ứng viên</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">8</div>
                                        <div className="stat-label">Đã duyệt</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">3</div>
                                        <div className="stat-label">Phỏng vấn</div>
                                    </div>
                                </div>
                            </div>

                            <div className="job-card" onClick={() => showCandidates('Backend Developer')}>
                                <div className="job-icon">⚙️</div>
                                <h3 className="job-title">Backend Developer</h3>
                                <div className="job-meta">
                                    <div>📍 TP.HCM, Việt Nam</div>
                                    <div>💰 18-30 triệu VNĐ</div>
                                    <div>🕒 Đăng 3 ngày trước</div>
                                </div>
                                <div className="job-stats">
                                    <div className="stat-item">
                                        <div className="stat-number">12</div>
                                        <div className="stat-label">Ứng viên</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">6</div>
                                        <div className="stat-label">Đã duyệt</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">2</div>
                                        <div className="stat-label">Phỏng vấn</div>
                                    </div>
                                </div>
                            </div>

                            <div className="job-card" onClick={() => showCandidates('UI/UX Designer')}>
                                <div className="job-icon">🎨</div>
                                <h3 className="job-title">UI/UX Designer</h3>
                                <div className="job-meta">
                                    <div>📍 Đà Nẵng, Việt Nam</div>
                                    <div>💰 12-20 triệu VNĐ</div>
                                    <div>🕒 Đăng 1 tuần trước</div>
                                </div>
                                <div className="job-stats">
                                    <div className="stat-item">
                                        <div className="stat-number">20</div>
                                        <div className="stat-label">Ứng viên</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">10</div>
                                        <div className="stat-label">Đã duyệt</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">5</div>
                                        <div className="stat-label">Phỏng vấn</div>
                                    </div>
                                </div>
                            </div>

                            <div className="job-card" onClick={() => showCandidates('Product Manager')}>
                                <div className="job-icon">📊</div>
                                <h3 className="job-title">Product Manager</h3>
                                <div className="job-meta">
                                    <div>📍 Hà Nội, Việt Nam</div>
                                    <div>💰 25-35 triệu VNĐ</div>
                                    <div>🕒 Đăng 2 ngày trước</div>
                                </div>
                                <div className="job-stats">
                                    <div className="stat-item">
                                        <div className="stat-number">8</div>
                                        <div className="stat-label">Ứng viên</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">4</div>
                                        <div className="stat-label">Đã duyệt</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">1</div>
                                        <div className="stat-label">Phỏng vấn</div>
                                    </div>
                                </div>
                            </div>

                            <div className="job-card" onClick={() => showCandidates('Marketing Manager')}>
                                <div className="job-icon">📱</div>
                                <h3 className="job-title">Marketing Manager</h3>
                                <div className="job-meta">
                                    <div>📍 TP.HCM, Việt Nam</div>
                                    <div>💰 20-30 triệu VNĐ</div>
                                    <div>🕒 Đăng 4 ngày trước</div>
                                </div>
                                <div className="job-stats">
                                    <div className="stat-item">
                                        <div className="stat-number">18</div>
                                        <div className="stat-label">Ứng viên</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">9</div>
                                        <div className="stat-label">Đã duyệt</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">4</div>
                                        <div className="stat-label">Phỏng vấn</div>
                                    </div>
                                </div>
                            </div>

                            <div className="job-card" onClick={() => showCandidates('DevOps Engineer')}>
                                <div className="job-icon">🔧</div>
                                <h3 className="job-title">DevOps Engineer</h3>
                                <div className="job-meta">
                                    <div>📍 Remote</div>
                                    <div>💰 22-35 triệu VNĐ</div>
                                    <div>🕒 Đăng 6 ngày trước</div>
                                </div>
                                <div className="job-stats">
                                    <div className="stat-item">
                                        <div className="stat-number">10</div>
                                        <div className="stat-label">Ứng viên</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">5</div>
                                        <div className="stat-label">Đã duyệt</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">2</div>
                                        <div className="stat-label">Phỏng vấn</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Candidates Section - Hiện khi showCandidatesSection = true */}
                    {showCandidatesSection && (
                        <div id="candidates-section" className="candidates-section show">
                            <div className="section-header">
                                <h2 className="section-title" id="job-name">{selectedJobName} - Danh sách ứng viên</h2>
                                <button className="btn-search" onClick={backToJobs}>← Quay lại</button>
                            </div>

                            <table className="candidates-table">
                                <thead>
                                    <tr>
                                        <th>Ứng viên</th>
                                        <th>Vị trí ứng tuyển</th>
                                        <th>Ngày ứng tuyển</th>
                                        <th>Ngày phỏng vấn</th>
                                        <th>Bắt đầu thực tập</th>
                                        <th>Kết thúc thực tập</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr onClick={() => showCandidateDetail('Nguyễn Văn An')}>
                                        <td>
                                            <div className="candidate-info-cell">
                                                <div className="candidate-avatar-small">👨‍💻</div>
                                                <div>
                                                    <div className="candidate-name">Nguyễn Văn An</div>
                                                    <div className="candidate-email">nguyenvanan@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Frontend Developer</td>
                                        <td>15/12/2024</td>
                                        <td>20/12/2024</td>
                                        <td>02/01/2025</td>
                                        <td>02/04/2025</td>
                                        <td><span className="status-badge status-intern">Đang thực tập</span></td>
                                    </tr>
                                    <tr onClick={() => showCandidateDetail('Trần Thị Bình')}>
                                        <td>
                                            <div className="candidate-info-cell">
                                                <div className="candidate-avatar-small">👩‍💼</div>
                                                <div>
                                                    <div className="candidate-name">Trần Thị Bình</div>
                                                    <div className="candidate-email">tranthibinh@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Frontend Developer</td>
                                        <td>12/12/2024</td>
                                        <td>18/12/2024</td>
                                        <td>05/01/2025</td>
                                        <td>05/04/2025</td>
                                        <td><span className="status-badge status-interview">Phỏng vấn</span></td>
                                    </tr>
                                    <tr onClick={() => showCandidateDetail('Lê Minh Cường')}>
                                        <td>
                                            <div className="candidate-info-cell">
                                                <div className="candidate-avatar-small">👨‍💻</div>
                                                <div>
                                                    <div className="candidate-name">Lê Minh Cường</div>
                                                    <div className="candidate-email">leminhcuong@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Frontend Developer</td>
                                        <td>10/12/2024</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td><span className="status-badge status-approved">Đã duyệt</span></td>
                                    </tr>
                                    <tr onClick={() => showCandidateDetail('Phạm Thu Dung')}>
                                        <td>
                                            <div className="candidate-info-cell">
                                                <div className="candidate-avatar-small">👩‍💻</div>
                                                <div>
                                                    <div className="candidate-name">Phạm Thu Dung</div>
                                                    <div className="candidate-email">phamthudung@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Frontend Developer</td>
                                        <td>08/12/2024</td>
                                        <td>22/12/2024</td>
                                        <td>10/01/2025</td>
                                        <td>10/04/2025</td>
                                        <td><span className="status-badge status-interview">Phỏng vấn</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            {/* Candidate Detail Sidebar */}
            <div id="candidate-detail" className={`candidate-detail ${selectedCandidate ? 'show' : ''}`}>
                <div className="detail-header">
                    <button className="close-btn" onClick={closeCandidateDetail}>×</button>
                    <div className="detail-avatar" id="detail-avatar">👨‍💻</div>
                    <h2 className="detail-name" id="detail-name">{selectedCandidate ? selectedCandidate.name : 'Nguyễn Văn An'}</h2>
                    <p className="detail-position" id="detail-position">Frontend Developer</p>
                </div>
                <div className="detail-body">
                    <div className="info-section">
                        <h3 className="info-title">📋 Thông tin cơ bản</h3>
                        <div className="info-row">
                            <span className="info-label">Email</span>
                            <span className="info-value" id="detail-email">
                                {selectedCandidate ? selectedCandidate.email : 'nguyenvanan@email.com'}
                            </span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Số điện thoại</span>
                            <span className="info-value">0912345678</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Địa chỉ</span>
                            <span className="info-value">Hà Nội, Việt Nam</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Kinh nghiệm</span>
                            <span className="info-value">3 năm</span>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3 className="info-title">📅 Tiến độ tuyển dụng</h3>
                        <div className="info-row">
                            <span className="info-label">Ngày ứng tuyển</span>
                            <span className="info-value">15/12/2024</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Ngày phỏng vấn</span>
                            <span className="info-value">20/12/2024</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Bắt đầu thực tập</span>
                            <span className="info-value">02/01/2025</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Kết thúc thực tập</span>
                            <span className="info-value">02/04/2025</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Trạng thái</span>
                            <span className="info-value">
                                <span className="status-badge status-intern">Đang thực tập</span>
                            </span>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3 className="info-title">💼 Kỹ năng</h3>
                        <div className="info-row">
                            <span className="info-label">Ngôn ngữ</span>
                            <span className="info-value">JavaScript, TypeScript</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Framework</span>
                            <span className="info-value">React, Vue.js</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Công cụ</span>
                            <span className="info-value">Git, Webpack, Docker</span>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3 className="info-title">📝 Ghi chú</h3>
                        <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                            Ứng viên có kỹ năng tốt, giao tiếp lưu loát. Có kinh nghiệm làm việc với React và Vue.js. Phù hợp với vị trí Frontend Developer.
                        </p>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-action btn-secondary">📄 Xem CV</button>
                        {/* --- NÚT ĐÃ ĐƯỢC GẮN LOGIC CHUYỂN TRANG --- */}
                        <button className="btn-action btn-primary" onClick={goToMessages}>💬 Nhắn tin</button>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div id="overlay" className={`overlay ${selectedCandidate ? 'show' : ''}`} onClick={closeCandidateDetail}></div>
        </div>
    );
};

export default InfoCvPage;