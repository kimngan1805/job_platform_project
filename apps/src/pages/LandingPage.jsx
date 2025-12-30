import React, { useEffect, useState } from 'react';
import '../css/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  // State quản lý nút bấm gửi email (Cho phần JobHub)
  const [btnText, setBtnText] = useState('Bắt đầu ngay');
  const [btnStyle, setBtnStyle] = useState({});

  // Xử lý submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    setBtnText('✓ Đã gửi!');
    setBtnStyle({ background: '#5cd65c' });

    setTimeout(() => {
      setBtnText('Bắt đầu ngay');
      setBtnStyle({});
      event.target.reset();
    }, 2000);
  };

  useEffect(() => {
    // Hàm xử lý di chuột (Parallax) cho cả 2 phần
    const handleMouseMove = (e) => {
      // Logic cho phần JobHub cards
      const cards = document.querySelectorAll('.dashboard-card');
      const floatingIcons = document.querySelectorAll('.floating-icon-job');
      
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      cards.forEach((card, index) => {
        const speed = (index + 1) * 3;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
      });

      floatingIcons.forEach((icon, index) => {
        const speed = (index + 1) * 2;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        icon.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    // Animation khi cuộn trang (cho Feature cards)
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease-out';
      observer.observe(card);
    });

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="landing-container">
      {/* =========================================
          PHẦN 1: WHITEAPCE HERO (MÀU XANH CŨ - GIỮ NGUYÊN)
         ========================================= */}
      <div className="hero">
        <nav>
          <div className="logo">
            <div className="logo-icon"></div>
            <span>whitepace</span>
          </div>
          <ul className="nav-links">
            <li><a href="#">Products ▾</a></li>
            <li><a href="#">Solutions ▾</a></li>
            <li><a href="#">Resources ▾</a></li>
            <li><a href="#">Pricing ▾</a></li>
          </ul>
          <div className="nav-buttons">
            <button 
                className="btn btn-login" 
                onClick={() => navigate('/login')}
            >
                Login
            </button>
            <button className="btn btn-primary">Try Whitepace free →</button>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <h1>Get More Done with whitepace</h1>
            <p>Project management software that enables your teams to collaborate, plan, analyze and manage everyday tasks</p>
            <button className="btn btn-primary">Try Whitepace free →</button>
          </div>
          
          <div className="hero-illustration">
            <div className="dashboard">
              <div className="dashboard-header"></div>
              <div className="dashboard-content">
                <div className="chart-line"></div>
                <div className="chart-pie"></div>
                <div className="chart-small"></div>
                <div className="chart-bar"></div>
              </div>
            </div>
            
            <div className="character character-left">
              <div className="chat-bubble bubble-left"></div>
              <div className="person-old">
                <div className="person-head"></div>
                <div className="person-body">
                  <div className="person-arm left"></div>
                  <div className="person-arm right"></div>
                </div>
                <div className="person-legs">
                  <div className="leg"></div>
                  <div className="leg"></div>
                </div>
              </div>
            </div>
            
            <div className="character character-right">
              <div className="chat-bubble bubble-right"></div>
              <div className="person-old">
                <div className="person-head"></div>
                <div className="person-body">
                  <div className="person-arm left"></div>
                  <div className="person-arm right"></div>
                </div>
                <div className="person-legs">
                  <div className="leg"></div>
                  <div className="leg"></div>
                </div>
              </div>
            </div>
            
            <div className="dots">
              <div className="dot-white"></div>
              <div className="dot-white"></div>
              <div className="dot-white"></div>
              <div className="dot-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          PHẦN 2: JOBHUB HERO (MỚI - THAY THẾ PHẦN CŨ)
         ========================================= */}
      
      {/* Decorative Dots for JobHub */}
      <div style={{position: 'relative'}}>
          <div className="job-dot job-dot-1"></div>
          <div className="job-dot job-dot-2"></div>
          <div className="job-dot job-dot-3"></div>
      </div>
      
      <section className="jobhub-section">
        <div className="jobhub-content">
            <h1>
                <span className="highlight">Tìm việc</span><br />
                mơ ước
            </h1>
            <p className="tagline">
                Nền tảng tuyển dụng hiện đại giúp bạn kết nối với hàng nghìn cơ hội việc làm từ các công ty hàng đầu. Tìm kiếm, ứng tuyển và phát triển sự nghiệp của bạn ngay hôm nay.
            </p>
            <form className="email-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="email-input"
                    placeholder="Nhập email của bạn"
                    required
                />
                <button type="submit" className="btn-jobhub" style={btnStyle}>
                    {btnText}
                </button>
            </form>
        </div>
        <div className="jobhub-illustration">
            <div className="illustration-container">
                {/* Dashboard Cards */}
                <div className="dashboard-card card-1">
                    <div className="card-icon">💼</div>
                    <div className="card-title">Frontend Developer</div>
                    <div className="card-date">
                        <div className="card-avatar"></div>
                        <span>15 Th12</span>
                        <div className="status-dot"></div>
                    </div>
                </div>
                <div className="dashboard-card card-2">
                    <div className="card-icon">🎨</div>
                    <div className="card-title">UI/UX Designer</div>
                    <div className="card-date">
                        <div className="card-avatar"></div>
                        <span>20 Th12</span>
                        <div className="status-dot"></div>
                    </div>
                </div>
                <div className="dashboard-card card-3">
                    <div className="card-icon">⚙️</div>
                    <div className="card-title">Backend Engineer</div>
                    <div className="card-date">
                        <div className="card-avatar"></div>
                        <span>22 Th12</span>
                        <div className="status-dot"></div>
                    </div>
                </div>
                {/* Person Working */}
                <div className="person-working">
                    <div className="chair">
                        <div className="person-head-job">
                            <div className="person-hair-job"></div>
                        </div>
                        <div className="person-body-job">
                            <div className="person-arm-left"></div>
                            <div className="person-arm-right"></div>
                        </div>
                        <div className="person-legs-job">
                            <div>
                                <div className="leg-job"></div>
                                <div className="shoe"></div>
                            </div>
                            <div>
                                <div className="leg-job"></div>
                                <div className="shoe"></div>
                            </div>
                        </div>
                    </div>
                    <div className="laptop"></div>
                </div>
                {/* Floating Icons */}
                <div className="floating-icon-job icon-chart-job"></div>
                <div className="floating-icon-job icon-rocket-job">🚀</div>
                <div className="floating-icon-job icon-cursor-job">👆</div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Tìm việc phù hợp</h3>
            <p className="feature-description">
                Hệ thống AI thông minh giúp bạn tìm được công việc phù hợp nhất với kỹ năng và kinh nghiệm của bạn.
            </p>
        </div>
        <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3 className="feature-title">Phát triển sự nghiệp</h3>
            <p className="feature-description">
                Truy cập các khóa học, tài liệu và lời khuyên từ chuyên gia để phát triển kỹ năng và thăng tiến.
            </p>
        </div>
        <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Kết nối doanh nghiệp</h3>
            <p className="feature-description">
                Kết nối trực tiếp với các nhà tuyển dụng hàng đầu. Tham gia sự kiện networking và phỏng vấn online.
            </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;