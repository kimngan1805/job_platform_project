// src/pages/JobDetailPage.jsx
import React from 'react';
import '../css/JobDetailPage.css';
import { useNavigate } from 'react-router-dom';

const JobDetailPage = () => {
  const navigate = useNavigate();

  // Hàm xử lý khi nhấn nút chia sẻ
  const handleShare = (platform) => {
    const currentUrl = window.location.href; // Lấy đường dẫn hiện tại
    
    // Copy vào bộ nhớ đệm
    navigator.clipboard.writeText(currentUrl).then(() => {
      // Thông báo đơn giản
      alert(`Đã sao chép link! Bạn có thể dán vào ${platform} để gửi cho bạn bè.`);
    });
  };

  return (
    <div className="job-detail-wrapper">
      <div className="job-detail-container">
        {/* Header */}
        <header className="job-detail-header">
          <div className="job-detail-logo" onClick={() => navigate('/find-jobs')} style={{cursor: 'pointer'}}>
            GoJobs
          </div>
          <nav className="job-detail-nav">
            <a href="#">Tìm Việc</a>
            <a href="#">Nhà Tuyển Dụng</a>
            <a href="#">Giới Thiệu</a>
            <a href="#">Cách Hoạt Động</a>
            <a href="#">Tin Tức</a>
            <a href="#" className="sign-in-btn">Đăng Nhập</a>
          </nav>
        </header>

        <div className="main-content">
          {/* Main Job Detail */}
          <div className="job-detail-card">
            <div className="job-header-section">
              <div>
                <h1 className="job-title-large">UI/UX Designer</h1>
                <div className="job-meta">
                  <span><i className="fas fa-building"></i> Google</span>
                  <span><i className="fas fa-map-marker-alt"></i> Mountain View, CA</span>
                  <span><i className="fas fa-clock"></i> Đăng 5 ngày trước</span>
                </div>
              </div>
              <button className="bookmark-btn">
                <i className="far fa-bookmark"></i>
              </button>
            </div>
            
            <div className="job-info-grid">
              <div className="info-item">
                <span className="info-label">Mức lương</span>
                <span className="info-value">$100,000 - $200,000 / Năm</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phúc lợi</span>
                <span className="info-value">Bảo hiểm Y tế, Nha khoa, 401K</span>
              </div>
              <div className="info-item">
                <span className="info-label">Hình thức</span>
                <span className="info-value">Toàn thời gian</span>
              </div>
            </div>

            <div className="company-logo-large">
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google" />
            </div>

            <div className="section">
              <h2 className="section-title">Giới thiệu về công ty và vị trí</h2>
              <p className="section-content">
                Một công ty phần mềm lâu đời đang tái thiết kế các sản phẩm của mình và nỗ lực phát triển phần mềm để luôn dẫn đầu thị trường. Họ cung cấp các hệ thống HRIS chất lượng cao tại cả Úc và Hoa Kỳ.
              </p>
              <p className="section-content" style={{ marginTop: '15px' }}>
                Việc tái thiết kế và tầm nhìn mới thú vị này đã tạo ra nhu cầu tuyển dụng một UI/UX Designer mới để hỗ trợ cải thiện và thiết kế trải nghiệm Front-end tư duy tiến bộ cho người dùng.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">Mô tả công việc và trách nhiệm</h2>
              <p className="section-content">
                Với tư cách là UI/UX Designer, bạn sẽ đóng vai trò là người chuyển ngữ sáng tạo và người dùng cho phần còn lại của nhóm. Bạn sẽ cộng tác và làm việc chặt chẽ với Giám đốc sản phẩm, đội ngũ phát triển và khách hàng để đảm bảo front-end luôn dễ sử dụng và dẫn đầu xu hướng.
              </p>
              <p className="section-content" style={{ marginTop: '15px' }}>
                Với tư cách là trưởng nhóm UX, bạn sẽ được yêu cầu thuyết trình trước cả các bên liên quan nội bộ và bên ngoài, để đảm bảo tất cả các khái niệm, thiết kế và thay đổi được trình bày rõ ràng. Việc nghiên cứu phải được hoàn thành kỹ lưỡng, tận dụng kiến thức và thông tin chi tiết về khách hàng cũng như xu hướng thị trường.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">Yêu cầu kỹ năng và kinh nghiệm</h2>
              <ul className="skills-list">
                <li>Phải có kiến thức vững chắc về các framework hiện đại</li>
                <li>Phải có năng lực thiết kế đã được chứng minh (Portfolio)</li>
                <li>Là người trình bày và diễn giải lôi cuốn, có năng lực</li>
                <li>Có tinh thần đồng đội và khả năng làm việc đa nhiệm</li>
                <li>Ưu tiên ứng viên từng làm việc với Khách hàng Chính phủ và Giáo dục</li>
                <li>Bắt buộc có kinh nghiệm về Road mapping</li>
              </ul>
            </div>

            <div className="section">
              <p className="section-content">
                Tất cả những điều trên là rất quan trọng để bạn thành công trong vai trò này, tuy nhiên chúng tôi đang tìm kiếm một người có năng lượng và đam mê để có thể kết hợp những ý tưởng mới và phát triển đội ngũ.
              </p>
            </div>

            <button className="apply-btn">Ứng Tuyển Ngay</button>

            {/* PHẦN CHIA SẺ VỚI NÚT ICON ĐÃ SỬA */}
            <div className="section" style={{ textAlign: 'center', marginTop: '40px' }}>
              <h3 className="section-title">Chia sẻ công việc này</h3>
              <div className="social-share">
                {/* Facebook */}
                <button className="social-btn facebook" onClick={() => handleShare('Facebook')} title="Chia sẻ lên Facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                
                {/* Messenger - Thêm class 'messenger' */}
                <button className="social-btn messenger" onClick={() => handleShare('Messenger')} title="Gửi qua Messenger">
                  <i className="fab fa-facebook-messenger"></i>
                </button>

                {/* Copy Link - Thêm class 'link' */}
                <button className="social-btn link" onClick={() => handleShare('Tin nhắn')} title="Sao chép liên kết">
                  <i className="fas fa-link"></i>
                </button>

                {/* Twitter */}
                <button className="social-btn twitter" onClick={() => handleShare('Twitter')} title="Chia sẻ lên Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="card cta-card">
              <h3 className="card-title">Tìm việc dễ dàng hơn!</h3>
              <p className="cta-subtitle">Tham gia GoJobs ngay</p>
              <p style={{ marginBottom: '20px', opacity: 0.9 }}>Gửi CV cho chúng tôi và chúng tôi sẽ chủ động tìm kiếm cơ hội cho bạn</p>
              <button className="submit-cv-btn">GỬI CV CỦA BẠN</button>
            </div>
            <div className="card">
              <h3 className="card-title">Nhận thông báo việc làm</h3>
              <input type="email" className="email-input" placeholder="Nhập địa chỉ email của bạn" />
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '15px' }}>
                Bằng cách nhấp vào nút bên dưới, tôi đồng ý với Điều khoản sử dụng của GoJobs và xác nhận rằng tôi đã đọc Chính sách bảo mật.
              </p>
              <button className="subscribe-btn">ĐĂNG KÝ</button>
            </div>
            <div className="card">
              <h3 className="card-title">Việc làm gần đây</h3>
              <ul className="recent-jobs">
                <li>
                  <div className="job-item-title">UI/UX Designer</div>
                  <div className="job-item-company">tại Cty Vận tải & Chuyển phát nhanh</div>
                </li>
                <li>
                  <div className="job-item-title">Node.js Developer</div>
                  <div className="job-item-company">tại Cty Vận tải & Chuyển phát nhanh</div>
                </li>
                <li>
                  <div className="job-item-title">Android Developer</div>
                  <div className="job-item-company">tại Cty Vận tải & Chuyển phát nhanh</div>
                </li>
                <li>
                  <div className="job-item-title">Backend Developer (Java/PHP)</div>
                  <div className="job-item-company">tại Cty Giải pháp Kỹ thuật số</div>
                </li>
                <li>
                  <div className="job-item-title">Front-end Developer</div>
                  <div className="job-item-company">tại Cty Giải pháp Kỹ thuật số</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="job-detail-footer">
          <div className="footer-section">
            <h3 className="job-detail-logo">GoJobs</h3>
            <p>Mục đích tồn tại của chúng tôi là giúp các công ty công nghệ tuyển dụng nhân tài IT trên toàn thế giới, đặc biệt là các lập trình viên.</p>
            <button className="ask-btn">ĐẶT CÂU HỎI</button>
          </div>
          <div className="footer-section">
            <h3>THÔNG TIN</h3>
            <a href="#">Hỗ trợ</a>
            <a href="#">Nhà phát triển</a>
            <a href="#">Dịch vụ</a>
            <a href="#">Bắt đầu</a>
          </div>
          <div className="footer-section">
            <h3>CÔNG TY</h3>
            <a href="#">Thông cáo báo chí</a>
            <a href="#">Sứ mệnh</a>
            <a href="#">Chiến lược</a>
            <a href="#">Dự án</a>
          </div>
          <div className="footer-section">
            <h3>LIÊN HỆ</h3>
            <p>Đừng ngần ngại liên hệ với chúng tôi qua điện thoại hoặc gửi tin nhắn</p>
            <p>+84 800 123-2345</p>
            <p>help@gojobs.com</p>
            
            <div className="social-share">
              {/* Facebook */}
              <button className="social-btn facebook"><i className="fab fa-facebook-f"></i></button>
              {/* Google */}
              <button className="social-btn google"><i className="fab fa-google"></i></button>
              {/* LinkedIn */}
              <button className="social-btn linkedin"><i className="fab fa-linkedin-in"></i></button>
              {/* Youtube - Thêm class 'youtube' */}
              <button className="social-btn youtube"><i className="fab fa-youtube"></i></button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default JobDetailPage;