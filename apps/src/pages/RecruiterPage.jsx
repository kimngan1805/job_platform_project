// src/pages/RecruiterPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RecruiterPage.css';

const RecruiterPage = () => {
    const navigate = useNavigate();
    // THÊM ĐOẠN NÀY VÀO ĐÂY ĐỂ HẾT LỖI TRẮNG MÀN HÌNH
    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
        marginBottom: '5px'
    };

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
    // 2. LOGIC MỚI: FEED CỘNG ĐỒNG (INSTAGRAM STYLE) - CHO ỨNG VIÊN
    // ==================================================================
    const [posts, setPosts] = useState([
        {
            id: 1,
            company: 'FPT Software',
            avatar: '💻',
            time: '2 giờ trước',
            content: 'Chào mừng 500 anh em Fresher Java đã gia nhập đại gia đình F-Complex Đà Nẵng! 🚀 Cùng nhau chinh phục những dự án triệu đô nhé. #FPT #Fresher #Java',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
            likes: 124,
            comments: 15,
            isLiked: false
        },
        {
            id: 2,
            company: 'Shopee Vietnam',
            avatar: '🛒',
            time: '5 giờ trước',
            content: '🔥 12.12 Sale tưng bừng - Team Tech của Shopee vẫn đang "trực chiến" xuyên đêm để đảm bảo hệ thống mượt mà nhất. Pizza đã về tới văn phòng! 🍕 #ShopeeTech #LifeAtShopee',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
            likes: 856,
            comments: 42,
            isLiked: true
        },
        {
            id: 3,
            company: 'VNG Corp',
            avatar: '🦄',
            time: '1 ngày trước',
            content: 'Văn phòng VNG Campus hôm nay thật chill. Góc làm việc view hồ bơi thế này thì code "bao mượt" nha anh em! 😎 #LifeAtVNG #VNGCampus',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
            likes: 430,
            comments: 28,
            isLiked: false
        }
    ]);

    const handleLike = (id) => {
        setPosts(posts.map(post =>
            post.id === id
                ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };
    // ==================================================================
    // 2. STATES CŨ (Giữ nguyên của vợ)
    // ==================================================================
    // --- States for View Management ---
    const [activeView, setActiveView] = useState('folders');
    const [activeSidebarItem, setActiveSidebarItem] = useState('Hồ sơ ứng viên');
    const [selectedFolder, setSelectedFolder] = useState({ name: '', count: 0 });
    const [analyzing, setAnalyzing] = useState(false);
    const [showAiResults, setShowAiResults] = useState(false);
    const [showChatModal, setShowChatModal] = useState(false);
    const [chatCandidateName, setChatCandidateName] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { sender: 'candidate', text: 'Xin chào, cảm ơn quý công ty đã xem xét hồ sơ của em!', },
        { sender: 'recruiter', text: 'Chào bạn! Chúng tôi đã xem qua CV của bạn và rất ấn tượng. Bạn có thể tham gia phỏng vấn vào thứ 5 tuần sau được không?', },
    ]);
    const chatMessagesEndRef = useRef(null);
    // --- STATE QUẢN LÝ POPUP TẠO BÀI ĐĂNG ---
    const [showPostJobModal, setShowPostJobModal] = useState(false);
    const [jobForm, setJobForm] = useState({
        title: '', salary: '', location: '', experience: '',
        description: '', requirements: '', benefits: '', deadline: ''
    });

    const handleJobInputChange = (e) => {
        const { name, value } = e.target;
        setJobForm({ ...jobForm, [name]: value });
    };

    const handlePostJob = async (e) => {
        e.preventDefault();

        // 1. Lấy thông tin user từ localStorage để biết ai đang đăng bài
        const savedData = localStorage.getItem('user_data');
        const user = JSON.parse(savedData);

        // 2. Chuẩn bị dữ liệu
        const finalData = {
            ...jobForm,
            userId: user.id, // Gửi kèm ID user để backend tìm recruiter_id
            benefits: jobForm.benefits.split(',').map(b => b.trim())
        };

        try {
            // 3. Gửi dữ liệu lên Backend
            const response = await fetch('http://localhost:5000/api/job-posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });

            const result = await response.json();

            if (result.success) {
                alert("🎉 Đăng tin tuyển dụng thành công!");
                setShowPostJobModal(false);
                fetchRealJobs();
                // Có thể thêm logic load lại danh sách bài đăng ở đây
            } else {
                alert("Lỗi: " + result.message);
            }
        } catch (err) {
            console.error("Lỗi kết nối:", err);
            alert("Không thể kết nối tới server!");
        }
    };



    const [realJobs, setRealJobs] = useState([]); // Lưu bài từ database

    const fetchRealJobs = async () => {
    const savedData = localStorage.getItem('user_data');
    if (!savedData) return;
    const user = JSON.parse(savedData);
    
    try {
        const res = await fetch(`http://localhost:5000/api/job-posts/${user.id}`);
        
        // Kiểm tra nếu response không ok (như 404, 500)
        if (!res.ok) {
            const errorText = await res.text(); // Lấy nội dung lỗi dạng text
            throw new Error(`Server báo lỗi: ${res.status}`);
        }

        const result = await res.json();
        if (result.success) {
            setRealJobs(result.data);
        }
    } catch (err) { 
        console.error("Lỗi load job của Ngân:", err.message); 
    }
};

    useEffect(() => { fetchRealJobs(); }, []); // Load ngay khi vào trang
    const openFolder = (folderName, count) => { setSelectedFolder({ name: folderName, count }); setActiveView('applications'); setShowAiResults(false); };
    const closeFolder = () => { setActiveView('folders'); };
    const handleAnalyzeApplications = () => { setAnalyzing(true); setTimeout(() => { setAnalyzing(false); setShowAiResults(true); }, 2000); };
    const handleAcceptCandidate = (name) => { if (window.confirm(`Bạn có chắc chắn muốn chấp nhận ứng viên ${name}?`)) { setChatCandidateName(name); setShowChatModal(true); } };
    const handleRejectCandidate = () => { alert('Đã từ chối ứng viên'); };
    const handleViewCV = (name) => { alert(`Xem CV của ${name}`); };
    const closeChat = () => { setShowChatModal(false); };
    const handleSendMessage = () => { const message = chatInput.trim(); if (message) { setChatMessages([...chatMessages, { sender: 'recruiter', text: message }]); setChatInput(''); } };
    const handleKeyPress = (e) => { if (e.key === 'Enter') { handleSendMessage(); } };
    useEffect(() => { if (chatMessagesEndRef.current) { chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); } }, [chatMessages, showChatModal]);
    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatMessagesEndRef.current) {
            chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, showChatModal]);


    // ==================================================================
    // 3. GIAO DIỆN RIÊNG CHO ỨNG VIÊN (CANDIDATE) - ĐÃ CÓ NAVBAR XỊN
    // ==================================================================
    if (userRole === 'candidate') {
        return (
            <div style={{ background: '#F4F7FD', minHeight: '100vh', fontFamily: 'Segoe UI' }}>

                {/* --- NAVBAR MỚI (UPDATE THEO HÌNH) --- */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 40px',
                    height: '70px',
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000
                }}>
                    {/* 1. Logo */}
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B71FE', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/find-jobs')}>
                        <span style={{ fontSize: '28px' }}>⚡</span> Finder.
                    </div>

                    {/* 2. Menu Navigation (Đã sửa theo hình) */}
                    <nav style={{ display: 'flex', gap: '40px' }}>
                        <a onClick={() => navigate('/find-jobs')} style={{ cursor: 'pointer', fontWeight: '600', color: '#3B71FE', textDecoration: 'none', borderBottom: '2px solid #3B71FE', paddingBottom: '21px' }}>
                            Tìm Việc
                        </a>
                        <a onClick={() => navigate('/profile-cv')} style={{ cursor: 'pointer', fontWeight: '500', color: '#6B7280', textDecoration: 'none', transition: '0.3s' }}
                            onMouseOver={(e) => e.target.style.color = '#3B71FE'}
                            onMouseOut={(e) => e.target.style.color = '#6B7280'}>
                            Hồ Sơ & CV
                        </a>
                        <a onClick={() => alert('Chức năng Công ty')} style={{ cursor: 'pointer', fontWeight: '500', color: '#6B7280', textDecoration: 'none', transition: '0.3s' }}
                            onMouseOver={(e) => e.target.style.color = '#3B71FE'}
                            onMouseOut={(e) => e.target.style.color = '#6B7280'}>
                            Công Ty
                        </a>
                        <a onClick={() => navigate('/tools')} style={{ cursor: 'pointer', fontWeight: '500', color: '#6B7280', textDecoration: 'none', transition: '0.3s' }}
                            onMouseOver={(e) => e.target.style.color = '#3B71FE'}
                            onMouseOut={(e) => e.target.style.color = '#6B7280'}>
                            Công Cụ
                        </a>
                    </nav>

                    {/* 3. User Actions (Giữ nguyên) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <span style={{ fontSize: '20px' }}>🔔</span>
                            <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#EF4444', color: 'white', fontSize: '10px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 10px', borderRadius: '30px', background: '#F3F4F6', cursor: 'pointer' }}>
                            <div style={{ width: '32px', height: '32px', background: '#3B71FE', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                                N
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151', paddingRight: '5px' }}>Ngân</span>
                        </div>
                    </div>
                </header>

                {/* --- NỘI DUNG CHÍNH (GIỮ NGUYÊN) --- */}
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>

                    {/* SECTION 1: TOP COMPANIES GRID */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ color: '#2A2E3B', fontSize: '32px', marginBottom: '10px' }}>Top Nhà Tuyển Dụng Hàng Đầu 🏆</h1>
                        <p style={{ color: '#7D8597', marginBottom: '40px' }}>Khám phá văn hóa và cơ hội nghề nghiệp tại các công ty công nghệ lớn nhất.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                            {[
                                { name: 'FPT Software', jobs: 12, icon: '💻' },
                                { name: 'VNG Corp', jobs: 8, icon: '🦄' },
                                { name: 'Momo', jobs: 5, icon: '💸' },
                                { name: 'Viettel', jobs: 20, icon: '📡' },
                                { name: 'Shopee', jobs: 15, icon: '🛒' },
                                { name: 'ZaloPay', jobs: 6, icon: '📱' }
                            ].map((company, index) => (
                                <div key={index} style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '15px' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ width: '50px', height: '50px', background: '#F4F7FD', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                        {company.icon}
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <h3 style={{ margin: '0 0 5px', color: '#2A2E3B', fontSize: '16px' }}>{company.name}</h3>
                                        <p style={{ margin: '0', fontSize: '13px', color: '#3B71FE', fontWeight: '600' }}>{company.jobs} vị trí đang tuyển</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 2: COMPANY FEED */}
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', gap: '10px' }}>
                            <div style={{ height: '2px', width: '50px', background: '#E0E0E0' }}></div>
                            <h2 style={{ color: '#2A2E3B', fontSize: '24px', margin: 0 }}>Khoảnh khắc Doanh nghiệp 📸</h2>
                            <div style={{ height: '2px', width: '50px', background: '#E0E0E0' }}></div>
                        </div>

                        {/* LIST POSTS */}
                        {posts.map(post => (
                            <div key={post.id} style={{ background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '30px', overflow: 'hidden', animation: 'fadeIn 0.5s ease' }}>
                                {/* Post Header */}
                                <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#F0F2F5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: '2px solid #3B71FE' }}>
                                            {post.avatar}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, color: '#1f2937', fontSize: '15px' }}>{post.company}</h4>
                                            <span style={{ fontSize: '12px', color: '#6b7280' }}>{post.time} • 🌏 Công khai</span>
                                        </div>
                                    </div>
                                    <button style={{ border: 'none', background: 'transparent', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>•••</button>
                                </div>

                                {/* Post Content */}
                                <div style={{ padding: '0 20px 15px', fontSize: '15px', color: '#374151', lineHeight: '1.5' }}>
                                    {post.content}
                                </div>

                                {/* Post Image */}
                                <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
                                    <img src={post.image} alt="Post" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    />
                                </div>

                                {/* Post Actions */}
                                <div style={{ padding: '15px 20px' }}>
                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                                        <button onClick={() => handleLike(post.id)} style={{ border: 'none', background: 'transparent', fontSize: '24px', cursor: 'pointer', color: post.isLiked ? '#ef4444' : '#374151', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {post.isLiked ? '❤️' : '🤍'}
                                        </button>
                                        <button style={{ border: 'none', background: 'transparent', fontSize: '24px', cursor: 'pointer' }}>💬</button>
                                        <button style={{ border: 'none', background: 'transparent', fontSize: '24px', cursor: 'pointer' }}>🚀</button>
                                        <button style={{ marginLeft: 'auto', border: 'none', background: '#F0F9FF', color: '#0284c7', padding: '5px 15px', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                                            Xem Job
                                        </button>
                                    </div>
                                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>
                                        {post.likes} lượt thích
                                    </div>
                                    <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px', cursor: 'pointer' }}>
                                        Xem tất cả {post.comments} bình luận
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div style={{ textAlign: 'center', marginTop: '40px', color: '#6b7280' }}>
                            <p>Đã hết tin mới hôm nay 🎉</p>
                        </div>
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
                                    <button className="create-job-btn" onClick={() => setShowPostJobModal(true)}>
                                        <i className="fas fa-plus"></i> Tạo bài đăng mới
                                    </button>
                                </div>
                                {/* --- POPUP TẠO BÀI ĐĂNG (BẢN CĂN GIỮA SIÊU ĐẸP) --- */}
                                {showPostJobModal && (
                                    <div style={{
                                        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        zIndex: 9999, backdropFilter: 'blur(4px)'
                                    }}>
                                        <div style={{
                                            background: 'white', width: '90%', maxWidth: '800px',
                                            maxHeight: '90vh', borderRadius: '24px', overflowY: 'auto',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative'
                                        }}>
                                            {/* Header xịn xò */}
                                            <div style={{
                                                padding: '25px 30px', borderBottom: '1px solid #eee',
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                position: 'sticky', top: 0, background: 'white', zIndex: 10
                                            }}>
                                                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#1A1C2E', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <span style={{ background: '#8B5CF6', padding: '8px', borderRadius: '12px', color: 'white' }}>⚡</span>
                                                    Tạo Bài Đăng Tuyển Dụng Mới
                                                </h3>
                                                <button onClick={() => setShowPostJobModal(false)} style={{ border: 'none', background: '#F3F4F6', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', color: '#6B7280' }}>×</button>
                                            </div>

                                            <form onSubmit={handlePostJob} style={{ padding: '30px', display: 'grid', gap: '20px' }}>
                                                <div className="form-group">
                                                    <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block', color: '#4B5563' }}>Vị trí tuyển dụng *</label>
                                                    <input name="title" required placeholder="VD: Senior React Developer" onChange={handleJobInputChange} style={inputStyle} />
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                    <div className="form-group">
                                                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Mức lương</label>
                                                        <input name="salary" placeholder="VD: $2,000 - $3,500" onChange={handleJobInputChange} style={inputStyle} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Kinh nghiệm</label>
                                                        <input name="experience" placeholder="VD: 3 - 5 Năm" onChange={handleJobInputChange} style={inputStyle} />
                                                    </div>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                    <div className="form-group">
                                                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Địa điểm</label>
                                                        <input name="location" placeholder="VD: Quận 1, TP.HCM" onChange={handleJobInputChange} style={inputStyle} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Hạn nộp hồ sơ *</label>
                                                        <input type="date" name="deadline" required onChange={handleJobInputChange} style={inputStyle} />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Mô tả công việc *</label>
                                                    <textarea name="description" rows="4" placeholder="Nhập các đầu việc chính..." onChange={handleJobInputChange} style={{ ...inputStyle, resize: 'none' }}></textarea>
                                                </div>

                                                <div className="form-group">
                                                    <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Yêu cầu ứng viên *</label>
                                                    <textarea name="requirements" rows="4" placeholder="Kỹ năng, bằng cấp cần thiết..." onChange={handleJobInputChange} style={{ ...inputStyle, resize: 'none' }}></textarea>
                                                </div>

                                                <div className="form-group">
                                                    <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Quyền lợi (cách nhau bằng dấu phẩy)</label>
                                                    <input name="benefits" placeholder="Lương tháng 13, Macbook, Bảo hiểm..." onChange={handleJobInputChange} style={inputStyle} />
                                                </div>

                                                <button type="submit" style={{
                                                    marginTop: '10px', padding: '16px', borderRadius: '16px', border: 'none',
                                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #3B71FE 100%)',
                                                    color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
                                                    boxShadow: '0 10px 20px rgba(139, 92, 246, 0.2)'
                                                }}>
                                                    ĐĂNG BÀI TUYỂN DỤNG NGAY 🚀
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
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
                                        {realJobs.map((job) => (
                                            <div
                                                className="job-post-card"
                                                key={job.id}
                                                style={{
                                                    border: job.status === 'rejected' ? '1px solid #FCA5A5' : '1px solid #E5E7EB',
                                                    position: 'relative',
                                                    paddingBottom: job.status === 'rejected' ? '20px' : '15px' // Thêm chỗ cho lý do từ chối
                                                }}
                                            >
                                                {/* Badge trạng thái dựa trên status từ Database */}
                                                <span
                                                    className={`job-status ${job.status}`}
                                                    style={{
                                                        background: job.status === 'approved' ? '#ECFDF5' : job.status === 'rejected' ? '#FEF2F2' : '#FFFBEB',
                                                        color: job.status === 'approved' ? '#10B981' : job.status === 'rejected' ? '#EF4444' : '#F59E0B',
                                                        padding: '4px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '11px',
                                                        fontWeight: 'bold',
                                                        position: 'absolute',
                                                        top: '15px',
                                                        right: '15px',
                                                        border: `1px solid ${job.status === 'rejected' ? '#FCA5A5' : 'transparent'}`
                                                    }}
                                                >
                                                    {job.status === 'approved' ? 'Đang tuyển' : job.status === 'rejected' ? 'Bị từ chối' : 'Chờ duyệt'}
                                                </span>

                                                <h3 className="job-post-title" style={{ marginTop: '10px', width: '75%', fontSize: '18px' }}>
                                                    {job.title}
                                                </h3>

                                                <div className="job-post-info" style={{ color: '#6B7280', fontSize: '13px', margin: '10px 0' }}>
                                                    <i className="fas fa-users"></i> 0/10 ứng viên
                                                </div>

                                                {/* Progress Bar - xám đi nếu bị từ chối */}
                                                <div className="progress-bar" style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div
                                                        className="progress-fill"
                                                        style={{
                                                            width: '0%',
                                                            height: '100%',
                                                            background: job.status === 'approved' ? '#10B981' : '#CBD5E1'
                                                        }}
                                                    ></div>
                                                </div>

                                                {/* HIỂN THỊ LÝ DO TỪ CHỐI (Quan trọng nhất đây nè ck) */}
                                                {job.status === 'rejected' && job.rejection_reason && (
                                                    <div style={{
                                                        marginTop: '15px',
                                                        padding: '10px',
                                                        background: '#FFF1F2',
                                                        borderRadius: '8px',
                                                        borderLeft: '4px solid #EF4444',
                                                        fontSize: '13px',
                                                        color: '#991B1B'
                                                    }}>
                                                        <strong>⚠️ Lý do:</strong> {job.rejection_reason}
                                                    </div>
                                                )}

                                                {/* Tooltip khi hover (giữ nguyên logic của Ngân) */}
                                                <div className="job-details-tooltip">
                                                    <div className="tooltip-item"><strong>Lương:</strong> {job.salary}</div>
                                                    <div className="tooltip-item"><strong>Địa điểm:</strong> {job.location}</div>
                                                    <div className="tooltip-item"><strong>Hạn nộp:</strong> {new Date(job.deadline).toLocaleDateString('vi-VN')}</div>
                                                </div>
                                            </div>
                                        ))}
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