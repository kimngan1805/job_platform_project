import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const CandidateOnboardingPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [skills, setSkills] = useState([]);
    const [salary, setSalary] = useState({ min: 10000000, max: 30000000 });

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    // Xử lý thêm kỹ năng bằng phím Enter
    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.target.value.trim();
            if (val && !skills.includes(val)) {
                setSkills([...skills, val]);
                e.target.value = '';
            }
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmit = () => {
        // Gửi API lưu thông tin ở đây
        alert("🎉 Cập nhật hồ sơ thành công! Đang chuyển đến trang việc làm...");
        navigate('/find-jobs'); // Chuyển về trang tìm việc
    };

    return (
        <div className="onboarding-body">
            <div className="onboarding-container">
                {/* Cột trái: Hình minh họa */}
                <div className="form-illustration">
                    <div className="illustration-placeholder">💼</div>
                    <h3>Tìm công việc mơ ước</h3>
                    <p>Hãy cho chúng tôi biết bạn đang tìm kiếm điều gì để nhận được những gợi ý việc làm chính xác nhất.</p>
                </div>

                {/* Cột phải: Form */}
                <div className="form-content">
                    {/* Progress Bar */}
                    <div className="onboarding-progress-bar">
                        <div className="onboarding-progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

                        <div className={`onboarding-progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            <div className="onboarding-progress-circle">1</div>
                            <div className="onboarding-progress-label">Định hướng</div>
                        </div>

                        <div className={`onboarding-progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                            <div className="onboarding-progress-circle">2</div>
                            <div className="onboarding-progress-label">Nhu cầu</div>
                        </div>

                        <div className={`onboarding-progress-step ${step >= 3 ? 'active' : ''}`}>
                            <div className="onboarding-progress-circle">3</div>
                            <div className="onboarding-progress-label">Kỹ năng</div>
                        </div>
                    </div>

                    {/* STEP 1: Định hướng */}
                    {step === 1 && (
                        <div className="form-step active">
                            <h3 className="form-title">Bước 1: Định hướng nghề nghiệp</h3>
                            <div className="form-group">
                                <label className="form-label">Vị trí mong muốn *</label>
                                <input className="form-input" type="text" placeholder="Ví dụ: Frontend Developer" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Cấp bậc hiện tại *</label>
                                <select className="form-select">
                                    <option>Intern / Thực tập sinh</option>
                                    <option>Fresher / Mới ra trường</option>
                                    <option>Junior</option>
                                    <option>Middle</option>
                                    <option>Senior</option>
                                    <option>Lead / Manager</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Ngành nghề quan tâm</label>
                                <div className="checkbox-grid">
                                    <label className="checkbox-item"><input type="checkbox" /> IT - Phần mềm</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Marketing / PR</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Kinh doanh / Sale</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Thiết kế / Sáng tạo</label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Nhu cầu */}
                    {step === 2 && (
                        <div className="form-step active">
                            <h3 className="form-title">Bước 2: Nhu cầu & Mong muốn</h3>
                            <div className="form-group">
                                <label className="form-label">Địa điểm làm việc mong muốn</label>
                                <select className="form-select">
                                    <option>Hồ Chí Minh</option>
                                    <option>Hà Nội</option>
                                    <option>Đà Nẵng</option>
                                    <option>Remote (Làm từ xa)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Mức lương mong muốn (VNĐ)</label>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold', color: '#667eea' }}>
                                    <span>{salary.min.toLocaleString()}</span>
                                    <span>{salary.max.toLocaleString()}</span>
                                </div>
                                <input type="range" min="5000000" max="100000000" step="1000000" value={salary.max} onChange={(e) => setSalary({ ...salary, max: parseInt(e.target.value) })} style={{ width: '100%' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hình thức làm việc</label>
                                <div className="checkbox-grid">
                                    <label className="checkbox-item"><input type="checkbox" defaultChecked /> Full-time</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Part-time</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Freelance</label>
                                    <label className="checkbox-item"><input type="checkbox" /> Remote</label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Kỹ năng */}
                    {step === 3 && (
                        <div className="form-step active">
                            <h3 className="form-title">Bước 3: Kỹ năng chuyên môn</h3>
                            <div className="form-group">
                                <label className="form-label">Kỹ năng chính (Nhập và nhấn Enter)</label>
                                <div className="tag-container" onClick={() => document.getElementById('skillInput').focus()}>
                                    {skills.map(skill => (
                                        <span key={skill} className="tag-item">
                                            {skill} <span className="tag-remove" onClick={() => removeSkill(skill)}>×</span>
                                        </span>
                                    ))}
                                    <input id="skillInput" className="tag-input-field" placeholder="Nhập kỹ năng..." onKeyDown={handleSkillKeyDown} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Upload CV (Tùy chọn)</label>
                                <div className="file-upload-box">
                                    <span className="upload-icon">📄</span>
                                    <p>Kéo thả CV hoặc click để chọn file</p>
                                    <small style={{ color: '#999' }}>Hỗ trợ: PDF, DOC, DOCX (Max 5MB)</small>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="form-actions">
                        {step > 1 ? (
                            <button className="btn-back" onClick={handleBack}>Quay lại</button>
                        ) : (
                            <div></div> /* Placeholder */
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

export default CandidateOnboardingPage;