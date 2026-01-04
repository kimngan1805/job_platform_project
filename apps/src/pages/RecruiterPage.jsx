// src/pages/RecruiterPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RecruiterPage.css';

const RecruiterPage = () => {
    const navigate = useNavigate();

    // ==================================================================
    // 1. LOGIC MỚI: CHECK ROLE (Thêm đoạn này)
    // ==================================================================
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const savedData = localStorage.getItem('user_data');
        if (savedData) {
            const user = JSON.parse(savedData);
            setUserRole(user.role); // 'recruiter' hoặc 'candidate'
        }
    }, []);

    // ==================================================================
    // 2. STATES CŨ (Giữ nguyên của vợ)
    // ==================================================================
    // --- States for View Management ---
    const [activeView, setActiveView] = useState('folders'); // 'folders' or 'applications'
    const [activeSidebarItem, setActiveSidebarItem] = useState('Hồ sơ ứng viên');
    const [selectedFolder, setSelectedFolder] = useState({ name: '', count: 0 });

    // --- States for AI Analysis ---
    const [analyzing, setAnalyzing] = useState(false);
    const [showAiResults, setShowAiResults] = useState(false);

    // --- States for Chat Modal ---
    const [showChatModal, setShowChatModal] = useState(false);
    const [chatCandidateName, setChatCandidateName] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        {
            sender: 'candidate',
            text: 'Xin chào, cảm ơn quý công ty đã xem xét hồ sơ của em!',
        },
        {
            sender: 'recruiter',
            text: 'Chào bạn! Chúng tôi đã xem qua CV của bạn và rất ấn tượng. Bạn có thể tham gia phỏng vấn vào thứ 5 tuần sau được không?',
        },
    ]);
    const chatMessagesEndRef = useRef(null);

    // --- View Handlers ---
    const openFolder = (folderName, count) => {
        setSelectedFolder({ name: folderName, count });
        setActiveView('applications');
        setShowAiResults(false); // Reset AI results when switching folder
    };

    const closeFolder = () => {
        setActiveView('folders');
    };

    // --- AI Analysis Handler ---
    const handleAnalyzeApplications = () => {
        setAnalyzing(true);
        // Simulate AI analysis delay
        setTimeout(() => {
            setAnalyzing(false);
            setShowAiResults(true);
        }, 2000);
    };

    // --- Candidate Actions ---
    const handleAcceptCandidate = (name) => {
        if (window.confirm(`Bạn có chắc chắn muốn chấp nhận ứng viên ${name}?`)) {
            setChatCandidateName(name);
            setShowChatModal(true);
        }
    };

    const handleRejectCandidate = () => {
        alert('Đã từ chối ứng viên');
    };

    const handleViewCV = (name) => {
        alert(`Xem CV của ${name}`);
    };

    // --- Chat Handlers ---
    const closeChat = () => {
        setShowChatModal(false);
    };

    const handleSendMessage = () => {
        const message = chatInput.trim();
        if (message) {
            setChatMessages([...chatMessages, { sender: 'recruiter', text: message }]);
            setChatInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatMessagesEndRef.current) {
            chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, showChatModal]);


    // ==================================================================
    // 3. GIAO DIỆN RIÊNG CHO ỨNG VIÊN (CANDIDATE)
    // ==================================================================
    if (userRole === 'candidate') {
        return (
            <div style={{ padding: '40px', background: '#F4F7FD', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B71FE', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => navigate('/find-jobs')}>
                        <span>⚡</span> Finder.
                    </div>
                    <button onClick={() => navigate('/find-jobs')} style={{ padding: '10px 20px', border: 'none', background: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <i className="fas fa-arrow-left"></i> Quay lại tìm việc
                    </button>
                </header>

                <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                    <h1 style={{ color: '#2A2E3B', fontSize: '32px', marginBottom: '10px' }}>Top Nhà Tuyển Dụng Hàng Đầu 🏆</h1>
                    <p style={{ color: '#7D8597', marginBottom: '50px' }}>Khám phá văn hóa và cơ hội nghề nghiệp tại các công ty công nghệ lớn nhất.</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
                        {[
                            { name: 'FPT Software', jobs: 12, icon: '💻' },
                            { name: 'VNG Corp', jobs: 8, icon: '🦄' },
                            { name: 'Momo', jobs: 5, icon: '💸' },
                            { name: 'Viettel', jobs: 20, icon: '📡' },
                            { name: 'Shopee', jobs: 15, icon: '🛒' },
                            { name: 'ZaloPay', jobs: 6, icon: '📱' }
                        ].map((company, index) => (
                            <div key={index} style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s', border: '1px solid #EEF2F6' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ width: '60px', height: '60px', background: '#F4F7FD', borderRadius: '12px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                                    {company.icon}
                                </div>
                                <h3 style={{ margin: '0 0 8px', color: '#2A2E3B' }}>{company.name}</h3>
                                <p style={{ margin: '0', fontSize: '14px', color: '#3B71FE', fontWeight: '600' }}>{company.jobs} vị trí đang tuyển</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '50px', padding: '40px', background: '#E3F2FD', borderRadius: '20px', color: '#1565C0', border: '1px dashed #90CAF9' }}>
                        <h3 style={{ margin: '0 0 10px' }}>🎨 Giao diện chi tiết đang được thiết kế...</h3>
                        <p style={{ margin: '0' }}>Tính năng xem văn phòng 360 độ và review công ty sẽ sớm ra mắt!</p>
                    </div>
                </div>
            </div>
        );
    }

    // ==================================================================
    // 4. GIAO DIỆN NHÀ TUYỂN DỤNG (CODE CŨ CỦA VỢ)
    // ==================================================================
    return (
        <div className="recruiter-dashboard-wrapper">
            <div className="container">
                {/* Header - ĐÃ SỬA LẠI NAVBAR */}
                <header className="header">
                    <div className="logo">
                        <span>⚡</span> GoJobs Recruiter
                    </div>

                    <nav className="nav-menu">
                        <a className="nav-link" onClick={() => navigate('/find-jobs')}>Tìm Việc</a>
                        <a className="nav-link" onClick={() => navigate('/profile-cv')}>Hồ Sơ & CV</a>
                        <a className="nav-link active" onClick={() => navigate('/recruiter')} style={{ color: '#8B5CF6' }}>Nhà Tuyển Dụng</a>
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

                <div className="main-layout">
                    {/* Sidebar */}
                    <aside className="sidebar">
                        <ul className="sidebar-menu">
                            <li>
                                <a onClick={() => navigate('/recruiter/info-cv')} style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-folder-open"></i> Hồ sơ ứng viên
                                </a>
                            </li>
                            <li>
                                <a
                                    className="active"
                                    onClick={() => { setActiveView('folders'); setActiveSidebarItem('Công việc đã đăng'); }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <i className="fas fa-briefcase"></i> Công việc đã đăng
                                </a>
                            </li>
                            <li>
                                <a onClick={() => navigate('/recruiter/messages')} style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-comments"></i> Tin nhắn
                                </a>
                            </li>
                            <li>
                                <a onClick={() => navigate('/recruiter/statistics')} style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-chart-bar"></i> Thống kê</a></li>
                            <li>
                                <a onClick={() => navigate('/recruiter/settings')} style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-cog"></i> Cài đặt
                                </a>
                            </li>
                        </ul>
                    </aside>

                    {/* Main Content - GIỮ NGUYÊN */}
                    <main className="main-content">
                        {/* Conditional Rendering: Folders View */}
                        {activeView === 'folders' && (
                            <div id="folders-view">
                                <div className="page-title">
                                    <span>Quản lý hồ sơ ứng viên</span>
                                    <button
                                        className="create-job-btn"
                                        onClick={() => alert('Tạo công việc mới')}
                                    >
                                        <i className="fas fa-plus"></i> Tạo công việc mới
                                    </button>
                                </div>

                                <div className="folders-grid">
                                    <div
                                        className="folder-card"
                                        onClick={() => openFolder('UI/UX Designer', 3)}
                                    >
                                        <span className="ai-badge">
                                            <i className="fas fa-robot"></i> AI
                                        </span>
                                        <div className="folder-icon">
                                            <i className="fas fa-folder"></i>
                                        </div>
                                        <div className="folder-title">UI/UX Designer</div>
                                        <div className="folder-stats">
                                            <span>
                                                <i className="fas fa-file"></i> 3 hồ sơ
                                            </span>
                                            <span>
                                                <i className="fas fa-clock"></i> 2 ngày trước
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="folder-card"
                                        onClick={() => openFolder('Frontend Developer', 5)}
                                    >
                                        <span className="ai-badge">
                                            <i className="fas fa-robot"></i> AI
                                        </span>
                                        <div className="folder-icon">
                                            <i className="fas fa-folder"></i>
                                        </div>
                                        <div className="folder-title">Frontend Developer</div>
                                        <div className="folder-stats">
                                            <span>
                                                <i className="fas fa-file"></i> 5 hồ sơ
                                            </span>
                                            <span>
                                                <i className="fas fa-clock"></i> 1 ngày trước
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="folder-card"
                                        onClick={() => openFolder('Backend Developer', 4)}
                                    >
                                        <span className="ai-badge">
                                            <i className="fas fa-robot"></i> AI
                                        </span>
                                        <div className="folder-icon">
                                            <i className="fas fa-folder"></i>
                                        </div>
                                        <div className="folder-title">Backend Developer</div>
                                        <div className="folder-stats">
                                            <span>
                                                <i className="fas fa-file"></i> 4 hồ sơ
                                            </span>
                                            <span>
                                                <i className="fas fa-clock"></i> 3 ngày trước
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="folder-card"
                                        onClick={() => openFolder('Product Manager', 2)}
                                    >
                                        <span className="ai-badge">
                                            <i className="fas fa-robot"></i> AI
                                        </span>
                                        <div className="folder-icon">
                                            <i className="fas fa-folder"></i>
                                        </div>
                                        <div className="folder-title">Product Manager</div>
                                        <div className="folder-stats">
                                            <span>
                                                <i className="fas fa-file"></i> 2 hồ sơ
                                            </span>
                                            <span>
                                                <i className="fas fa-clock"></i> 5 ngày trước
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Job Posts Section */}
                                <div className="job-posts-section">
                                    <div className="section-header">
                                        <h2 className="section-title">Công việc đã đăng</h2>
                                    </div>
                                    <div className="job-posts-grid">
                                        <div className="job-post-card">
                                            <span className="job-status active">Đang tuyển</span>
                                            <h3 className="job-post-title">UI/UX Designer</h3>
                                            <div className="job-post-info">
                                                <i className="fas fa-users"></i> 3/10 ứng viên
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: '30%' }}
                                                ></div>
                                            </div>
                                            <div className="job-details-tooltip">
                                                <div className="tooltip-item">
                                                    <strong>Vị trí:</strong> UI/UX Designer
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Ứng viên:</strong> 3 người đã ứng tuyển
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Ngày đăng:</strong> 02/01/2026
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Hết hạn:</strong> 02/02/2026
                                                </div>
                                            </div>
                                        </div>
                                        <div className="job-post-card">
                                            <span className="job-status active">Đang tuyển</span>
                                            <h3 className="job-post-title">Frontend Developer</h3>
                                            <div className="job-post-info">
                                                <i className="fas fa-users"></i> 5/15 ứng viên
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: '33%' }}
                                                ></div>
                                            </div>
                                            <div className="job-details-tooltip">
                                                <div className="tooltip-item">
                                                    <strong>Vị trí:</strong> Frontend Developer
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Ứng viên:</strong> 5 người đã ứng tuyển
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Ngày đăng:</strong> 01/01/2026
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Hết hạn:</strong> 01/02/2026
                                                </div>
                                            </div>
                                        </div>
                                        <div className="job-post-card">
                                            <span className="job-status active">Đang tuyển</span>
                                            <h3 className="job-post-title">Backend Developer</h3>
                                            <div className="job-post-info">
                                                <i className="fas fa-users"></i> 4/12 ứng viên
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: '33%' }}
                                                ></div>
                                            </div>
                                            <div className="job-details-tooltip">
                                                <div className="tooltip-item">
                                                    <strong>Vị trí:</strong> Backend Developer
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Ứng viên:</strong> 4 người đã ứng tuyển
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Ngày đăng:</strong> 30/12/2025
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Hết hạn:</strong> 30/01/2026
                                                </div>
                                            </div>
                                        </div>
                                        <div className="job-post-card">
                                            <span className="job-status expired">Hết hạn</span>
                                            <h3 className="job-post-title">Marketing Manager</h3>
                                            <div className="job-post-info">
                                                <i className="fas fa-users"></i> 8/10 ứng viên
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: '80%' }}
                                                ></div>
                                            </div>
                                            <div className="job-details-tooltip">
                                                <div className="tooltip-item">
                                                    <strong>Vị trí:</strong> Marketing Manager
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Ứng viên:</strong> 8 người đã ứng tuyển
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Ngày đăng:</strong> 01/12/2025
                                                </div>
                                                <div className="tooltip-item">
                                                    <strong>Hết hạn:</strong> 01/01/2026
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Conditional Rendering: Applications View */}
                        {activeView === 'applications' && (
                            <div id="applications-view" className="applications-view active">
                                <button className="back-button" onClick={closeFolder}>
                                    <i className="fas fa-arrow-left"></i> Quay lại
                                </button>
                                <div className="page-title">
                                    <span>
                                        {selectedFolder.name} ({selectedFolder.count} hồ sơ)
                                    </span>
                                </div>

                                {/* AI Analysis Section */}
                                <div className="ai-analysis-section">
                                    <button
                                        className="ai-button"
                                        onClick={handleAnalyzeApplications}
                                        disabled={analyzing}
                                    >
                                        {analyzing ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Đang phân tích...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-robot"></i> Phân tích bằng AI
                                            </>
                                        )}
                                    </button>

                                    {showAiResults && (
                                        <div id="ai-results" className="ai-results active">
                                            <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>
                                                Kết quả phân tích AI
                                            </h3>
                                            <div className="candidate-comparison">
                                                <div className="candidate-analysis">
                                                    <div className="candidate-name">Nguyễn Văn A</div>
                                                    <div className="analysis-section">
                                                        <div className="analysis-label pros">Ưu điểm:</div>
                                                        <ul className="analysis-list pros">
                                                            <li>5 năm kinh nghiệm UI/UX Design</li>
                                                            <li>Thành thạo Figma, Adobe XD</li>
                                                            <li>Portfolio ấn tượng với 20+ dự án</li>
                                                            <li>Có kinh nghiệm làm việc tại Google</li>
                                                        </ul>
                                                    </div>
                                                    <div className="analysis-section">
                                                        <div className="analysis-label cons">Nhược điểm:</div>
                                                        <ul className="analysis-list cons">
                                                            <li>Yêu cầu mức lương cao</li>
                                                            <li>Không có kinh nghiệm làm việc remote</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="candidate-analysis">
                                                    <div className="candidate-name">Trần Thị B</div>
                                                    <div className="analysis-section">
                                                        <div className="analysis-label pros">Ưu điểm:</div>
                                                        <ul className="analysis-list pros">
                                                            <li>3 năm kinh nghiệm thiết kế</li>
                                                            <li>Chuyên về mobile app design</li>
                                                            <li>Có chứng chỉ UX Design từ Google</li>
                                                            <li>Mức lương phù hợp với ngân sách</li>
                                                        </ul>
                                                    </div>
                                                    <div className="analysis-section">
                                                        <div className="analysis-label cons">Nhược điểm:</div>
                                                        <ul className="analysis-list cons">
                                                            <li>Portfolio còn ít dự án lớn</li>
                                                            <li>Chưa có kinh nghiệm làm team lead</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="candidate-analysis">
                                                    <div className="candidate-name">Lê Văn C</div>
                                                    <div className="analysis-section">
                                                        <div className="analysis-label pros">Ưu điểm:</div>
                                                        <ul className="analysis-list pros">
                                                            <li>2 năm kinh nghiệm</li>
                                                            <li>Rất nhiệt tình và năng động</li>
                                                            <li>Kỹ năng giao tiếp tốt</li>
                                                            <li>Sẵn sàng học hỏi và phát triển</li>
                                                        </ul>
                                                    </div>
                                                    <div className="analysis-section">
                                                        <div className="analysis-label cons">Nhược điểm:</div>
                                                        <ul className="analysis-list cons">
                                                            <li>Kinh nghiệm còn hạn chế</li>
                                                            <li>Chưa làm việc với công cụ design nâng cao</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Applications List */}
                                <div className="applications-list">
                                    <div className="application-card">
                                        <div className="application-header">
                                            <div className="candidate-info">
                                                <div className="candidate-avatar">NA</div>
                                                <div className="candidate-details">
                                                    <h3>Nguyễn Văn A</h3>
                                                    <div className="candidate-meta">
                                                        <i className="fas fa-envelope"></i>{' '}
                                                        nguyenvana@email.com |{' '}
                                                        <i className="fas fa-phone"></i> 0123456789 |{' '}
                                                        <i className="fas fa-clock"></i> Nộp 2 ngày trước
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="application-files">
                                            <div className="file-badge">
                                                <i className="fas fa-file-pdf"></i> CV_NguyenVanA.pdf
                                            </div>
                                            <div className="file-badge">
                                                <i className="fas fa-file-word"></i> CoverLetter.docx
                                            </div>
                                            <div className="file-badge">
                                                <i className="fas fa-folder"></i> Portfolio.zip
                                            </div>
                                        </div>
                                        <div className="application-actions">
                                            <button
                                                className="view-cv-btn"
                                                onClick={() => handleViewCV('Nguyễn Văn A')}
                                            >
                                                <i className="fas fa-eye"></i> Xem CV
                                            </button>
                                            <button
                                                className="accept-btn"
                                                onClick={() => handleAcceptCandidate('Nguyễn Văn A')}
                                            >
                                                <i className="fas fa-check"></i> Chấp nhận
                                            </button>
                                            <button
                                                className="reject-btn"
                                                onClick={handleRejectCandidate}
                                            >
                                                <i className="fas fa-times"></i> Từ chối
                                            </button>
                                        </div>
                                    </div>
                                    <div className="application-card">
                                        <div className="application-header">
                                            <div className="candidate-info">
                                                <div className="candidate-avatar">TB</div>
                                                <div className="candidate-details">
                                                    <h3>Trần Thị B</h3>
                                                    <div className="candidate-meta">
                                                        <i className="fas fa-envelope"></i>{' '}
                                                        tranthib@email.com |{' '}
                                                        <i className="fas fa-phone"></i> 0987654321 |{' '}
                                                        <i className="fas fa-clock"></i> Nộp 1 ngày trước
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="application-files">
                                            <div className="file-badge">
                                                <i className="fas fa-file-pdf"></i> CV_TranThiB.pdf
                                            </div>
                                            <div className="file-badge">
                                                <i className="fas fa-link"></i> Portfolio_Link
                                            </div>
                                        </div>
                                        <div className="application-actions">
                                            <button
                                                className="view-cv-btn"
                                                onClick={() => handleViewCV('Trần Thị B')}
                                            >
                                                <i className="fas fa-eye"></i> Xem CV
                                            </button>
                                            <button
                                                className="accept-btn"
                                                onClick={() => handleAcceptCandidate('Trần Thị B')}
                                            >
                                                <i className="fas fa-check"></i> Chấp nhận
                                            </button>
                                            <button
                                                className="reject-btn"
                                                onClick={handleRejectCandidate}
                                            >
                                                <i className="fas fa-times"></i> Từ chối
                                            </button>
                                        </div>
                                    </div>
                                    <div className="application-card">
                                        <div className="application-header">
                                            <div className="candidate-info">
                                                <div className="candidate-avatar">LC</div>
                                                <div className="candidate-details">
                                                    <h3>Lê Văn C</h3>
                                                    <div className="candidate-meta">
                                                        <i className="fas fa-envelope"></i>{' '}
                                                        levanc@email.com |{' '}
                                                        <i className="fas fa-phone"></i> 0369852147 |{' '}
                                                        <i className="fas fa-clock"></i> Nộp 3 ngày trước
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="application-files">
                                            <div className="file-badge">
                                                <i className="fas fa-file-pdf"></i> CV_LeVanC.pdf
                                            </div>
                                        </div>
                                        <div className="application-actions">
                                            <button
                                                className="view-cv-btn"
                                                onClick={() => handleViewCV('Lê Văn C')}
                                            >
                                                <i className="fas fa-eye"></i> Xem CV
                                            </button>
                                            <button
                                                className="accept-btn"
                                                onClick={() => handleAcceptCandidate('Lê Văn C')}
                                            >
                                                <i className="fas fa-check"></i> Chấp nhận
                                            </button>
                                            <button
                                                className="reject-btn"
                                                onClick={handleRejectCandidate}
                                            >
                                                <i className="fas fa-times"></i> Từ chối
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Chat Modal */}
            {showChatModal && (
                <div className="chat-modal active" onClick={(e) => { if (e.target.className === 'chat-modal active') closeChat(); }}>
                    <div className="chat-container">
                        <div className="chat-header">
                            <h3 id="chat-candidate-name">Chat với {chatCandidateName}</h3>
                            <button className="close-chat" onClick={closeChat}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="chat-messages" id="chat-messages">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    <div className="message-bubble">{msg.text}</div>
                                </div>
                            ))}
                            <div ref={chatMessagesEndRef} />
                        </div>
                        <div className="chat-input-area">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Nhập tin nhắn..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button className="send-btn" onClick={handleSendMessage}>
                                <i className="fas fa-paper-plane"></i> Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterPage;