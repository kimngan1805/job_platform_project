import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Chào bạn! 👋 Mình có thể giúp gì cho bạn hôm nay?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Tin nhắn người dùng
    const newMessages = [...messages, { text: inputValue, isBot: false }];
    setMessages(newMessages);
    setInputValue("");

    // Bot trả lời tự động
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { text: "Dạ, cảm ơn bạn đã quan tâm! Tư vấn viên sẽ phản hồi sớm nhất ạ ❤️", isBot: true }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="dashboard-wrapper">
      {/* DECORATIONS */}
      <div className="shape-blob blob-1"></div>
      <div className="shape-blob blob-2"></div>

      {/* HEADER */}
      <header>
        <div className="logo" onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>Job<span>Hub</span></div>
        <nav>
          <a onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>Trang chủ</a>
          
          {/* --- MENU VIỆC LÀM (DROPDOWN) --- */}
          <div className="nav-item-dropdown">
            <a onClick={() => navigate('/find-jobs')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'}}>
              Việc làm <i className="fas fa-chevron-down" style={{fontSize: '12px'}}></i>
            </a>
            
            <div className="dropdown-menu">
                {/* Cột 1 */}
                <div className="drop-col">
                    <h4>VIỆC LÀM</h4>
                    <div className="drop-item" onClick={() => navigate('/find-jobs')}>
                        <i className="fas fa-search"></i> Tìm việc làm
                    </div>
                    <div className="drop-item"><i className="far fa-bookmark"></i> Việc làm đã lưu</div>
                    <div className="drop-item"><i className="far fa-check-circle"></i> Việc làm đã ứng tuyển</div>
                    <div className="drop-item"><i className="far fa-thumbs-up"></i> Việc làm phù hợp</div>
                    <h4 style={{marginTop: '20px'}}>CÔNG TY</h4>
                    <div className="drop-item"><i className="far fa-building"></i> Danh sách công ty</div>
                    <div className="drop-item"><i className="fas fa-star"></i> Top công ty</div>
                </div>

                {/* Cột 2 */}
                <div className="drop-col">
                    <h4>VIỆC LÀM THEO VỊ TRÍ</h4>
                    <div className="drop-item">Việc làm Nhân viên kinh doanh</div>
                    <div className="drop-item">Việc làm Kế toán</div>
                    <div className="drop-item">Việc làm Marketing</div>
                    <div className="drop-item">Việc làm Hành chính nhân sự</div>
                    <div className="drop-item">Việc làm Chăm sóc khách hàng</div>
                    <div className="drop-item">Việc làm Ngân hàng</div>
                    <div className="drop-item">Việc làm IT</div>
                </div>

                {/* Cột 3 */}
                <div className="drop-col">
                    <h4 style={{visibility: 'hidden'}}>...</h4>
                    <div className="drop-item">Việc làm Lao động phổ thông</div>
                    <div className="drop-item">Việc làm Senior</div>
                    <div className="drop-item">Việc làm Kỹ sư xây dựng</div>
                    <div className="drop-item">Việc làm Thiết kế đồ họa</div>
                    <div className="drop-item">Việc làm Bất động sản</div>
                    <div className="drop-item">Việc làm Giáo dục</div>
                    <div className="drop-item">Việc làm Telesales</div>
                </div>
            </div>
          </div>

          {/* --- MENU TẠO CV (STYLE TOPCV - MỚI) --- */}
          <div className="nav-item-dropdown">
            <a style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#00B14F', fontWeight: '600'}}>
              Tạo CV <i className="fas fa-chevron-down" style={{fontSize: '12px'}}></i>
            </a>
            
            <div className="dropdown-menu cv-menu">
                {/* CỘT TRÁI: CÁC MẪU CV */}
                <div>
                    <div className="cv-header">
                        Mẫu CV theo style <i className="fas fa-arrow-right" style={{fontSize: '10px'}}></i>
                    </div>
                    <div className="cv-item"><i className="fas fa-cube"></i> Mẫu CV Đơn giản</div>
                    <div className="cv-item"><i className="fas fa-magic"></i> Mẫu CV Ấn tượng</div>
                    <div className="cv-item"><i className="fas fa-star"></i> Mẫu CV Chuyên nghiệp</div>
                    <div className="cv-item"><i className="fas fa-pen-nib"></i> Mẫu CV Hiện đại</div>

                    <div className="cv-header" style={{marginTop: '20px'}}>
                        Mẫu CV theo vị trí ứng tuyển <i className="fas fa-arrow-right" style={{fontSize: '10px'}}></i>
                    </div>
                    <div className="cv-item"><i className="fas fa-briefcase"></i> Nhân viên kinh doanh</div>
                    <div className="cv-item"><i className="fas fa-laptop-code"></i> Lập trình viên</div>
                    <div className="cv-item"><i className="fas fa-calculator"></i> Nhân viên kế toán</div>
                    <div className="cv-item"><i className="fas fa-bullhorn"></i> Chuyên viên marketing</div>
                </div>

                {/* CỘT PHẢI: QUẢN LÝ CV */}
                <div className="cv-col-right">
                    <div className="cv-item"><i className="far fa-file-alt"></i> Quản lý CV</div>
                    <div className="cv-item"><i className="fas fa-cloud-upload-alt"></i> Tải CV lên</div>
                    <div className="cv-item"><i className="fas fa-book-open"></i> Hướng dẫn viết CV</div>
                    <div className="cv-item"><i className="far fa-envelope"></i> Quản lý Cover Letter</div>
                    <div className="cv-item"><i className="fas fa-feather-alt"></i> Mẫu Cover Letter</div>
                </div>
            </div>
          </div>
          {/* --- HẾT PHẦN MENU TẠO CV --- */}

          <button className="nav-btn" onClick={() => navigate('/login')}>Đăng Xuất</button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="soft-hero">
        <h1>Tìm Việc Làm <span>Đúng Đam Mê</span></h1>
        <p>Khám phá hàng ngàn cơ hội nghề nghiệp tại các công ty hàng đầu.</p>
        
        <div className="search-box">
          <input type="text" className="search-input" placeholder="Bạn muốn tìm việc gì? (Designer, Java...)" />
          <select className="search-input" style={{flex: 0.5}}>
            <option>Hà Nội</option>
            <option>TP.HCM</option>
            <option>Remote</option>
          </select>
          <button className="search-btn" onClick={() => navigate('/find-jobs')}>Tìm Kiếm</button>
        </div>

        <div className="categories">
          <div className="cat-pill active">🔥 Mới nhất</div>
          <div className="cat-pill">🎨 Thiết kế</div>
          <div className="cat-pill">💻 IT Phần mềm</div>
          <div className="cat-pill">📢 Marketing</div>
          <div className="cat-pill">💰 Tài chính</div>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div className="wave-container">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path className="wave-fill" d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
        </svg>
      </div>

      {/* JOBS SECTION */}
      <section className="main-section" id="jobs">
        <div className="section-header">
          <h2>Việc Làm <span>Nổi Bật</span></h2>
          <p>Được tuyển chọn kỹ lưỡng dành cho bạn</p>
        </div>

        <div className="jobs-grid">
          {/* Card 1 */}
          <div className="job-card card-blue">
            <div className="job-header">
              <div className="icon-box">🎨</div>
              <div className="job-info">
                <h3>Senior UI/UX Designer</h3>
                <p>Creative Studio • TP.HCM</p>
              </div>
            </div>
            <div className="job-desc">Thiết kế giao diện người dùng cho ứng dụng mobile và web. Phối hợp với team dev để triển khai...</div>
            <div className="job-meta">
              <div className="meta-item"><div className="meta-label">Lương</div><div className="meta-value">$1500 - $2500</div></div>
              <div className="meta-item"><div className="meta-label">Thời gian</div><div className="meta-value">Full-time</div></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="job-card card-orange">
            <div className="job-header">
              <div className="icon-box">💻</div>
              <div className="job-info">
                <h3>Frontend Developer</h3>
                <p>TechSolution Inc • Hà Nội</p>
              </div>
            </div>
            <div className="job-desc">Phát triển giao diện web sử dụng ReactJS, VueJS. Tối ưu hóa trải nghiệm người dùng...</div>
            <div className="job-meta">
              <div className="meta-item"><div className="meta-label">Lương</div><div className="meta-value">25 - 40 Triệu</div></div>
              <div className="meta-item"><div className="meta-label">Thời gian</div><div className="meta-value">Remote</div></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="job-card card-yellow">
            <div className="job-header">
              <div className="icon-box">📢</div>
              <div className="job-info">
                <h3>Content Creator</h3>
                <p>Viral Agency • Đà Nẵng</p>
              </div>
            </div>
            <div className="job-desc">Sáng tạo nội dung cho các kênh social media (TikTok, Facebook). Viết kịch bản video...</div>
            <div className="job-meta">
              <div className="meta-item"><div className="meta-label">Lương</div><div className="meta-value">Thỏa thuận</div></div>
              <div className="meta-item"><div className="meta-label">Thời gian</div><div className="meta-value">Freelance</div></div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="job-card card-purple">
            <div className="job-header">
              <div className="icon-box">📊</div>
              <div className="job-info">
                <h3>Data Analyst</h3>
                <p>BigData Corp • TP.HCM</p>
              </div>
            </div>
            <div className="job-desc">Phân tích dữ liệu người dùng, tạo báo cáo trực quan hóa dữ liệu hỗ trợ ra quyết định...</div>
            <div className="job-meta">
              <div className="meta-item"><div className="meta-label">Lương</div><div className="meta-value">$2000+</div></div>
              <div className="meta-item"><div className="meta-label">Thời gian</div><div className="meta-value">Hybrid</div></div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="job-card card-blue">
            <div className="job-header">
              <div className="icon-box">🛒</div>
              <div className="job-info">
                <h3>E-commerce Manager</h3>
                <p>ShopShop • Hà Nội</p>
              </div>
            </div>
            <div className="job-desc">Quản lý vận hành sàn thương mại điện tử. Lên kế hoạch marketing thúc đẩy doanh số...</div>
            <div className="job-meta">
              <div className="meta-item"><div className="meta-label">Lương</div><div className="meta-value">20 - 30 Triệu</div></div>
              <div className="meta-item"><div className="meta-label">Thời gian</div><div className="meta-value">Full-time</div></div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="job-card card-orange">
            <div className="job-header">
              <div className="icon-box">📱</div>
              <div className="job-info">
                <h3>Mobile Developer</h3>
                <p>AppDev Global • Remote</p>
              </div>
            </div>
            <div className="job-desc">Lập trình ứng dụng di động đa nền tảng bằng Flutter. Fix bugs và nâng cấp tính năng...</div>
            <div className="job-meta">
              <div className="meta-item"><div className="meta-label">Lương</div><div className="meta-value">Up to $3000</div></div>
              <div className="meta-item"><div className="meta-label">Thời gian</div><div className="meta-value">Contract</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="stats-bg-icon">🚀</div>
        <div className="section-header" style={{ color: 'white' }}>
          <h2 style={{ color: 'white' }}>Con Số <span>Ấn Tượng</span></h2>
          <p>Chúng tôi tự hào kết nối thành công hàng ngàn ứng viên</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num">5K+</div><div className="stat-label">Việc làm mới</div></div>
          <div className="stat-card"><div className="stat-num">1.2K</div><div className="stat-label">Công ty</div></div>
          <div className="stat-card"><div className="stat-num">98%</div><div className="stat-label">Hài lòng</div></div>
          <div className="stat-card"><div className="stat-num">24/7</div><div className="stat-label">Hỗ trợ</div></div>
        </div>
      </section>

      {/* CV UPLOAD */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="cv-text">
            <h2>Bạn chưa tìm thấy việc ưng ý?</h2>
            <p>Đừng lo! Hãy để JobHub giúp bạn. Tải CV lên ngay để hệ thống tự động kết nối bạn với nhà tuyển dụng phù hợp nhất.</p>
            <button className="btn-upload">☁️ Tải CV Lên Ngay</button>
          </div>
          <div className="cv-img">
            {/* Link ảnh mẫu, Ngân có thể thay bằng ảnh trong folder assets */}
            <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop" alt="CV Upload" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="f-col">
            <h4>JobHub</h4>
            <p>Nền tảng tuyển dụng phong cách mới, kết nối nhân tài và doanh nghiệp.</p>
          </div>
          <div className="f-col"><h4>Ứng Viên</h4><ul><li><a>Tìm việc làm</a></li><li><a>Tạo CV Online</a></li></ul></div>
          <div className="f-col"><h4>Nhà Tuyển Dụng</h4><ul><li><a>Đăng tin</a></li><li><a>Tìm hồ sơ</a></li></ul></div>
          <div className="f-col"><h4>Liên Hệ</h4><p>📞 1900 8888</p><p>📍 TP. Hồ Chí Minh</p></div>
        </div>
        <div className="footer-bot">&copy; 2024 JobHub. Designed with ❤️ for Ngan.</div>
      </footer>

      {/* FLOATING ACTIONS */}
      <div className="float-container">
        <div className="float-btn btn-call" title="Gọi ngay">📞</div>
        <a href="#" className="float-btn btn-zalo" title="Chat Zalo">Z</a>
        <div className="float-btn btn-msg" title="Nhắn tin" onClick={toggleChat}>💬</div>
      </div>

      {/* CHAT WIDGET */}
      <div className={`chat-widget ${chatOpen ? 'active' : ''}`}>
        <div className="chat-head">
          <span>Hỗ trợ JobHub</span>
          <span style={{ cursor: 'pointer' }} onClick={toggleChat}>✕</span>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`msg ${msg.isBot ? 'msg-bot' : 'msg-user'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-foot">
          <input 
            type="text" 
            placeholder="Nhập tin nhắn..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;