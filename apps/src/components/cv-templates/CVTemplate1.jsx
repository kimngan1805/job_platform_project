import React from 'react';

// Component con để gõ chữ trực tiếp (Nhúng vào trong file luôn cho gọn)
const EditableText = ({ value, onChange, className, style, placeholder }) => {
    return (
        <div
            contentEditable
            suppressContentEditableWarning={true}
            className={className}
            style={{ 
                cursor: 'text', outline: 'none', minWidth: '20px', minHeight: '1em', whiteSpace: 'pre-wrap', 
                ...style 
            }}
            onBlur={(e) => onChange && onChange(e.currentTarget.innerText)}
        >
            {value || placeholder}
        </div>
    );
};

const CVTemplate1 = ({ data, onUpdate }) => {
    // Hàm update dữ liệu ngược về trang cha
    const update = (key, val) => {
        if (onUpdate) onUpdate(key, val);
    };

    const t = data || {};

    return (
        <div 
            className="cv-a4-page shadow-2xl bg-white flex" 
            style={{ width: '800px', height: '1131px', margin: '0 auto', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* --- CỘT TRÁI (SIDEBAR) --- */}
            <div style={{ width: '35%', backgroundColor: '#1B2B41', color: 'white', padding: '40px 25px', display: 'flex', flexDirection: 'column' }}>
                
                {/* Avatar */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                    <div style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: '#D9D9D9', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', overflow: 'hidden' }}>
                        <span style={{fontSize: '12px'}}>PHOTO</span>
                        {/* Nếu có ảnh thật thì hiện ở đây: <img src={t.avatar} ... /> */}
                    </div>
                </div>

                {/* LIÊN LẠC */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ borderBottom: '1px solid white', paddingBottom: '10px', marginBottom: '15px', letterSpacing: '2px', fontSize: '16px', fontWeight: 'bold' }}>LIÊN LẠC</h3>
                    <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <EditableText value={t.phone} onChange={(v) => update('phone', v)} placeholder="+84..." />
                        <EditableText value={t.email} onChange={(v) => update('email', v)} placeholder="email@..." />
                        <EditableText value={t.address} onChange={(v) => update('address', v)} placeholder="Địa chỉ..." />
                        <EditableText value={t.dob} onChange={(v) => update('dob', v)} placeholder="Ngày sinh..." />
                    </div>
                </div>

                {/* HỌC VẤN */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ borderBottom: '1px solid white', paddingBottom: '10px', marginBottom: '15px', letterSpacing: '2px', fontSize: '16px', fontWeight: 'bold' }}>HỌC VẤN</h3>
                    <div style={{ fontSize: '13px' }}>
                        <EditableText value={t.education?.year} onChange={(v) => update('education.year', v)} style={{ color: '#BBB', fontStyle: 'italic', marginBottom: '5px' }} placeholder="Năm học" />
                        <EditableText value={t.education?.school} onChange={(v) => update('education.school', v)} style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '14px' }} placeholder="Trường..." />
                        <EditableText value={t.education?.university} onChange={(v) => update('education.university', v)} style={{ fontWeight: 'bold', marginBottom: '3px' }} placeholder="Đại học..." />
                        <EditableText value={t.education?.degree} onChange={(v) => update('education.degree', v)} placeholder="Bằng cấp..." />
                    </div>
                </div>

                {/* TIN HỌC */}
                <div>
                    <h3 style={{ borderBottom: '1px solid white', paddingBottom: '10px', marginBottom: '15px', letterSpacing: '2px', fontSize: '16px', fontWeight: 'bold' }}>TIN HỌC</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <EditableText value="• Microsoft Word" />
                        <EditableText value="4 ★" />
                    </div>
                </div>
            </div>

            {/* --- CỘT PHẢI (NỘI DUNG) --- */}
            <div style={{ width: '65%', padding: '60px 40px', color: '#333' }}>
                
                {/* Header Tên */}
                <div style={{ marginBottom: '50px' }}>
                    <EditableText 
                        value={t.fullName} 
                        onChange={(v) => update('fullName', v)}
                        style={{ fontSize: '36px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', color: 'black', lineHeight: '1.2' }} 
                        placeholder="HỌ VÀ TÊN"
                    />
                    <EditableText 
                        value={t.jobTitle} 
                        onChange={(v) => update('jobTitle', v)}
                        style={{ fontSize: '16px', letterSpacing: '3px', textTransform: 'uppercase', color: '#555' }} 
                        placeholder="CHỨC DANH"
                    />
                </div>

                {/* Mục tiêu nghề nghiệp */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '15px', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}>Mục tiêu nghề nghiệp</h3>
                    <EditableText 
                        value={t.profile || t.objective} 
                        onChange={(v) => update('profile', v)}
                        style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}
                        placeholder="Mô tả mục tiêu nghề nghiệp của bạn..."
                    />
                </div>

                {/* Kinh nghiệm làm việc */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}>Kinh nghiệm làm việc</h3>
                    
                    {/* Job 1 (Demo) */}
                    <div style={{ display: 'flex', marginBottom: '25px' }}>
                        <div style={{ width: '15px', borderRight: '2px solid #1B2B41', position: 'relative', marginRight: '20px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1B2B41', position: 'absolute', top: '0', right: '-6px' }}></div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <EditableText value="Larana Studios" style={{ fontWeight: 'bold', fontSize: '14px' }} />
                                <EditableText value="03/2019 - 09/2020" style={{ fontSize: '12px', color: '#666' }} />
                            </div>
                            <EditableText value="Marketing Manager" style={{ fontStyle: 'italic', fontSize: '13px', marginBottom: '8px', color: '#555' }} />
                            <EditableText value="• Quản lý chiến dịch quảng cáo và phát triển thương hiệu." style={{ fontSize: '13px', lineHeight: '1.5' }} />
                        </div>
                    </div>
                </div>

                {/* Kỹ năng khác */}
                <div>
                    <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '15px', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}>Kỹ năng khác</h3>
                    <EditableText value="• Branding and Identity Design" style={{ fontSize: '14px' }} />
                </div>

            </div>
        </div>
    );
};

export default CVTemplate1;