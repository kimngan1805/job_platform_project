import React from 'react';

// Nhúng Component EditableText vào đây luôn
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

const CVTemplate2 = ({ data, onUpdate }) => {
    const update = (key, val) => {
        if (onUpdate) onUpdate(key, val);
    };
    const t = data || {};

    return (
        <div 
            className="cv-a4-page shadow-2xl bg-white" 
            style={{ width: '800px', height: '1131px', margin: '0 auto', overflow: 'hidden', position: 'relative', padding: '50px 0', fontFamily: 'Arial, sans-serif' }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Decor Background (Vẽ bằng CSS thay vì SVG để dễ chỉnh) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '150px', height: '150px', background: '#9BAAB9', clipPath: 'polygon(0 0, 100% 0, 0 100%)', opacity: 0.8 }}></div>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '450px', background: '#9BAAB9', clipPath: 'polygon(100% 0, 100% 100%, 0 0)', zIndex: 0, opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '120px', height: '100px', background: '#B37A4C', borderRadius: '0 100% 0 0' }}></div>
            <div style={{ position: 'absolute', top: 0, left: '300px', width: '250px', height: '180px', background: '#E8B4B8', borderRadius: '0 0 50% 50%', opacity: 0.6 }}></div>
            
            {/* --- HEADER --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', padding: '0 50px', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '60%', paddingTop: '100px' }}>
                    <EditableText 
                        value={t.fullName} 
                        onChange={(v) => update('fullName', v)}
                        style={{ fontSize: '48px', fontFamily: 'serif', color: '#2D3436', lineHeight: 1.1, marginBottom: '15px' }}
                        placeholder="NAME SURNAME"
                    />
                    <EditableText 
                        value={t.jobTitle} 
                        onChange={(v) => update('jobTitle', v)}
                        style={{ fontSize: '20px', fontWeight: 'bold', color: '#B37A4C', textTransform: 'uppercase', letterSpacing: '1px' }}
                        placeholder="JOB TITLE"
                    />
                </div>
                
                {/* Avatar */}
                <div style={{ width: '220px', height: '220px', borderRadius: '50%', border: '8px solid white', backgroundColor: '#D9D9D9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', overflow: 'hidden', marginTop: '50px' }}>
                    <span>PHOTO</span>
                </div>
            </div>

            {/* --- BODY CONTENT --- */}
            <div style={{ display: 'flex', gap: '50px', padding: '0 50px', position: 'relative', zIndex: 1 }}>
                
                {/* Cột Trái */}
                <div style={{ width: '35%' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#B37A4C', marginBottom: '15px' }}>Profile</h3>
                        <EditableText 
                            value={t.profile} 
                            onChange={(v) => update('profile', v)}
                            style={{ fontSize: '13px', lineHeight: '1.6', color: '#444', textAlign: 'justify' }}
                            placeholder="Giới thiệu bản thân..."
                        />
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#B37A4C', marginBottom: '15px' }}>Contact</h3>
                        <div style={{ fontSize: '13px', color: '#444', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#B37A4C'}}></span>
                                <EditableText value={t.phone} onChange={(v) => update('phone', v)} placeholder="Phone" />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#B37A4C'}}></span>
                                <EditableText value={t.email} onChange={(v) => update('email', v)} placeholder="Email" />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#B37A4C'}}></span>
                                <EditableText value={t.social} onChange={(v) => update('social', v)} placeholder="Social" />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#B37A4C'}}></span>
                                <EditableText value={t.address} onChange={(v) => update('address', v)} placeholder="Address" />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#B37A4C', marginBottom: '15px' }}>Skills</h3>
                        <div style={{ fontSize: '13px', color: '#444', lineHeight: '1.8' }}>
                            <EditableText value="• Design Thinking" />
                            <EditableText value="• Project Management" />
                            <EditableText value="• ReactJS & UI/UX" />
                        </div>
                    </div>
                </div>

                {/* Cột Phải */}
                <div style={{ width: '65%' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#B37A4C', marginBottom: '20px' }}>Academic History</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <EditableText value="Đại Học Kinh Tế" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }} />
                            <EditableText value="Cử nhân Quản trị Kinh doanh" style={{ fontStyle: 'italic', fontSize: '13px', color: '#444', marginBottom: '5px' }} />
                            <EditableText value="2016 - 2020" style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }} />
                            <EditableText value="• Tốt nghiệp loại Giỏi" style={{ fontSize: '13px', color: '#444' }} />
                            <EditableText value="• GPA: 3.6/4.0" style={{ fontSize: '13px', color: '#444' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#B37A4C', marginBottom: '20px' }}>Professional Career</h3>
                        <div style={{ marginBottom: '25px' }}>
                            <EditableText value="Trưởng nhóm Bán hàng" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }} />
                            <EditableText value="Larana Stores" style={{ fontStyle: 'italic', fontSize: '13px', color: '#444', marginBottom: '5px' }} />
                            <EditableText value="2021 - Hiện tại" style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }} />
                            <EditableText value="• Quản lý đội ngũ 5 người" style={{ fontSize: '13px', color: '#444' }} />
                            <EditableText value="• Tăng doanh số 20%" style={{ fontSize: '13px', color: '#444' }} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CVTemplate2;