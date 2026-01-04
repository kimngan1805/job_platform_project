import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const RecruiterOnboardingPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = () => {
        // Gửi API đăng ký doanh nghiệp ở đây
        alert("🏢 Đăng ký doanh nghiệp thành công! Hồ sơ của bạn đang được hệ thống AI thẩm định.");
        navigate('/recruiter'); // Chuyển về Dashboard nhà tuyển dụng
    };

    return (
        <div className="onboarding-body">
            <div className="onboarding-container">
                {/* Cột trái */}
                <div className="form-illustration">
                    <div className="illustration-placeholder">🤝</div>
                    <h3>Tìm kiếm nhân tài</h3>
                    <p>Đăng ký tài khoản doanh nghiệp để tiếp cận hàng ngàn ứng viên chất lượng cao và đăng tin tuyển dụng miễn phí.</p>
                </div>

                {/* Cột phải */}
                <div className="form-content">
                    {/* Progress Bar */}
                    <div className="onboarding-progress-bar">
                        <div className="onboarding-progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

                        <div className={`onboarding-progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            <div className="onboarding-progress-circle">1</div>
                            <div className="onboarding-progress-label">Xác thực</div>
                        </div>

                        <div className={`onboarding-progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                            <div className="onboarding-progress-circle">2</div>
                            <div className="onboarding-progress-label">Hiện diện</div>
                        </div>

                        <div className={`onboarding-progress-step ${step >= 3 ? 'active' : ''}`}>
                            <div className="onboarding-progress-circle">3</div>
                            <div className="onboarding-progress-label">Văn hóa</div>
                        </div>
                    </div>

                    {/* STEP 1: Xác thực */}
                    {step === 1 && (
                        <div className="form-step active">
                            <h3 className="form-title">Bước 1: Xác thực Danh tính</h3>
                            <div className="form-group">
                                <label className="form-label">Tên pháp lý Công ty *</label>
                                <input className="form-input" type="text" placeholder="Nhập tên theo giấy phép KD..." />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Mã số thuế *</label>
                                <input className="form-input" type="number" placeholder="Nhập mã số thuế..." />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Giấy phép kinh doanh (Bắt buộc) *</label>
                                <div className="file-upload-box">
                                    <span className="upload-icon">📋</span>
                                    <p>Tải lên bản Scan/PDF GPKD</p>
                                    <small style={{ color: '#999' }}>AI sẽ tự động kiểm tra thông tin</small>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Hiện diện */}
                    {step === 2 && (
                        <div className="form-step active">
                            <h3 className="form-title">Bước 2: Hiện diện & Quy mô</h3>
                            <div className="form-group">
                                <label className="form-label">Website công ty</label>
                                <input className="form-input" type="url" placeholder="https://www.company.com" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Quy mô nhân sự</label>
                                <select className="form-select">
                                    <option>10-50 nhân viên</option>
                                    <option>50-100 nhân viên</option>
                                    <option>100-500 nhân viên</option>
                                    <option>Trên 500 nhân viên</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Địa chỉ trụ sở chính</label>
                                <input className="form-input" type="text" placeholder="Số nhà, tên đường, quận/huyện, thành phố..." />
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Văn hóa */}
                    {step === 3 && (
                        <div className="form-step active">
                            <h3 className="form-title">Bước 3: Văn hóa & Phúc lợi</h3>
                            <div className="form-group">
                                <label className="form-label">Giới thiệu công ty</label>
                                <textarea className="form-textarea" placeholder="Mô tả ngắn gọn về sứ mệnh, tầm nhìn và môi trường làm việc..."></textarea>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phúc lợi nổi bật</label>
                                <div className="checkbox-grid">
                                    <label className="checkbox-item"><input type="checkbox" /> Lương tháng 13</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Bảo hiểm VIP</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Du lịch hàng năm</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Review lương 2 lần</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Laptop / Macbook</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Hybrid Working</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Ảnh văn phòng / Team</label>
                                <div className="file-upload-box">
                                    <span className="upload-icon">📸</span>
                                    <p>Tải lên ảnh văn phòng thực tế</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="form-actions">
                        {step > 1 ? (
                            <button className="btn-back" onClick={handleBack}>Quay lại</button>
                        ) : (
                            <div></div>
                        )}

                        {step < 3 ? (
                            <button className="btn-next" onClick={handleNext}>Tiếp tục</button>
                        ) : (
                            <button className="btn-next" onClick={handleSubmit}>Hoàn thành</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterOnboardingPage;