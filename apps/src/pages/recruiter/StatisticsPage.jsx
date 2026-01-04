// src/pages/recruiter/StatisticsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StatisticsPage.css';

const StatisticsPage = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('30 ngày');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const handleExport = (type) => {
        alert(`Đang xuất báo cáo ${type}...`);
    };

    return (
        <div className="stats-page-body">
            {/* Header */}
            <header className="stats-header">
                <div className="stats-logo">
                    <span>⚡</span>
                    <span>GoJobs Recruiter</span>
                </div>
                <nav>
                    <ul className="stats-nav-menu">
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
                <div className="stats-header-right">
                    <button className="stats-notification-btn">
                        🔔
                        <span className="stats-notification-badge">5</span>
                    </button>
                    <div className="stats-user-profile">
                        <div className="stats-user-avatar">HR</div>
                        <span>HR Manager</span>
                    </div>
                </div>
            </header>
            {/* Main Container */}
            <div className="stats-container">
                {/* Sidebar */}
                <aside className="sidebar" style={{ width: '280px', background: 'white', padding: '30px 20px', boxShadow: '2px 0 10px rgba(0,0,0,0.05)', minHeight: 'calc(100vh - 70px)', height: '100%' }}>
                    <ul className="sidebar-menu" style={{ listStyle: 'none' }}>
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
                            <a className="active" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', textDecoration: 'none', color: 'white', background: '#6366f1', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>
                                📊 Thống kê
                            </a>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <a onClick={() => navigate('/recruiter/settings')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', textDecoration: 'none', color: '#666', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>
                                ⚙️ Cài đặt
                            </a>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="stats-content">
                    <div className="stats-content-header">
                        <h1 className="stats-content-title">Thống kê & Báo cáo</h1>
                        <div className="stats-filter-buttons">
                            {['7 ngày', '30 ngày', '3 tháng', 'Năm nay'].map(filter => (
                                <button
                                    key={filter}
                                    className={`stats-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                    onClick={() => handleFilterClick(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company Rank Section */}
                    <div className="stats-company-rank-section">
                        <div className="stats-rank-info">
                            <div className="stats-rank-badge">
                                <span>👑</span>
                                <span>PREMIUM</span>
                            </div>
                            <h2 className="stats-rank-title">Công ty Nổi bật</h2>
                            <p className="stats-rank-description">
                                Chúc mừng! Công ty bạn đang ở hạng Premium với ưu tiên hiển thị cao nhất.
                                Tin tuyển dụng của bạn xuất hiện đầu tiên trên trang chủ và có logo nổi bật.
                            </p>
                        </div>
                        <div className="stats-rank-stats">
                            <div className="stats-rank-stat">
                                <div className="stats-rank-stat-number">#12</div>
                                <div className="stats-rank-stat-label">Thứ hạng toàn quốc</div>
                            </div>
                            <div className="stats-rank-stat">
                                <div className="stats-rank-stat-number">⭐ 4.8</div>
                                <div className="stats-rank-stat-label">Đánh giá công ty</div>
                            </div>
                            <div className="stats-rank-stat">
                                <div className="stats-rank-stat-number">95%</div>
                                <div className="stats-rank-stat-label">Độ tin cậy</div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="stats-grid">
                        <div className="stats-card">
                            <div className="stats-icon blue">📝</div>
                            <div className="stats-label">Tin đang đăng</div>
                            <div className="stats-value">24</div>
                            <div className="stats-change up"><span>↗</span><span>+12% so với tháng trước</span></div>
                        </div>
                        <div className="stats-card">
                            <div className="stats-icon green">👥</div>
                            <div className="stats-label">CV nhận được</div>
                            <div className="stats-value">342</div>
                            <div className="stats-change up"><span>↗</span><span>+28% so với tháng trước</span></div>
                        </div>
                        <div className="stats-card">
                            <div className="stats-icon purple">✅</div>
                            <div className="stats-label">Ứng viên được tuyển</div>
                            <div className="stats-value">18</div>
                            <div className="stats-change up"><span>↗</span><span>+15% so với tháng trước</span></div>
                        </div>
                        <div className="stats-card">
                            <div className="stats-icon orange">💰</div>
                            <div className="stats-label">Chi phí/người</div>
                            <div className="stats-value">2.5M</div>
                            <div className="stats-change down"><span>↘</span><span>-8% so với tháng trước</span></div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="stats-charts-section">
                        {/* Funnel Chart */}
                        <div className="stats-chart-card">
                            <div className="stats-chart-header">
                                <h3 className="stats-chart-title">📈 Phễu tuyển dụng</h3>
                            </div>
                            <div className="stats-funnel-container">
                                <div className="stats-funnel-step">
                                    <div className="stats-funnel-label"><span>👀 Lượt xem tin</span><span>12,450</span></div>
                                    <div className="stats-funnel-bar" style={{ width: '100%' }}>100%</div>
                                </div>
                                <div className="stats-funnel-step">
                                    <div className="stats-funnel-label"><span>📄 Nộp đơn</span><span>342 (2.7%)</span></div>
                                    <div className="stats-funnel-bar" style={{ width: '75%' }}>75%</div>
                                </div>
                                <div className="stats-funnel-step">
                                    <div className="stats-funnel-label"><span>✅ Được duyệt hồ sơ</span><span>156 (45.6%)</span></div>
                                    <div className="stats-funnel-bar" style={{ width: '55%' }}>55%</div>
                                </div>
                                <div className="stats-funnel-step">
                                    <div className="stats-funnel-label"><span>📞 Mời phỏng vấn</span><span>78 (50%)</span></div>
                                    <div className="stats-funnel-bar" style={{ width: '35%' }}>35%</div>
                                </div>
                                <div className="stats-funnel-step">
                                    <div className="stats-funnel-label"><span>💼 Gửi Offer</span><span>32 (41%)</span></div>
                                    <div className="stats-funnel-bar" style={{ width: '20%' }}>20%</div>
                                </div>
                                <div className="stats-funnel-step">
                                    <div className="stats-funnel-label"><span>✔️ Nhận việc</span><span>18 (56.3%)</span></div>
                                    <div className="stats-funnel-bar" style={{ width: '12%' }}>12%</div>
                                </div>
                            </div>
                        </div>

                        {/* Source Analytics */}
                        <div className="stats-chart-card">
                            <div className="stats-chart-header">
                                <h3 className="stats-chart-title">🌍 Nguồn ứng viên</h3>
                            </div>
                            <div className="stats-source-list">
                                <div className="stats-source-item">
                                    <div className="stats-source-info">
                                        <div className="stats-source-icon" style={{ background: '#1877f2' }}>f</div>
                                        <div><div className="stats-source-name">Facebook</div><div className="stats-source-percent">42% tổng ứng viên</div></div>
                                    </div>
                                    <div className="stats-source-value">144</div>
                                </div>
                                <div className="stats-source-item">
                                    <div className="stats-source-info">
                                        <div className="stats-source-icon" style={{ background: '#4285f4' }}>G</div>
                                        <div><div className="stats-source-name">Google Search</div><div className="stats-source-percent">28% tổng ứng viên</div></div>
                                    </div>
                                    <div className="stats-source-value">96</div>
                                </div>
                                <div className="stats-source-item">
                                    <div className="stats-source-info">
                                        <div className="stats-source-icon" style={{ background: '#0a66c2' }}>in</div>
                                        <div><div className="stats-source-name">LinkedIn</div><div className="stats-source-percent">18% tổng ứng viên</div></div>
                                    </div>
                                    <div className="stats-source-value">62</div>
                                </div>
                                <div className="stats-source-item">
                                    <div className="stats-source-info">
                                        <div className="stats-source-icon" style={{ background: '#10b981' }}>🔗</div>
                                        <div><div className="stats-source-name">Nộp trực tiếp</div><div className="stats-source-percent">12% tổng ứng viên</div></div>
                                    </div>
                                    <div className="stats-source-value">40</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time to Hire & Cost Analysis */}
                    <div className="stats-charts-section" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="stats-chart-card">
                            <div className="stats-chart-header">
                                <h3 className="stats-chart-title">⏱️ Thời gian tuyển dụng</h3>
                            </div>
                            <div className="stats-timeline-container">
                                <div className="stats-timeline-item">
                                    <div className="stats-timeline-label">Đăng tin → CV đầu tiên</div>
                                    <div className="stats-timeline-bar"><div className="stats-timeline-progress" style={{ width: '40%', background: '#3b82f6' }}>2.5 ngày</div></div>
                                </div>
                                <div className="stats-timeline-item">
                                    <div className="stats-timeline-label">Nhận CV → Phỏng vấn</div>
                                    <div className="stats-timeline-bar"><div className="stats-timeline-progress" style={{ width: '60%', background: '#8b5cf6' }}>4.2 ngày</div></div>
                                </div>
                                <div className="stats-timeline-item">
                                    <div className="stats-timeline-label">Phỏng vấn → Gửi Offer</div>
                                    <div className="stats-timeline-bar"><div className="stats-timeline-progress" style={{ width: '50%', background: '#ec4899' }}>3.8 ngày</div></div>
                                </div>
                                <div className="stats-timeline-item">
                                    <div className="stats-timeline-label">Tổng thời gian tuyển dụng</div>
                                    <div className="stats-timeline-bar"><div className="stats-timeline-progress" style={{ width: '85%', background: '#10b981' }}>12.5 ngày</div></div>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', padding: '15px', background: '#f0fdf4', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                                <strong style={{ color: '#16a34a' }}>✅ Nhanh hơn 23% so với trung bình ngành</strong>
                            </div>
                        </div>

                        <div className="stats-chart-card">
                            <div className="stats-chart-header">
                                <h3 className="stats-chart-title">💰 Phân tích chi phí</h3>
                            </div>
                            <div className="stats-cost-grid">
                                <div className="stats-cost-item">
                                    <div className="stats-cost-icon" style={{ background: '#dbeafe' }}>💸</div>
                                    <div className="stats-cost-info"><div className="stats-cost-label">Chi phí đẩy tin</div><div className="stats-cost-value">12.5M VNĐ</div><div className="stats-cost-percent">45% tổng chi phí</div></div>
                                </div>
                                <div className="stats-cost-item">
                                    <div className="stats-cost-icon" style={{ background: '#fef3c7' }}>📱</div>
                                    <div className="stats-cost-info"><div className="stats-cost-label">Quảng cáo Facebook</div><div className="stats-cost-value">8.2M VNĐ</div><div className="stats-cost-percent">30% tổng chi phí</div></div>
                                </div>
                                <div className="stats-cost-item">
                                    <div className="stats-cost-icon" style={{ background: '#e0e7ff' }}>🔗</div>
                                    <div className="stats-cost-info"><div className="stats-cost-label">LinkedIn Premium</div><div className="stats-cost-value">4.5M VNĐ</div><div className="stats-cost-percent">16% tổng chi phí</div></div>
                                </div>
                                <div className="stats-cost-item">
                                    <div className="stats-cost-icon" style={{ background: '#dcfce7' }}>🌐</div>
                                    <div className="stats-cost-info"><div className="stats-cost-label">Google Ads</div><div className="stats-cost-value">2.5M VNĐ</div><div className="stats-cost-percent">9% tổng chi phí</div></div>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', padding: '15px', background: '#fef9c3', borderRadius: '10px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.9em', color: '#854d0e', marginBottom: '5px' }}>Cost per Hire</div>
                                <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#ca8a04' }}>2.5M VNĐ</div>
                            </div>
                        </div>
                    </div>

                    {/* Candidate Analytics */}
                    <div className="stats-charts-section" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <div className="stats-chart-card">
                            <div className="stats-chart-header"><h3 className="stats-chart-title">👥 Độ tuổi ứng viên</h3></div>
                            <div className="stats-age-chart">
                                <div className="stats-age-bar-item"><div className="stats-age-label">18-24</div><div className="stats-age-bar"><div className="stats-age-progress" style={{ width: '25%', background: '#3b82f6' }}>25%</div></div></div>
                                <div className="stats-age-bar-item"><div className="stats-age-label">25-30</div><div className="stats-age-bar"><div className="stats-age-progress" style={{ width: '45%', background: '#8b5cf6' }}>45%</div></div></div>
                                <div className="stats-age-bar-item"><div className="stats-age-label">31-35</div><div className="stats-age-bar"><div className="stats-age-progress" style={{ width: '20%', background: '#ec4899' }}>20%</div></div></div>
                                <div className="stats-age-bar-item"><div className="stats-age-label">36+</div><div className="stats-age-bar"><div className="stats-age-progress" style={{ width: '10%', background: '#f59e0b' }}>10%</div></div></div>
                            </div>
                        </div>

                        <div className="stats-chart-card">
                            <div className="stats-chart-header"><h3 className="stats-chart-title">💼 Kinh nghiệm</h3></div>
                            <div className="stats-exp-chart">
                                <div className="stats-exp-item"><div className="stats-exp-circle" style={{ background: '#dbeafe' }}><div className="stats-exp-percent">32%</div></div><div className="stats-exp-label">Junior</div><div className="stats-exp-count">109 ứng viên</div></div>
                                <div className="stats-exp-item"><div className="stats-exp-circle" style={{ background: '#e9d5ff' }}><div className="stats-exp-percent">48%</div></div><div className="stats-exp-label">Middle</div><div className="stats-exp-count">164 ứng viên</div></div>
                                <div className="stats-exp-item"><div className="stats-exp-circle" style={{ background: '#fed7aa' }}><div className="stats-exp-percent">20%</div></div><div className="stats-exp-label">Senior</div><div className="stats-exp-count">69 ứng viên</div></div>
                            </div>
                        </div>

                        <div className="stats-chart-card">
                            <div className="stats-chart-header"><h3 className="stats-chart-title">📍 Vị trí địa lý</h3></div>
                            <div className="stats-location-list">
                                <div className="stats-location-item"><div className="stats-location-name">🏙️ Hà Nội</div><div className="stats-location-bar"><div style={{ width: '45%', background: '#6366f1', height: '8px', borderRadius: '4px' }}></div></div><div className="stats-location-count">154</div></div>
                                <div className="stats-location-item"><div className="stats-location-name">🌆 TP.HCM</div><div className="stats-location-bar"><div style={{ width: '35%', background: '#8b5cf6', height: '8px', borderRadius: '4px' }}></div></div><div className="stats-location-count">120</div></div>
                                <div className="stats-location-item"><div className="stats-location-name">🏖️ Đà Nẵng</div><div className="stats-location-bar"><div style={{ width: '12%', background: '#ec4899', height: '8px', borderRadius: '4px' }}></div></div><div className="stats-location-count">41</div></div>
                                <div className="stats-location-item"><div className="stats-location-name">🌏 Tỉnh khác</div><div className="stats-location-bar"><div style={{ width: '8%', background: '#10b981', height: '8px', borderRadius: '4px' }}></div></div><div className="stats-location-count">27</div></div>
                            </div>
                        </div>
                    </div>

                    {/* Trends Chart */}
                    <div className="stats-chart-card" style={{ marginBottom: '30px' }}>
                        <div className="stats-chart-header">
                            <h3 className="stats-chart-title">📅 Xu hướng theo thời gian</h3>
                        </div>
                        <div className="stats-trends-chart">
                            <div className="stats-trends-legend">
                                <div className="stats-legend-item"><div className="stats-legend-color" style={{ background: '#3b82f6' }}></div><span>CV nhận được</span></div>
                                <div className="stats-legend-item"><div className="stats-legend-color" style={{ background: '#10b981' }}></div><span>Phỏng vấn</span></div>
                                <div className="stats-legend-item"><div className="stats-legend-color" style={{ background: '#f59e0b' }}></div><span>Tuyển dụng</span></div>
                            </div>
                            <div className="stats-trends-bars">
                                <div className="stats-trend-week"><div className="stats-trend-bars-group"><div className="stats-trend-bar" style={{ height: '60%', background: '#3b82f6' }}></div><div className="stats-trend-bar" style={{ height: '35%', background: '#10b981' }}></div><div className="stats-trend-bar" style={{ height: '15%', background: '#f59e0b' }}></div></div><div className="stats-trend-label">T1</div></div>
                                <div className="stats-trend-week"><div className="stats-trend-bars-group"><div className="stats-trend-bar" style={{ height: '75%', background: '#3b82f6' }}></div><div className="stats-trend-bar" style={{ height: '45%', background: '#10b981' }}></div><div className="stats-trend-bar" style={{ height: '20%', background: '#f59e0b' }}></div></div><div className="stats-trend-label">T2</div></div>
                                <div className="stats-trend-week"><div className="stats-trend-bars-group"><div className="stats-trend-bar" style={{ height: '85%', background: '#3b82f6' }}></div><div className="stats-trend-bar" style={{ height: '55%', background: '#10b981' }}></div><div className="stats-trend-bar" style={{ height: '25%', background: '#f59e0b' }}></div></div><div className="stats-trend-label">T3</div></div>
                                <div className="stats-trend-week"><div className="stats-trend-bars-group"><div className="stats-trend-bar" style={{ height: '95%', background: '#3b82f6' }}></div><div className="stats-trend-bar" style={{ height: '65%', background: '#10b981' }}></div><div className="stats-trend-bar" style={{ height: '30%', background: '#f59e0b' }}></div></div><div className="stats-trend-label">T4</div></div>
                            </div>
                        </div>
                    </div>

                    {/* Top Performers */}
                    <div className="stats-charts-section" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="stats-chart-card">
                            <div className="stats-chart-header"><h3 className="stats-chart-title">🏆 Top vị trí HOT</h3></div>
                            <div className="stats-top-list">
                                <div className="stats-top-item"><div className="stats-top-rank" style={{ background: '#fbbf24' }}>1</div><div className="stats-top-info"><div className="stats-top-name">UI/UX Designer</div><div className="stats-top-stats">89 ứng viên • 3,120 views</div></div><div className="stats-top-badge hot">🔥</div></div>
                                <div className="stats-top-item"><div className="stats-top-rank" style={{ background: '#94a3b8' }}>2</div><div className="stats-top-info"><div className="stats-top-name">Frontend Developer</div><div className="stats-top-stats">68 ứng viên • 2,450 views</div></div><div className="stats-top-badge hot">🔥</div></div>
                                <div className="stats-top-item"><div className="stats-top-rank" style={{ background: '#cd7f32' }}>3</div><div className="stats-top-info"><div className="stats-top-name">Backend Developer</div><div className="stats-top-stats">52 ứng viên • 1,850 views</div></div><div className="stats-top-badge good">✅</div></div>
                                <div className="stats-top-item"><div className="stats-top-rank">4</div><div className="stats-top-info"><div className="stats-top-name">Marketing Manager</div><div className="stats-top-stats">45 ứng viên • 1,250 views</div></div><div className="stats-top-badge good">✅</div></div>
                                <div className="stats-top-item"><div className="stats-top-rank">5</div><div className="stats-top-info"><div className="stats-top-name">Product Manager</div><div className="stats-top-stats">24 ứng viên • 980 views</div></div><div className="stats-top-badge good">✅</div></div>
                            </div>
                        </div>

                        <div className="stats-chart-card">
                            <div className="stats-chart-header"><h3 className="stats-chart-title">🎯 Top kỹ năng được tìm kiếm</h3></div>
                            <div className="stats-skills-list">
                                <div className="stats-skill-item"><div className="stats-skill-name">ReactJS</div><div className="stats-skill-bar"><div className="stats-skill-progress" style={{ width: '85%', background: '#3b82f6' }}>85%</div></div></div>
                                <div className="stats-skill-item"><div className="stats-skill-name">Figma</div><div className="stats-skill-bar"><div className="stats-skill-progress" style={{ width: '78%', background: '#8b5cf6' }}>78%</div></div></div>
                                <div className="stats-skill-item"><div className="stats-skill-name">Node.js</div><div className="stats-skill-bar"><div className="stats-skill-progress" style={{ width: '72%', background: '#10b981' }}>72%</div></div></div>
                                <div className="stats-skill-item"><div className="stats-skill-name">Python</div><div className="stats-skill-bar"><div className="stats-skill-progress" style={{ width: '68%', background: '#f59e0b' }}>68%</div></div></div>
                                <div className="stats-skill-item"><div className="stats-skill-name">Digital Marketing</div><div className="stats-skill-bar"><div className="stats-skill-progress" style={{ width: '55%', background: '#ec4899' }}>55%</div></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Job Performance Table */}
                    <div className="stats-table-section">
                        <div className="stats-table-header"><h3 className="stats-chart-title">💼 Hiệu quả từng tin tuyển dụng</h3></div>
                        <table className="stats-performance-table">
                            <thead><tr><th>Tên công việc</th><th>Lượt xem</th><th>Ứng viên</th><th>Tỷ lệ</th><th>Đã tuyển</th><th>Xu hướng</th></tr></thead>
                            <tbody>
                                <tr><td><span className="stats-job-name">Frontend Developer</span></td><td>2,450</td><td>68</td><td>2.8%</td><td>4</td><td><span className="stats-trend-badge hot">🔥 Hot</span></td></tr>
                                <tr><td><span className="stats-job-name">Backend Developer</span></td><td>1,850</td><td>52</td><td>2.8%</td><td>3</td><td><span className="stats-trend-badge good">✅ Tốt</span></td></tr>
                                <tr><td><span className="stats-job-name">UI/UX Designer</span></td><td>3,120</td><td>89</td><td>2.9%</td><td>5</td><td><span className="stats-trend-badge hot">🔥 Hot</span></td></tr>
                                <tr><td><span className="stats-job-name">Product Manager</span></td><td>980</td><td>24</td><td>2.4%</td><td>2</td><td><span className="stats-trend-badge good">✅ Tốt</span></td></tr>
                                <tr><td><span className="stats-job-name">Marketing Manager</span></td><td>1,250</td><td>45</td><td>3.6%</td><td>2</td><td><span className="stats-trend-badge good">✅ Tốt</span></td></tr>
                                <tr><td><span className="stats-job-name">DevOps Engineer</span></td><td>650</td><td>15</td><td>2.3%</td><td>1</td><td><span className="stats-trend-badge low">⚠️ Thấp</span></td></tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Export Section */}
                    <div className="stats-export-section">
                        <h3 className="stats-export-title">📊 Xuất báo cáo</h3>
                        <p className="stats-export-description">Tải báo cáo chi tiết về hiệu quả tuyển dụng của bạn</p>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="stats-export-btn" onClick={() => handleExport('Excel')}><span>⬇️</span><span>Xuất Excel</span></button>
                            <button className="stats-export-btn" style={{ background: '#ef4444' }} onClick={() => handleExport('PDF')}><span>📄</span><span>Xuất PDF</span></button>
                            <button className="stats-export-btn" style={{ background: '#8b5cf6' }} onClick={() => handleExport('Email')}><span>📧</span><span>Gửi Email</span></button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StatisticsPage;