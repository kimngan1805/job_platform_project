// src/pages/recruiter/MessagesPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MessagesPage.css';

const MessagesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Nếu có truyền state từ trang khác qua (ví dụ từ InfoCvPage) thì lấy
    const initialCandidate = location.state?.candidate || null;

    const [activeChat, setActiveChat] = useState(initialCandidate ? initialCandidate.name : 'Nguyễn Văn An');
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, sender: 'candidate', text: 'Xin chào anh/chị! Em là Nguyễn Văn An...', time: '09:15', date: 'Hôm nay - 05/01/2025' },
        { id: 2, sender: 'candidate', text: 'Em xin gửi CV để anh/chị xem xét ạ!', time: '09:16' },
        { id: 3, sender: 'recruiter', text: 'Chào An! Cảm ơn em đã quan tâm. Anh đã nhận được CV nhé.', time: '09:30' },
    ]);
    const messagesEndRef = useRef(null);

    // Mock list chat
    const chatList = [
        { name: 'Nguyễn Văn An', msg: 'Em xin gửi CV ạ...', time: '10:30', unread: 3, avatar: '👨‍💻' },
        { name: 'Trần Thị Bình', msg: 'Cảm ơn anh/chị!', time: 'Hôm qua', unread: 0, avatar: '👩‍💼' },
        { name: 'Lê Minh Cường', msg: 'Xin chào, em muốn hỏi...', time: '2 ngày', unread: 0, avatar: '👨‍💻' },
        { name: 'Phạm Thu Dung', msg: 'Em đã xem qua yêu cầu...', time: '3 ngày', unread: 1, avatar: '👩‍💻' },
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        setMessages([...messages, {
            id: messages.length + 1,
            sender: 'recruiter',
            text: messageInput,
            time: time
        }]);
        setMessageInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="messages-page-body">
            {/* Header */}
            <header className="messages-header">
                <div className="messages-logo">
                    <span>⚡</span><span>GoJobs Recruiter</span>
                </div>
                <nav>
                    <ul className="messages-nav-menu">
                        {/* 1. Tìm Việc -> Về trang FindJob */}
                        <li><a onClick={() => navigate('/find-jobs')}>Tìm Việc</a></li>

                        {/* 2. Hồ Sơ & CV -> Link tạm */}
                        <li><a onClick={() => navigate('/profile-cv')}>Hồ Sơ & CV</a></li>

                        {/* 3. Nhà Tuyển Dụng -> Về trang chủ Recruiter (Đang active) */}
                        <li><a className="active" onClick={() => navigate('/recruiter')}>Nhà Tuyển Dụng</a></li>

                        {/* 4. Công Cụ -> Link tạm */}
                        <li><a onClick={() => navigate('/tools')}>Công Cụ</a></li>
                    </ul>
                </nav>
                <div className="messages-header-right">
                    <button className="messages-notification-btn">
                        🔔<span className="messages-notification-badge">5</span>
                    </button>
                    <div className="messages-user-profile">
                        <div className="messages-user-avatar">HR</div><span>HR Manager</span>
                    </div>
                </div>
            </header>

            {/* Main Chat Container */}
            <div className="messages-container">
                {/* Left Sidebar */}
                <aside className="messages-sidebar">
                    <div className="messages-sidebar-header">
                        <h2 className="messages-sidebar-title">Tin nhắn</h2>
                        <div className="messages-search-box">
                            <span className="messages-search-icon">🔍</span>
                            <input type="text" className="messages-search-input" placeholder="Tìm kiếm..." />
                        </div>
                    </div>
                    <div className="messages-list">
                        {chatList.map((chat, idx) => (
                            <div
                                key={idx}
                                className={`messages-item ${activeChat === chat.name ? 'active' : ''}`}
                                onClick={() => setActiveChat(chat.name)}
                            >
                                <div className="messages-avatar">
                                    {chat.avatar}<span className="messages-online-dot"></span>
                                </div>
                                <div className="messages-info">
                                    <div className="messages-name">{chat.name}</div>
                                    <div className="messages-preview">{chat.msg}</div>
                                </div>
                                <div className="messages-meta">
                                    <span className="messages-time">{chat.time}</span>
                                    {chat.unread > 0 && <span className="messages-unread-badge">{chat.unread}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Center Window */}
                <main className="messages-window">
                    <div className="messages-window-header">
                        <div className="messages-header-left">
                            <div className="messages-header-avatar">👨‍💻</div>
                            <div className="messages-header-info">
                                <h3>{activeChat}</h3>
                                <span className="messages-header-status">● Đang hoạt động</span>
                            </div>
                        </div>
                        <div className="messages-actions">
                            <button className="messages-action-btn">📞</button>
                            <button className="messages-action-btn">📹</button>
                            <button className="messages-action-btn">ℹ️</button>
                        </div>
                    </div>

                    <div className="messages-content-area">
                        <div className="messages-date-divider"><span>Hôm nay - 05/01/2025</span></div>
                        <div className="messages-group">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`messages-msg ${msg.sender === 'recruiter' ? 'sent' : 'received'}`}>
                                    <div className="messages-msg-avatar">{msg.sender === 'recruiter' ? 'HR' : '👨‍💻'}</div>
                                    <div className="messages-msg-content">
                                        <div className="messages-bubble">{msg.text}</div>
                                        <div className="messages-msg-time">{msg.time}</div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="messages-input-container">
                        <div className="messages-input-wrapper">
                            <div className="messages-input-actions">
                                <button className="messages-input-btn">📎</button>
                                <button className="messages-input-btn">🖼️</button>
                                <button className="messages-input-btn">😊</button>
                            </div>
                            <textarea
                                className="messages-input-field"
                                placeholder="Nhập tin nhắn..."
                                rows="1"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                            ></textarea>
                            <button className="messages-send-btn" onClick={handleSendMessage}>➤</button>
                        </div>
                    </div>
                </main>

                {/* Right Info Sidebar */}
                <aside className="messages-info-sidebar">
                    <div className="messages-info-header">
                        <div className="messages-info-avatar">👨‍💻</div>
                        <h3 className="messages-info-name">{activeChat}</h3>
                        <p className="messages-info-position">Frontend Developer</p>
                    </div>
                    <div className="messages-info-section">
                        <h4 className="messages-info-section-title">THÔNG TIN LIÊN HỆ</h4>
                        <div className="messages-info-item"><div className="messages-info-icon">📧</div><div className="messages-info-text"><div className="messages-info-label">Email</div><div className="messages-info-value">ungvien@email.com</div></div></div>
                        <div className="messages-info-item"><div className="messages-info-icon">📱</div><div className="messages-info-text"><div className="messages-info-label">Điện thoại</div><div className="messages-info-value">0912 345 678</div></div></div>
                    </div>
                    <div className="messages-info-section">
                        <h4 className="messages-info-section-title">THAO TÁC NHANH</h4>
                        <div className="messages-quick-actions">
                            <button className="messages-quick-action-btn"><span>📄</span><span>Xem CV</span></button>
                            <button className="messages-quick-action-btn"><span>📅</span><span>Đặt lịch</span></button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default MessagesPage;