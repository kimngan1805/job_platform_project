import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FindJobPage.css';

const FindJobPage = () => {
  const navigate = useNavigate();
  
  // State quản lý hiển thị bảng gợi ý
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Xử lý click ra ngoài để tắt gợi ý
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleJobClick = () => {
    navigate('/job-detail');
  };

  return (
    <div className="find-job-wrapper">
      
      {/* HEADER */}
      <header>
        <div className="logo-area" onClick={() => navigate('/dashboard')}>
           <span style={{color: '#3B71FE', fontSize: '30px'}}>⚡</span> Finder.
        </div>
        <div className="nav-links">
            <a className="active">Tìm Việc</a>
            <a>Hồ Sơ & CV</a>
            <a>Công Ty</a>
            <a>Công Cụ</a>
        </div>
        <div className="user-area">
            <span style={{fontSize: '14px', fontWeight: '700'}}>Ngân Kim</span>
            <div className="user-avatar" style={{background: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop') center/cover"}}></div>
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

            <div className="filter-group">
                <span className="filter-title">Nhóm nghề</span>
                <div className="checkbox-item group-header">
                    <label style={{display:'flex', gap:'10px', alignItems:'center', cursor:'pointer', width:'100%'}}>
                        <input type="checkbox" /> Kinh doanh / Bán hàng
                    </label>
                    <i className="fas fa-chevron-right"></i>
                </div>
                <div className="checkbox-item group-header">
                    <label style={{display:'flex', gap:'10px', alignItems:'center', cursor:'pointer', width:'100%'}}>
                        <input type="checkbox" /> Marketing / PR
                    </label>
                    <i className="fas fa-chevron-right"></i>
                </div>
                <div className="checkbox-item group-header">
                    <label style={{display:'flex', gap:'10px', alignItems:'center', cursor:'pointer', width:'100%'}}>
                        <input type="checkbox" /> IT - Phần mềm
                    </label>
                    <i className="fas fa-chevron-right"></i>
                </div>
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
            
            {/* --- ADVANCED SEARCH BAR (NEW) --- */}
            <div className="top-filter-container" ref={searchRef}>
                <div className="advanced-search-bar">
                    
                    {/* Input: Tên công việc */}
                    <div className="search-field" style={{flex: 2}}>
                        <i className="fas fa-search"></i>
                        <input 
                            type="text" 
                            placeholder="Vị trí tuyển dụng, tên công ty..." 
                            onFocus={() => setShowSuggestions(true)} 
                        />
                    </div>

                    <div className="divider"></div>

                    {/* Select: Ngành nghề */}
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

                    {/* Select: Địa điểm */}
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

                {/* SEARCH SUGGESTIONS DROPDOWN */}
                <div className={`search-suggestions ${showSuggestions ? 'show' : ''}`}>
                    <div className="search-type-options">
                        <span style={{fontSize:'13px', fontWeight:'700', marginRight:'10px'}}>Tìm kiếm theo:</span>
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

            {/* HEADER LIST */}
            <div className="cards-header">
                <h3>Tìm thấy <span style={{color: '#3B71FE'}}>45</span> công việc phù hợp</h3>
                <select className="sort-select">
                    <option>Mới nhất</option>
                    <option>Lương cao nhất</option>
                    <option>Cần tuyển gấp</option>
                </select>
            </div>

            {/* JOB LIST */}
            <div className="cards-grid">
                
                <div className="job-card bg-1" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#05CD99'}}>☕</div>
                        <span className="card-badge badge-hot">HOT</span>
                    </div>
                    <span className="card-company">Highlands Coffee</span>
                    <div className="card-title">Cửa Hàng Trưởng (Store Manager)</div>
                    <div className="card-tags"><span class="mini-tag">Q.1, HCM</span><span class="mini-tag">1 Năm KN</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">15 - 20 Triệu</div>
                        <div class="location-text">🕒 2 giờ trước</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
                </div>

                <div className="job-card bg-2" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#4318FF'}}>💻</div>
                        <span className="card-badge badge-new">Mới</span>
                    </div>
                    <span className="card-company">FPT Software</span>
                    <div className="card-title">Senior Java Developer</div>
                    <div className="card-tags"><span class="mini-tag">Hà Nội</span><span class="mini-tag">3 Năm KN</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">$1,500 - $2,500</div>
                        <div class="location-text">🕒 1 giờ trước</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
                </div>

                <div className="job-card bg-3" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#9356D8'}}>🛒</div>
                    </div>
                    <span className="card-company">Shopee Vietnam</span>
                    <div className="card-title">Marketing Executive</div>
                    <div className="card-tags"><span class="mini-tag">Q.7, HCM</span><span class="mini-tag">Tiếng Anh</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">12 - 18 Triệu</div>
                        <div class="location-text">🕒 Hôm qua</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
                </div>

                <div className="job-card bg-4" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#FF9800'}}>🎨</div>
                        <span className="card-badge badge-hot">Gấp</span>
                    </div>
                    <span className="card-company">VNG Corporation</span>
                    <div className="card-title">UI/UX Designer (Game)</div>
                    <div className="card-tags"><span class="mini-tag">Q.7, HCM</span><span class="mini-tag">Figma</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">Thỏa thuận</div>
                        <div class="location-text">🕒 3 ngày trước</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
                </div>

                <div className="job-card bg-5" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#00BCD4'}}>👥</div>
                    </div>
                    <span className="card-company">Manpower Group</span>
                    <div className="card-title">HR Recruitment Specialist</div>
                    <div className="card-tags"><span class="mini-tag">Hà Nội</span><span class="mini-tag">Tuyển dụng</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">10 - 15 Triệu</div>
                        <div class="location-text">🕒 5 giờ trước</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
                </div>

                <div className="job-card bg-6" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#E91E63'}}>🏦</div>
                    </div>
                    <span className="card-company">Techcombank</span>
                    <div className="card-title">Giao Dịch Viên (Teller)</div>
                    <div className="card-tags"><span class="mini-tag">Toàn quốc</span><span class="mini-tag">Tốt nghiệp ĐH</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">8 - 12 Triệu</div>
                        <div class="location-text">🕒 1 tuần trước</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
                </div>

                <div className="job-card bg-1" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#05CD99'}}>📊</div>
                        <span className="card-badge badge-new">New</span>
                    </div>
                    <span className="card-company">OneMount Group</span>
                    <div className="card-title">Business Analyst (Fresher)</div>
                    <div className="card-tags"><span class="mini-tag">Hà Nội</span><span class="mini-tag">SQL</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">8 - 12 Triệu</div>
                        <div class="location-text">🕒 1 giờ trước</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
                </div>

                <div className="job-card bg-2" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#4318FF'}}>☁️</div>
                    </div>
                    <span className="card-company">Viettel Telecom</span>
                    <div className="card-title">DevOps Engineer</div>
                    <div className="card-tags"><span class="mini-tag">Q.10, HCM</span><span class="mini-tag">AWS</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">20 - 35 Triệu</div>
                        <div class="location-text">🕒 3 giờ trước</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
                </div>

                <div className="job-card bg-3" onClick={handleJobClick}>
                    <div className="card-top">
                        <div className="card-icon-box" style={{color: '#9356D8'}}>🎬</div>
                        <span className="card-badge badge-hot">Gấp</span>
                    </div>
                    <span className="card-company">Galaxy Cinema</span>
                    <div className="card-title">Video Editor / Designer</div>
                    <div className="card-tags"><span class="mini-tag">Q.1, HCM</span><span class="mini-tag">Premiere</span></div>
                    <div className="card-bottom">
                        <div class="price-tag">10 - 15 Triệu</div>
                        <div class="location-text">🕒 5 giờ trước</div>
                    </div>
                    <div className="btn-apply-hover">Ứng tuyển ngay</div>
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

      <footer style={{textAlign: 'center', padding: '30px', color: '#999', borderTop: '1px solid #EEE', marginTop: '50px'}}>
        <p>&copy; 2024 Finder. Nền tảng tuyển dụng uy tín hàng đầu.</p>
      </footer>

    </div>
  );
};

export default FindJobPage;