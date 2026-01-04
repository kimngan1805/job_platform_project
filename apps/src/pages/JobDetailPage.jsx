// src/pages/JobDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Heart, Share2, MapPin, DollarSign, Briefcase, Clock, Users, Building2, 
  ExternalLink, ChevronRight, Sparkles, CheckCircle2,
  // --- THÊM ICON MỚI ---
  Upload, X, FileText, AlertCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../css/JobDetailPage.css';

const JobDetailPage = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  
  // --- STATE CHECK ROLE USER ---
  const [userRole, setUserRole] = useState('');

  // --- STATE QUẢN LÝ MODAL & FORM ---
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [applyForm, setApplyForm] = useState({
      fullName: 'Ngân Kim', // Tự điền nếu đã login
      email: 'ngankim@example.com',
      phone: '',
      coverLetter: '',
      cvFile: null
  });

  useEffect(() => {
    const savedData = localStorage.getItem('user_data');
    if (savedData) {
        const user = JSON.parse(savedData);
        setUserRole(user.role);
    }
  }, []);

  // --- LOGIC KÉO THẢ FILE ---
  const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
      } else if (e.type === "dragleave") {
          setDragActive(false);
      }
  };

  const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          setApplyForm({ ...applyForm, cvFile: e.dataTransfer.files[0] });
      }
  };

  const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
          setApplyForm({ ...applyForm, cvFile: e.target.files[0] });
      }
  };

  // --- MỞ MODAL ---
  const handleApplyClick = () => {
    if (userRole === 'recruiter') return; // Chặn HR
    setShowApplyModal(true);
  };

  // --- NỘP HỒ SƠ ---
  const handleSubmitApplication = (e) => {
      e.preventDefault();
      if (!applyForm.phone || !applyForm.cvFile) {
          alert("Vui lòng nhập số điện thoại và tải lên CV!");
          return;
      }
      // Giả lập API
      setTimeout(() => {
          setShowApplyModal(false);
          alert("🎉 Nộp hồ sơ thành công! Nhà tuyển dụng sẽ sớm liên hệ.");
      }, 800);
  };

  const handleShare = (platform) => {
    alert(`Chia sẻ qua ${platform}`);
  };

  return (
    <div className="job-detail-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section" onClick={() => navigate('/dashboard')}>
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Finder.</span>
          </div>
          
          <nav className="nav-menu">
            <a onClick={() => navigate('/find-jobs')} className="nav-link" style={{cursor: 'pointer'}}>Tìm Việc</a>
            <a href="#" className="nav-link">Hồ Sơ & CV</a>
            <a onClick={() => navigate('/recruiter')} className="nav-link" style={{cursor: 'pointer'}}>Nhà Tuyển Dụng</a>
            <a href="#" className="nav-link">Công Cụ</a>
          </nav>

          <div className="user-profile">
            <span className="user-name">
                {userRole === 'recruiter' ? 'HR Manager' : 'Ngân Kim'}
            </span>
            <div className="user-avatar">
                {userRole === 'recruiter' ? 'HR' : 'NK'}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="breadcrumb-list">
          <span className="breadcrumb-item" onClick={() => navigate('/dashboard')}>Trang chủ</span>
          <ChevronRight size={16} />
          <span className="breadcrumb-item" onClick={() => navigate('/find-jobs')}>Tìm việc làm</span>
          <ChevronRight size={16} />
          <span className="breadcrumb-active">UI/UX Designer</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-wrapper">
        <div className="content-grid">
          
          {/* Left Column */}
          <div className="left-column space-y-6">
            
            {/* Job Header Card */}
            <div className="card job-header-card">
              <div className="header-decoration"></div>
              
              <div className="header-content-relative">
                <div className="header-top-row">
                  <div style={{flex: 1}}>
                    <h1 className="job-title">Senior UI/UX Designer</h1>
                    <div className="job-meta-row">
                      <div className="meta-item">
                        <Building2 size={18} className="text-blue-600" />
                        <span className="company-name">Google Inc.</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={18} className="text-purple-600" />
                        <span>Mountain View, CA</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={18} className="text-green-600" />
                        <span>Cập nhật 1 giờ trước</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`save-button ${isSaved ? 'saved' : ''}`}
                  >
                    <Heart size={24} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                  <div className="stat-card stat-blue">
                    <div className="stat-content">
                      <div className="stat-icon-wrapper bg-blue-600">
                        <DollarSign size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="stat-label text-blue-700">Mức lương</p>
                        <p className="stat-value text-blue-900">$2,000 - $3,500</p>
                      </div>
                    </div>
                  </div>
                  <div className="stat-card stat-purple">
                    <div className="stat-content">
                      <div className="stat-icon-wrapper bg-purple-600">
                        <MapPin size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="stat-label text-purple-700">Địa điểm</p>
                        <p className="stat-value text-purple-900">Hồ Chí Minh</p>
                      </div>
                    </div>
                  </div>
                  <div className="stat-card stat-pink">
                    <div className="stat-content">
                      <div className="stat-icon-wrapper bg-pink-600">
                        <Briefcase size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="stat-label text-pink-700">Kinh nghiệm</p>
                        <p className="stat-value text-pink-900">3 - 5 Năm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="card">
              <div className="section-heading-container">
                <div className="section-indicator indicator-blue-purple"></div>
                <h2 className="section-title">Mô tả công việc</h2>
              </div>
              <div className="section-text">
                <p>- Chịu trách nhiệm thiết kế giao diện (UI) và trải nghiệm người dùng (UX) cho các sản phẩm Web/App của công ty.</p>
                <p>- Nghiên cứu, phân tích hành vi người dùng, xây dựng User Flow, Wireframe, Prototype.</p>
                <p>- Phối hợp chặt chẽ với team Product và Developer để đảm bảo tính khả thi và chất lượng thiết kế.</p>
                <p>- Cập nhật các xu hướng thiết kế mới nhất để áp dụng vào sản phẩm.</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="card">
              <div className="section-heading-container">
                <div className="section-indicator indicator-purple-pink"></div>
                <h2 className="section-title">Yêu cầu ứng viên</h2>
              </div>
              <div className="section-text">
                <p>- Có ít nhất 3 năm kinh nghiệm ở vị trí tương đương.</p>
                <p>- Thành thạo Figma (Auto Layout, Component, Variant), Adobe Creative Suite.</p>
                <p>- Có tư duy thẩm mỹ tốt, hiểu biết sâu sắc về Layout, Typography, Color.</p>
                <p>- Có Portfolio thể hiện các dự án thực tế đã làm.</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="card benefits-card">
              <div className="section-heading-container">
                <Sparkles className="text-green-600" size={28} />
                <h2 className="section-title">Quyền lợi</h2>
              </div>
              <div className="benefits-grid">
                {[
                  'Lương tháng 13 + Thưởng dự án',
                  'MacBook Pro M2 Pro cấp mới',
                  'Review lương 2 lần/năm',
                  'Bảo hiểm sức khỏe Premium',
                  'Company Trip hàng năm'
                ].map((benefit, idx) => (
                  <div key={idx} className="benefit-item">
                    <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="card">
              <div className="section-heading-container">
                <div className="section-indicator indicator-pink-orange"></div>
                <h2 className="section-title">Kỹ năng chuyên môn</h2>
              </div>
              <div className="skills-container">
                {['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'English'].map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="card">
              <h3 className="share-title">Chia sẻ công việc này</h3>
              <div className="share-buttons-container">
                <button onClick={() => handleShare('Facebook')} className="share-btn bg-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button onClick={() => handleShare('Messenger')} className="share-btn" style={{background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)'}}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.733 8l3.13 3.259L19.752 8l-6.559 6.963z"/>
                  </svg>
                </button>
                <button onClick={() => handleShare('Link')} className="share-btn bg-gray-800">
                  <Share2 size={24} />
                </button>
                <button onClick={() => handleShare('Twitter')} className="share-btn bg-sky-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="sidebar-column space-y-6">
            
            {/* Company Card */}
            <div className="card company-card-sticky">
              <div className="text-center mb-6">
                <div className="company-logo-container">
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Google Inc.</h3>
                <a href="#" className="company-link-wrapper">
                  Xem trang công ty <ExternalLink size={14} />
                </a>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#4b5563', marginBottom: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <Users size={18} className="text-blue-600" />
                  <span>Quy mô: 10,000+ nhân viên</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <MapPin size={18} className="text-purple-600" />
                  <span>Trụ sở: Mountain View, CA</span>
                </div>
              </div>

              {/* CTA Section */}
              <div className="cta-container">
                <div className="deadline-badge">
                  ⏳ Hạn nộp: 30/01/2026
                </div>
                <h3 className="text-2xl font-bold mb-2">Ứng tuyển ngay</h3>
                <p className="text-sm opacity-90 mb-6">
                  Đừng bỏ lỡ cơ hội làm việc tại môi trường chuyên nghiệp.
                </p>
                
                {/* --- NÚT ỨNG TUYỂN ĐÃ GẮN SỰ KIỆN MỞ POPUP --- */}
                <button 
                  className="apply-button" 
                  onClick={handleApplyClick}
                  disabled={userRole === 'recruiter'}
                  style={userRole === 'recruiter' ? { 
                    background: '#e5e7eb', 
                    color: '#9ca3af', 
                    cursor: 'not-allowed',
                    border: '1px solid #d1d5db',
                    boxShadow: 'none'
                  } : {}}
                >
                  {userRole === 'recruiter' ? 'TÀI KHOẢN HR KHÔNG THỂ ỨNG TUYỂN' : 'NỘP HỒ SƠ NGAY'}
                </button>
                
                <button className="save-job-sidebar-btn">
                  <Heart size={18} />
                  Lưu tin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Finder. Nền tảng tuyển dụng uy tín hàng đầu.</p>
        </div>
      </footer>

      {/* --- MODAL (POPUP) NỘP HỒ SƠ --- */}
      {showApplyModal && (
        <div className="modal-overlay">
          <div className="apply-modal">
            <div className="modal-header">
              <h3>Ứng tuyển: Senior UI/UX Designer</h3>
              <button className="close-modal-btn" onClick={() => setShowApplyModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={handleSubmitApplication}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Họ và tên *</label>
                    <input type="text" value={applyForm.fullName} readOnly className="modal-input readonly" />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" value={applyForm.email} readOnly className="modal-input readonly" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Số điện thoại *</label>
                  <input 
                    type="text" 
                    placeholder="Nhập số điện thoại liên hệ" 
                    className="modal-input" 
                    value={applyForm.phone}
                    onChange={(e) => setApplyForm({...applyForm, phone: e.target.value})}
                    required
                  />
                </div>

                {/* KHU VỰC DRAG & DROP */}
                <div className="form-group">
                  <label>Hồ sơ đính kèm (CV/Portfolio) *</label>
                  <div 
                    className={`drag-drop-area ${dragActive ? 'active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('cv-upload').click()}
                  >
                    <input 
                      type="file" 
                      id="cv-upload" 
                      hidden 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                    />
                    
                    {applyForm.cvFile ? (
                        <div className="file-selected">
                            <FileText size={40} className="text-blue-600" />
                            <div className="file-info">
                                <p className="file-name">{applyForm.cvFile.name}</p>
                                <p className="file-size">{(applyForm.cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button type="button" className="remove-file" onClick={(e) => { e.stopPropagation(); setApplyForm({...applyForm, cvFile: null}); }}>
                                Thay đổi
                            </button>
                        </div>
                    ) : (
                        <div className="upload-placeholder">
                            <Upload size={40} className="text-gray-400 mb-2" />
                            <p>Kéo thả CV của bạn vào đây</p>
                            <span>hoặc nhấn để tải lên từ máy tính</span>
                        </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Thư giới thiệu (Cover Letter)</label>
                  <textarea 
                    className="modal-textarea" 
                    placeholder="Viết đôi lời giới thiệu về bản thân và lý do bạn phù hợp..."
                    rows="3"
                  ></textarea>
                </div>

                {/* GHI CHÚ QUAN TRỌNG */}
                <div className="important-note">
                  <div className="note-title"><AlertCircle size={18} /> Lưu ý quan trọng:</div>
                  <ul>
                    <li>Hồ sơ bắt buộc bao gồm CV (định dạng PDF là tốt nhất).</li>
                    <li>Nên đính kèm Portfolio đối với vị trí Design.</li>
                    <li>Dung lượng file không quá 5MB.</li>
                    <li>Kiểm tra kỹ số điện thoại để HR có thể liên hệ.</li>
                  </ul>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowApplyModal(false)}>Hủy bỏ</button>
                  <button type="submit" className="btn-submit-apply">Nộp hồ sơ ứng tuyển</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default JobDetailPage;