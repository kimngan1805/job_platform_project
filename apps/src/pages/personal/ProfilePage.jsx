import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

// --- IMPORT CÁC COMPONENT CV MẪU ---
// Lưu ý: Đảm bảo file nằm trong folder src/components/cv-templates/
import CVTemplate1 from '../../components/cv-templates/CVTemplate1';
import CVTemplate2 from '../../components/cv-templates/CVTemplate2';

const ProfilePage = () => {
    const navigate = useNavigate();

    // --- STATE QUẢN LÝ ---
    const [activeTab, setActiveTab] = useState('cvs'); // Mặc định vào tab CV
    // modalType: 'cv', 'feedback', 'preview_harvard', 'preview_minimal'
    const [modalType, setModalType] = useState(null); 

    // --- STATE USER & NAVBAR ---
    const [userRole, setUserRole] = useState('');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const userRef = useRef(null);

    // ================== STATE CHO CHAT (MỚI THÊM) ==================
    const [activeChat, setActiveChat] = useState(1);
    const [inputMsg, setInputMsg] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Bảng icon
    
    // Refs cho input file ẩn
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    // Dữ liệu giả danh sách người chat
    const chatList = [
        { id: 1, name: 'Nguyễn Văn An', role: 'HR Manager @ Google', avatar: 'NA', lastMsg: 'Chào Ngân! Cảm ơn em đã quan tâm...', time: '09:30', unread: 0, online: true },
        { id: 2, name: 'Trần Thị Bình', role: 'Recruiter @ FPT', avatar: 'TB', lastMsg: 'Em có thể gửi lại CV bản PDF không?', time: 'Hôm qua', unread: 2, online: false },
        { id: 3, name: 'Lê Minh Cường', role: 'Talent Acquisition @ VNG', avatar: 'LC', lastMsg: 'Hẹn em phỏng vấn vào thứ 6 nhé.', time: '2 ngày', unread: 0, online: false },
        { id: 4, name: 'Phạm Thu Dung', role: 'HR @ Shopee', avatar: 'PD', lastMsg: 'Em đã xem qua yêu cầu chưa?', time: '3 ngày', unread: 1, online: true },
    ];

    // Dữ liệu tin nhắn (Hỗ trợ type: text, image, file)
    const [messages, setMessages] = useState([
        { id: 1, sender: 'me', type: 'text', text: 'Xin chào anh/chị! Em là Ngân Kim.', time: '09:15' },
        { id: 2, sender: 'me', type: 'text', text: 'Em xin gửi CV để anh/chị xem xét ạ!', time: '09:16' },
        { id: 3, sender: 'other', type: 'text', text: 'Chào An! Cảm ơn em đã quan tâm. Anh đã nhận được CV nhé.', time: '09:30' },
    ]);

    // Icon mẫu
    const emojis = ["😀", "😁", "😂", "🥰", "😎", "🤔", "👍", "👎", "🙏", "🔥", "🎉", "❤️", "💼", "📄", "✨"];
    // ===============================================================

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

    // --- HÀM LOGOUT ---
    const handleLogout = () => {
        if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
            localStorage.removeItem('user_data');
            navigate('/login');
        }
    };

    // --- HÀM CHUYỂN SANG TRANG EDITOR ---
    const handleSelectTemplate = (templateId) => {
        setModalType(null);
        console.log("Đang chuyển sang Editor với template:", templateId);
        navigate('/cv-editor', { state: { templateId: templateId } });
    };

    // ================== HANDLERS CHAT (MỚI) ==================
    
    // 1. Gửi Text
    const handleSendMessage = () => {
        if (!inputMsg.trim()) return;
        const newMsg = {
            id: Date.now(),
            sender: 'me',
            type: 'text',
            text: inputMsg,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMsg]);
        setInputMsg('');
        setShowEmojiPicker(false);
    };

    // 2. Upload File/Ảnh
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        // Tạo URL ảo để hiển thị ảnh ngay (nếu là ảnh)
        const content = type === 'image' ? URL.createObjectURL(file) : file.name;

        const newMsg = {
            id: Date.now(),
            sender: 'me',
            type: type, // 'image' hoặc 'file'
            text: content, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMsg]);
        e.target.value = null; // Reset input
    };

    // 3. Thêm Emoji
    const addEmoji = (emoji) => {
        setInputMsg(prev => prev + emoji);
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
                        
                        {/* Tab Tin nhắn trên Navbar */}
                        <a 
                            onClick={() => setActiveTab('messages')} 
                            style={{ position: 'relative', cursor: 'pointer', fontWeight: activeTab === 'messages' ? 'bold' : 'normal', color: activeTab === 'messages' ? '#667eea' : 'inherit' }}
                        >
                            Tin nhắn 
                            {chatList.reduce((acc, curr) => acc + curr.unread, 0) > 0 && 
                                <span style={{ position: 'absolute', top: '-5px', right: '-10px', background: 'red', color: 'white', fontSize: '9px', padding: '2px 5px', borderRadius: '50%' }}>
                                    {chatList.reduce((acc, curr) => acc + curr.unread, 0)}
                                </span>
                            }
                        </a>

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
                        
                        {/* MỤC TIN NHẮN (MỚI) */}
                        <div className={`menu-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
                            <span className="menu-icon">💬</span>
                            <span className="menu-label">Tin nhắn</span>
                            {chatList.reduce((acc, curr) => acc + curr.unread, 0) > 0 && 
                                <span className="menu-badge" style={{background: '#ef4444', color: 'white'}}>
                                    {chatList.reduce((acc, curr) => acc + curr.unread, 0)}
                                </span>
                            }
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

                    {/* TAB 2: CV LIBRARY */}
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
                                        
                                        {/* CARD 1: HARVARD CLASSIC -> CVTemplate1 */}
                                        <div className="template-card">
                                            <div className="template-preview" style={{ background: '#ffffff', border: '1px solid #eee' }}>
                                                <div className="preview-lines" style={{ opacity: 0.3, background: 'black' }}></div>
                                                <span className="template-tag" style={{ background: '#333' }}>Classic</span>
                                            </div>
                                            <div className="template-info">
                                                <h4>Harvard Classic</h4>
                                                <p>Phù hợp: Fresher, Học bổng</p>
                                                <button 
                                                    className="btn-use-template"
                                                    onClick={() => setModalType('preview_harvard')}
                                                >
                                                    Xem & Dùng mẫu
                                                </button>
                                            </div>
                                        </div>

                                        {/* CARD 2: MINIMAL GREY -> CVTemplate2 (Mẫu Adeline) */}
                                        <div className="template-card">
                                            <div className="template-preview" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                                <div className="preview-lines" style={{ opacity: 0.4, background: '#475569' }}></div>
                                                <span className="template-tag" style={{ background: '#475569' }}>Minimal</span>
                                            </div>
                                            <div className="template-info">
                                                <h4>Minimal Grey</h4>
                                                <p>Phù hợp: Quản lý, HR</p>
                                                <button 
                                                    className="btn-use-template"
                                                    onClick={() => setModalType('preview_minimal')}
                                                >
                                                    Xem & Dùng mẫu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* ================= TAB: TIN NHẮN (FULL CHỨC NĂNG) ================= */}
                    {activeTab === 'messages' && (
                        <div className="tab-content active" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', padding: 0, overflow: 'hidden' }}>
                            <div className="chat-layout" style={{ display: 'flex', flex: 1, height: '100%', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                
                                {/* 1. DANH SÁCH CHAT */}
                                <div className="chat-sidebar" style={{ width: '320px', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Tin nhắn</h2>
                                        <div style={{ position: 'relative' }}>
                                            <input 
                                                type="text" 
                                                placeholder="Tìm kiếm..." 
                                                style={{ width: '100%', padding: '10px 15px 10px 35px', borderRadius: '20px', border: '1px solid #eee', background: '#f9f9f9', fontSize: '14px', outline: 'none' }} 
                                            />
                                            <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#999' }}>🔍</span>
                                        </div>
                                    </div>
                                    <div className="chat-list" style={{ flex: 1, overflowY: 'auto' }}>
                                        {chatList.map(chat => (
                                            <div 
                                                key={chat.id} 
                                                onClick={() => setActiveChat(chat.id)}
                                                className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
                                                style={{ 
                                                    padding: '15px 20px', 
                                                    display: 'flex', 
                                                    gap: '12px', 
                                                    cursor: 'pointer', 
                                                    borderBottom: '1px solid #fcfcfc', 
                                                    background: activeChat === chat.id ? '#f0f7ff' : 'white',
                                                    borderLeft: activeChat === chat.id ? '4px solid #667eea' : '4px solid transparent',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div style={{ position: 'relative' }}>
                                                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#667eea', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>{chat.avatar}</div>
                                                    {chat.online && <div style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', border: '2px solid white', position: 'absolute', bottom: 0, right: 0 }}></div>}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                        <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>{chat.name}</span>
                                                        <span style={{ fontSize: '11px', color: '#999' }}>{chat.time}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <p style={{ fontSize: '12px', color: chat.unread > 0 ? '#333' : '#666', fontWeight: chat.unread > 0 ? '600' : 'normal', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px', margin: 0 }}>{chat.lastMsg}</p>
                                                        {chat.unread > 0 && <span style={{ background: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '0 6px', borderRadius: '10px', height: '18px', display: 'flex', alignItems: 'center' }}>{chat.unread}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. KHUNG CHAT */}
                                <div className="chat-window" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    {/* Header Chat */}
                                    <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#667eea', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>NA</div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Nguyễn Văn An</div>
                                                <div style={{ fontSize: '12px', color: '#22c55e' }}>● Đang hoạt động</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '18px' }}>
                                            <span style={{ cursor: 'pointer' }}>📞</span>
                                            <span style={{ cursor: 'pointer' }}>📹</span>
                                            <span style={{ cursor: 'pointer' }}>ℹ️</span>
                                        </div>
                                    </div>

                                    {/* Nội dung Chat (Scrollable) */}
                                    <div className="chat-messages" style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ textAlign: 'center', fontSize: '11px', color: '#999', margin: '10px 0' }}>Hôm nay - 05/01/2025</div>
                                        
                                        {messages.map(msg => (
                                            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start', maxWidth: '70%', alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                                                
                                                {/* --- HIỂN THỊ TIN NHẮN THEO LOẠI --- */}
                                                
                                                {/* Loại 1: Text */}
                                                {msg.type === 'text' && (
                                                    <div style={{ background: msg.sender === 'me' ? '#667eea' : 'white', color: msg.sender === 'me' ? 'white' : '#333', padding: '12px 16px', borderRadius: msg.sender === 'me' ? '18px 18px 0 18px' : '18px 18px 18px 0', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', fontSize: '14px', lineHeight: '1.5' }}>
                                                        {msg.text}
                                                    </div>
                                                )}

                                                {/* Loại 2: Ảnh */}
                                                {msg.type === 'image' && (
                                                    <div style={{ background: 'transparent' }}>
                                                        <img src={msg.text} alt="sent" style={{ maxWidth: '250px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
                                                    </div>
                                                )}

                                                {/* Loại 3: File */}
                                                {msg.type === 'file' && (
                                                    <div style={{ background: msg.sender === 'me' ? '#667eea' : 'white', color: msg.sender === 'me' ? 'white' : '#333', padding: '12px 16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ fontSize: '20px' }}>📄</span>
                                                        <a href="#" style={{ color: 'inherit', textDecoration: 'underline', fontSize: '14px' }}>{msg.text}</a>
                                                    </div>
                                                )}

                                                <span style={{ fontSize: '10px', color: '#999', marginTop: '4px', padding: '0 5px' }}>{msg.time}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input Chat (Full Chức Năng) */}
                                    <div style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', gap: '12px', alignItems: 'center', background: 'white', position: 'relative' }}>
                                        
                                        {/* Nút Gửi File (Ghim) */}
                                        <span onClick={() => fileInputRef.current.click()} style={{ cursor: 'pointer', fontSize: '22px', color: '#666', transition: 'color 0.2s' }} title="Đính kèm file" onMouseOver={(e) => e.target.style.color='#667eea'} onMouseOut={(e) => e.target.style.color='#666'}>📎</span>
                                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e, 'file')} style={{ display: 'none' }} />

                                        {/* Nút Gửi Ảnh (Tranh) */}
                                        <span onClick={() => imageInputRef.current.click()} style={{ cursor: 'pointer', fontSize: '22px', color: '#666', transition: 'color 0.2s' }} title="Gửi ảnh" onMouseOver={(e) => e.target.style.color='#667eea'} onMouseOut={(e) => e.target.style.color='#666'}>🖼️</span>
                                        <input type="file" ref={imageInputRef} onChange={(e) => handleFileUpload(e, 'image')} accept="image/*" style={{ display: 'none' }} />

                                        {/* Nút Gửi Icon (Mặt cười) */}
                                        <div style={{ position: 'relative' }}>
                                            <span onClick={() => setShowEmojiPicker(!showEmojiPicker)} style={{ cursor: 'pointer', fontSize: '22px', color: '#666', transition: 'color 0.2s' }} title="Chèn icon" onMouseOver={(e) => e.target.style.color='#667eea'} onMouseOut={(e) => e.target.style.color='#666'}>😊</span>
                                            
                                            {/* Bảng Emoji */}
                                            {showEmojiPicker && (
                                                <div style={{ position: 'absolute', bottom: '40px', left: '-10px', background: 'white', border: '1px solid #eee', borderRadius: '10px', padding: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px', width: '220px', zIndex: 100 }}>
                                                    {emojis.map((emoji, index) => (
                                                        <span 
                                                            key={index} 
                                                            onClick={() => addEmoji(emoji)} 
                                                            style={{ cursor: 'pointer', fontSize: '20px', padding: '5px', textAlign: 'center', borderRadius: '5px', transition: 'background 0.2s' }}
                                                            onMouseOver={(e) => e.target.style.background = '#f0f0f0'}
                                                            onMouseOut={(e) => e.target.style.background = 'transparent'}
                                                        >
                                                            {emoji}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Ô nhập liệu */}
                                        <div style={{ flex: 1, position: 'relative' }}>
                                            <input 
                                                type="text" 
                                                placeholder="Nhập tin nhắn..." 
                                                value={inputMsg}
                                                onChange={(e) => setInputMsg(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none', fontSize: '14px', background: '#f9f9f9' }} 
                                            />
                                        </div>
                                        
                                        {/* Nút Gửi */}
                                        <button 
                                            onClick={handleSendMessage}
                                            style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#667eea', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 3px 10px rgba(102, 126, 234, 0.4)' }}
                                        >
                                            ➤
                                        </button>
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
                    <div 
                        className="modal-content" 
                        onClick={(e) => e.stopPropagation()}
                        // Nếu là preview thì làm modal to ra
                        style={(modalType === 'preview_harvard' || modalType === 'preview_minimal') ? { maxWidth: '900px', width: '90%' } : {}}
                    >
                        <div className="modal-header">
                            <h2>
                                {modalType === 'cv' ? '📄 CV đã nộp' : 
                                 modalType === 'feedback' ? '💬 Lịch sử & Feedback' :
                                 '🎓 Xem trước mẫu CV'}
                            </h2>
                            <span className="modal-close" onClick={() => setModalType(null)}>✕</span>
                        </div>

                        {/* Modal xem CV đã nộp */}
                        {modalType === 'cv' && (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <div style={{ height: '200px', background: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '3em' }}>📄</span>
                                    <p style={{ marginTop: '10px' }}>Preview CV File.pdf</p>
                                </div>
                                <button className="btn-add-item" style={{ width: '100%', justifyContent: 'center' }}>📥 Tải xuống CV</button>
                            </div>
                        )}

                        {/* Modal Feedback */}
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

                        {/* --- 3. MODAL PREVIEW HARVARD (Template 1) --- */}
                        {modalType === 'preview_harvard' && (
                            <div className="cv-preview-modal">
                                <div style={{ 
                                    maxHeight: '65vh', overflowY: 'auto', 
                                    border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '20px',
                                    background: '#525659', padding: '20px', display: 'flex', justifyContent: 'center'
                                }}>
                                    {/* Component hiển thị CV */}
                                    <CVTemplate1 />
                                </div>
                                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                                    <button className="action-btn action-btn-secondary" onClick={() => setModalType(null)}>Đóng</button>
                                    
                                    {/* NÚT CHUYỂN SANG TRANG EDIT (ĐÃ GẮN SỰ KIỆN) */}
                                    <button 
                                        className="btn-add-item" 
                                        style={{ width: 'auto' }}
                                        onClick={() => handleSelectTemplate('harvard')}
                                    >
                                        🖊️ Dùng mẫu này
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* --- 4. MODAL PREVIEW MINIMAL (Template 2) --- */}
                        {modalType === 'preview_minimal' && (
                            <div className="cv-preview-modal">
                                <div style={{ 
                                    maxHeight: '65vh', overflowY: 'auto', 
                                    border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '20px',
                                    background: '#525659', padding: '20px', display: 'flex', justifyContent: 'center'
                                }}>
                                    {/* Component hiển thị CV 2 */}
                                    <CVTemplate2 />
                                </div>
                                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                                    <button className="action-btn action-btn-secondary" onClick={() => setModalType(null)}>Đóng</button>
                                    
                                    {/* NÚT CHUYỂN SANG TRANG EDIT (ĐÃ GẮN SỰ KIỆN) */}
                                    <button 
                                        className="btn-add-item" 
                                        style={{ width: 'auto' }}
                                        onClick={() => handleSelectTemplate('minimal')}
                                    >
                                        🖊️ Dùng mẫu này
                                    </button>
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