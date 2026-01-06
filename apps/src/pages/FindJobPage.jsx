// src/pages/FindJobPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FindJobPage.css';

const FindJobPage = () => {
    const navigate = useNavigate();
    const [dbJobs, setDbJobs] = useState([]);

    const fetchAllJobs = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/all-job-posts');
            const result = await res.json();
            console.log("Kết quả từ Database Neon:", result); // SOI Ở ĐÂY: Nhấn F12 trên web để xem
            if (result.success) {
                setDbJobs(result.data);
            }
        } catch (err) {
            console.log("Lỗi kết nối API:", err);
        }
    };
    // ==================================================================
    // 1. LOGIC SEARCH & DROPDOWN (CŨ)
    // ==================================================================
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // ==================================================================
    // 2. LOGIC USER ROLE (CŨ)
    // ==================================================================
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [userRole, setUserRole] = useState('');
    const userRef = useRef(null);

    // ==================================================================
    // 3. LOGIC MỚI: EXPAND NHÓM NGHỀ (ACCORDION)
    // ==================================================================
    // State lưu tên category đang được mở
    const [expandedCategory, setExpandedCategory] = useState(null);

    // Dữ liệu giả định cho các nhóm nghề và nghề con
    const careerCategories = [
        {
            id: 'sales',
            name: 'Kinh doanh / Bán hàng',
            subItems: ['Sales Admin', 'Telesales', 'Account Manager', 'Trưởng phòng kinh doanh']
        },
        {
            id: 'marketing',
            name: 'Marketing / PR',
            subItems: ['Content Writer', 'Digital Marketing', 'SEO Specialist', 'Brand Manager']
        },
        {
            id: 'it',
            name: 'IT - Phần mềm',
            subItems: ['Frontend Developer', 'Backend Developer', 'Tester / QA', 'Mobile Developer', 'DevOps']
        },
        {
            id: 'hr',
            name: 'Hành chính / Nhân sự',
            subItems: ['Recruiter', 'C&B', 'Lễ tân', 'Thư ký']
        }
    ];

    // Hàm xử lý khi bấm vào nhóm nghề
    const toggleCategory = (id) => {
        if (expandedCategory === id) {
            setExpandedCategory(null); // Nếu đang mở thì đóng lại
        } else {
            setExpandedCategory(id); // Nếu chưa mở thì mở ra
        }
    };

    // ==================================================================
    // 4. USE EFFECT CHUNG
    // ==================================================================
    useEffect(() => {
        fetchAllJobs();
        const savedData = localStorage.getItem('user_data');
        if (savedData) {
            const user = JSON.parse(savedData);
            setUserRole(user.role);
        }

        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleJobClick = (jobId) => {
        if (jobId) {
            navigate(`/job-detail/${jobId}`); // Chuyển sang job thật
        } else {
            navigate('/job-detail'); // Chuyển sang bản mẫu Google
        }
    };

    const handleLogout = () => {
        const confirm = window.confirm("Bạn có chắc muốn đăng xuất?");
        if (confirm) {
            localStorage.removeItem('user_data');
            navigate('/login');
        }
    };

    return (
        <div className="find-job-wrapper">

            {/* HEADER */}
            <header>
                <div className="logo-area" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <span style={{ color: '#3B71FE', fontSize: '30px' }}>⚡</span> Finder.
                </div>

                <div className="nav-links">
                    <a className="active" onClick={() => navigate('/find-jobs')}>Tìm Việc</a>
                    <a onClick={() => navigate('/profile-cv')}>Hồ Sơ & CV</a>
                    <a onClick={() => navigate('/recruiter')}>Công Ty</a>
                    <a onClick={() => navigate('/tools')}>Công Cụ</a>
                </div>

                <div
                    className="user-area"
                    ref={userRef}
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>
                        {userRole === 'recruiter' ? 'HR Manager' : 'Ngân Kim'}
                    </span>
                    <div
                        className="user-avatar"
                        style={{ background: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop') center/cover" }}
                    ></div>

                    {showUserDropdown && (
                        <div className="user-dropdown-menu">
                            <div className="dropdown-item" onClick={() => navigate('/profile')}>
                                <i className="fas fa-user-circle"></i> Hồ sơ cá nhân
                            </div>
                            <div className="dropdown-item" onClick={() => navigate('/my-jobs')}>
                                <i className="fas fa-briefcase"></i> Việc làm của tôi
                            </div>
                            <div className="dropdown-item" onClick={() => navigate('/settings')}>
                                <i className="fas fa-cog"></i> Cài đặt
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item logout" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i> Đăng xuất
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="job-container">

                {/* SIDEBAR FILTERS */}
                <aside className="filter-sidebar">
                    <div className="filter-header">
                        <h3>Bộ Lọc</h3>
                        <span className="clear-filter">Xóa tất cả</span>
                    </div>

                    <div className="filter-group">
                        <span className="filter-title">Lịch làm việc</span>
                        <label className="checkbox-item"><input type="checkbox" defaultChecked /> Full time</label>
                        <label className="checkbox-item"><input type="checkbox" /> Part time</label>
                        <label className="checkbox-item"><input type="checkbox" /> Internship</label>
                        <label className="checkbox-item"><input type="checkbox" /> Freelance</label>
                    </div>

                    <div className="filter-group">
                        <span className="filter-title">Hình thức</span>
                        <label className="checkbox-item"><input type="checkbox" defaultChecked /> Full day</label>
                        <label className="checkbox-item"><input type="checkbox" /> Shift work</label>
                        <label className="checkbox-item"><input type="checkbox" checked /> Flexible</label>
                        <label className="checkbox-item"><input type="checkbox" /> Remote</label>
                    </div>

                    {/* --- PHẦN NHÓM NGHỀ ĐÃ SỬA LOGIC ACCORDION --- */}
                    <div className="filter-group">
                        <span className="filter-title">Nhóm nghề</span>

                        {careerCategories.map((category) => (
                            <div key={category.id} style={{ marginBottom: '8px' }}>
                                {/* Header của nhóm nghề: Click vào để xổ ra */}
                                <div
                                    className="checkbox-item group-header"
                                    onClick={() => toggleCategory(category.id)}
                                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', pointerEvents: 'none' }}>
                                        {/* Input cha: Có thể bỏ pointerEvents: none nếu muốn check cả cha */}
                                        <input type="checkbox" onChange={() => { }} />
                                        {category.name}
                                    </label>
                                    <i
                                        className={`fas fa-chevron-${expandedCategory === category.id ? 'down' : 'right'}`}
                                        style={{ fontSize: '12px', color: '#888', transition: '0.3s' }}
                                    ></i>
                                </div>

                                {/* Danh sách con: Chỉ hiện khi expandedCategory khớp id */}
                                {expandedCategory === category.id && (
                                    <div style={{ paddingLeft: '25px', marginTop: '5px', animation: 'fadeIn 0.3s ease' }}>
                                        {category.subItems.map((sub, index) => (
                                            <label
                                                key={index}
                                                className="checkbox-item"
                                                style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}
                                            >
                                                <input type="checkbox" /> {sub}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="filter-group">
                        <span className="filter-title">Mức lương</span>
                        <label className="checkbox-item"><input type="checkbox" /> Dưới 10 triệu</label>
                        <label className="checkbox-item"><input type="checkbox" defaultChecked /> 10 - 20 triệu</label>
                        <label className="checkbox-item"><input type="checkbox" /> 20 - 30 triệu</label>
                        <label className="checkbox-item"><input type="checkbox" /> Thỏa thuận</label>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="content-area">

                    {/* SEARCH BAR */}
                    <div className="top-filter-container" ref={searchRef}>
                        <div className="advanced-search-bar">
                            <div className="search-field" style={{ flex: 2 }}>
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Vị trí tuyển dụng, tên công ty..."
                                    onFocus={() => setShowSuggestions(true)}
                                />
                            </div>
                            <div className="divider"></div>
                            <div className="search-field">
                                <i className="fas fa-briefcase"></i>
                                <select defaultValue="">
                                    <option value="" disabled hidden>Tất cả ngành nghề</option>
                                    <option>IT - Phần mềm</option>
                                    <option>Marketing / PR</option>
                                    <option>Kế toán / Kiểm toán</option>
                                    <option>Hành chính nhân sự</option>
                                </select>
                            </div>
                            <div className="divider"></div>
                            <div className="search-field">
                                <i className="fas fa-map-marker-alt"></i>
                                <select defaultValue="hcm">
                                    <option value="hcm">Hồ Chí Minh</option>
                                    <option value="hn">Hà Nội</option>
                                    <option value="dn">Đà Nẵng</option>
                                    <option value="remote">Remote</option>
                                </select>
                            </div>
                            <button className="btn-search-big">Tìm Kiếm</button>
                        </div>

                        <div className={`search-suggestions ${showSuggestions ? 'show' : ''}`}>
                            <div className="search-type-options">
                                <span style={{ fontSize: '13px', fontWeight: '700', marginRight: '10px' }}>Tìm kiếm theo:</span>
                                <label className="radio-label"><input type="radio" name="type" defaultChecked /> Tên việc làm</label>
                                <label className="radio-label"><input type="radio" name="type" /> Tên công ty</label>
                                <label className="radio-label"><input type="radio" name="type" /> Cả hai</label>
                            </div>
                            <div className="suggestion-header">🔥 Từ khóa phổ biến</div>
                            <ul className="keyword-list">
                                <li className="keyword-tag"><i>↗</i> Thực tập sinh Marketing</li>
                                <li className="keyword-tag"><i>↗</i> Business Analyst</li>
                                <li className="keyword-tag"><i>↗</i> Lập trình viên Java</li>
                                <li className="keyword-tag"><i>↗</i> Nhân viên kinh doanh</li>
                                <li className="keyword-tag"><i>↗</i> Kế toán tổng hợp</li>
                                <li className="keyword-tag"><i>↗</i> Tiếng Nhật N2</li>
                            </ul>
                        </div>
                    </div>

                    {/* CARDS LIST */}
                    <div className="cards-header">
                        <h3>Tìm thấy <span style={{ color: '#3B71FE' }}>45</span> công việc phù hợp</h3>
                        <select className="sort-select">
                            <option>Mới nhất</option>
                            <option>Lương cao nhất</option>
                            <option>Cần tuyển gấp</option>
                        </select>
                    </div>

                    <div className="cards-grid">
                        {/* --- HIỂN THỊ JOB THẬT TỪ DATABASE --- */}
                        {dbJobs.map((job) => (
                            <div className="job-card bg-1" key={job.id} onClick={() => handleJobClick(job.id)}>
                                <div className="card-top">
                                    <div className="card-icon-box" style={{ color: '#3B71FE' }}>⭐</div>
                                    {/* NOTE NHẬN DIỆN CHO NGÂN */}
                                    <span className="card-badge" style={{ background: '#3B71FE', color: 'white' }}>Mới nhất</span>
                                </div>
                                <span className="card-company">{job.company_name || 'Công ty ẩn danh'}</span>
                                <div className="card-title">{job.title}</div>
                                <div className="card-tags">
                                    <span className="mini-tag">{job.location}</span>
                                    <span className="mini-tag">{job.experience}</span>
                                </div>
                                <div className="card-bottom">
                                    <div className="price-tag">{job.salary}</div>
                                    <div className="location-text">🕒 {new Date(job.created_at).toLocaleDateString('vi-VN')}</div>
                                </div>
                                <div className="btn-apply-hover">
                                    {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                                </div>
                            </div>
                        ))}
                        <div className="job-card bg-1" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#05CD99' }}>☕</div>
                                <span className="card-badge badge-hot">HOT</span>
                            </div>
                            <span className="card-company">Highlands Coffee</span>
                            <div className="card-title">Cửa Hàng Trưởng (Store Manager)</div>
                            <div className="card-tags"><span className="mini-tag">Q.1, HCM</span><span className="mini-tag">1 Năm KN</span></div>

                            {/* Phần Footer: Giá tiền & Thời gian */}
                            <div className="card-bottom">
                                <div className="price-tag">15 - 20 Triệu</div>
                                <div className="location-text">🕒 2 giờ trước</div>
                            </div>

                            {/* Nút Hover hiện lên */}
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>

                        <div className="job-card bg-2" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#4318FF' }}>💻</div>
                                <span className="card-badge badge-new">Mới</span>
                            </div>
                            <span className="card-company">FPT Software</span>
                            <div className="card-title">Senior Java Developer</div>
                            <div className="card-tags"><span className="mini-tag">Hà Nội</span><span className="mini-tag">3 Năm KN</span></div>
                            <div className="card-bottom">
                                <div className="price-tag">$1,500 - $2,500</div>
                                <div className="location-text">🕒 1 giờ trước</div>
                            </div>
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>

                        <div className="job-card bg-3" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#9356D8' }}>🛒</div>
                            </div>
                            <span className="card-company">Shopee Vietnam</span>
                            <div className="card-title">Marketing Executive</div>
                            <div className="card-tags"><span className="mini-tag">Q.7, HCM</span><span className="mini-tag">Tiếng Anh</span></div>
                            <div className="card-bottom">
                                <div className="price-tag">12 - 18 Triệu</div>
                                <div className="location-text">🕒 Hôm qua</div>
                            </div>
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>

                        <div className="job-card bg-4" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#FF9800' }}>🎨</div>
                                <span className="card-badge badge-hot">Gấp</span>
                            </div>
                            <span className="card-company">VNG Corporation</span>
                            <div className="card-title">UI/UX Designer (Game)</div>
                            <div className="card-tags"><span className="mini-tag">Q.7, HCM</span><span className="mini-tag">Figma</span></div>
                            <div className="card-bottom">
                                <div className="price-tag">Thỏa thuận</div>
                                <div className="location-text">🕒 3 ngày trước</div>
                            </div>
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>

                        <div className="job-card bg-5" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#00BCD4' }}>👥</div>
                            </div>
                            <span className="card-company">Manpower Group</span>
                            <div className="card-title">HR Recruitment Specialist</div>
                            <div className="card-tags"><span className="mini-tag">Hà Nội</span><span className="mini-tag">Tuyển dụng</span></div>
                            <div className="card-bottom">
                                <div className="price-tag">10 - 15 Triệu</div>
                                <div className="location-text">🕒 5 giờ trước</div>
                            </div>
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>

                        <div className="job-card bg-6" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#E91E63' }}>🏦</div>
                            </div>
                            <span className="card-company">Techcombank</span>
                            <div className="card-title">Giao Dịch Viên (Teller)</div>
                            <div className="card-tags"><span className="mini-tag">Toàn quốc</span><span className="mini-tag">Tốt nghiệp ĐH</span></div>
                            <div className="card-bottom">
                                <div className="price-tag">8 - 12 Triệu</div>
                                <div className="location-text">🕒 1 tuần trước</div>
                            </div>
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>

                        <div className="job-card bg-1" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#05CD99' }}>📊</div>
                                <span className="card-badge badge-new">New</span>
                            </div>
                            <span className="card-company">OneMount Group</span>
                            <div className="card-title">Business Analyst (Fresher)</div>
                            <div className="card-tags"><span className="mini-tag">Hà Nội</span><span className="mini-tag">SQL</span></div>
                            <div className="card-bottom">
                                <div className="price-tag">8 - 12 Triệu</div>
                                <div className="location-text">🕒 1 giờ trước</div>
                            </div>
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>

                        <div className="job-card bg-2" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#4318FF' }}>☁️</div>
                            </div>
                            <span className="card-company">Viettel Telecom</span>
                            <div className="card-title">DevOps Engineer</div>
                            <div className="card-tags"><span className="mini-tag">Q.10, HCM</span><span className="mini-tag">AWS</span></div>
                            <div className="card-bottom">
                                <div className="price-tag">20 - 35 Triệu</div>
                                <div className="location-text">🕒 3 giờ trước</div>
                            </div>
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>

                        <div className="job-card bg-3" onClick={handleJobClick}>
                            <div className="card-top">
                                <div className="card-icon-box" style={{ color: '#9356D8' }}>🎬</div>
                                <span className="card-badge badge-hot">Gấp</span>
                            </div>
                            <span className="card-company">Galaxy Cinema</span>
                            <div className="card-title">Video Editor / Designer</div>
                            <div className="card-tags"><span className="mini-tag">Q.1, HCM</span><span className="mini-tag">Premiere</span></div>
                            <div className="card-bottom">
                                <div className="price-tag">10 - 15 Triệu</div>
                                <div className="location-text">🕒 5 giờ trước</div>
                            </div>
                            <div className="btn-apply-hover">
                                {userRole === 'recruiter' ? 'Xem chi tiết' : 'Ứng tuyển ngay'}
                            </div>
                        </div>
                    </div>

                    {/* PAGINATION */}
                    <div className="pagination">
                        <div className="page-btn">❮</div>
                        <div className="page-btn active">1</div>
                        <div className="page-btn">2</div>
                        <div className="page-btn">3</div>
                        <div className="page-btn">...</div>
                        <div className="page-btn">10</div>
                        <div className="page-btn">❯</div>
                    </div>

                </main>
            </div>

            <footer style={{ textAlign: 'center', padding: '30px', color: '#999', borderTop: '1px solid #EEE', marginTop: '50px' }}>
                <p>&copy; 2024 Finder. Nền tảng tuyển dụng uy tín hàng đầu.</p>
            </footer>

        </div>
    );
};

export default FindJobPage;