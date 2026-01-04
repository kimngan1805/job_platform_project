// src/pages/LoginPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // State quản lý chế độ: true = Login, false = Register
  const [isLogin, setIsLogin] = useState(true);

  // Các state hiệu ứng và form
  const [btnText, setBtnText] = useState('LOGIN');
  const [btnClass, setBtnClass] = useState('login-btn');
  const [welcomeText, setWelcomeText] = useState('');
  const [shakeField, setShakeField] = useState(false);

  // Text chào mừng thay đổi
  const fullText = isLogin ? "Welcome onboard with us!" : "Create your account today!";

  // 1. Hiệu ứng gõ chữ (Typewriter)
  useEffect(() => {
    setWelcomeText('');
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setWelcomeText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [isLogin, fullText]);

  // 2. Hiệu ứng mây bay (Parallax)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const clouds = document.querySelectorAll('.cloud');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      clouds.forEach((cloud, index) => {
        const speed = (index + 1) * 2;
        cloud.style.transform = `translate(${(mouseX - 0.5) * speed}px, ${(mouseY - 0.5) * speed}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Xử lý Submit Form
  // 3. Xử lý Submit Form
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username?.value;
    const password = event.target.password?.value;
    const email = event.target.email?.value;
    const confirmPass = event.target.confirmPassword?.value;

    // --- A. LOGIC ĐĂNG NHẬP VỚI TÀI KHOẢN TEST (HARDCODE) ---
    if (isLogin) {
        // 1. Nếu là NHÀ TUYỂN DỤNG (HR)
        if (username === 'hr' && password === '123') {
            const userData = { name: 'HR Manager', role: 'recruiter' };
            localStorage.setItem('user_data', JSON.stringify(userData));
            
            setBtnText('Logging in as HR...');
            setBtnClass('login-btn loading');
            
            setTimeout(() => { navigate('/recruiter'); }, 1000);
            return;
        }

        // 2. Nếu là ỨNG VIÊN (Candidate)
        if (username === 'ngan' && password === '123') {
            const userData = { name: 'Ngân Kim', role: 'candidate' };
            localStorage.setItem('user_data', JSON.stringify(userData));
            
            setBtnText('Logging in as Candidate...');
            setBtnClass('login-btn loading');
            
            setTimeout(() => { navigate('/find-jobs'); }, 1000);
            return;
        }
    }

    // --- B. LOGIC ĐĂNG KÝ / ĐĂNG NHẬP THƯỜNG ---
    let isValid = true;
    
    // Validate cơ bản
    if (!username || !password) isValid = false;
    if (!isLogin) { // Nếu đang đăng ký thì check thêm email và confirm pass
        if (!email || password !== confirmPass) isValid = false;
    }

    // Nếu dữ liệu không hợp lệ
    if (!isValid) {
        setShakeField(true);
        setTimeout(() => setShakeField(false), 500);
        if (!isLogin && password !== confirmPass) {
            alert("Mật khẩu xác nhận không khớp!");
        } else if (isLogin) {
            alert("Sai tài khoản hoặc mật khẩu! (Gợi ý: hr/123 hoặc ngan/123)");
        } else {
            alert("Vui lòng điền đầy đủ thông tin!");
        }
        return;
    }

    // --- C. XỬ LÝ THÀNH CÔNG (MÔ PHỎNG) ---
    setBtnText(isLogin ? 'Logging in...' : 'Registering...');
    setBtnClass('login-btn loading');

    setTimeout(() => {
      setBtnText('✓ Success!');
      setTimeout(() => {
        if (isLogin) {
            // Trường hợp đăng nhập user thường (không phải hr/ngan) -> Vào dashboard chung
            navigate('/dashboard'); 
        } else {
            // --- ĐĂNG KÝ THÀNH CÔNG -> CHUYỂN QUA CHỌN ROLE ---
            navigate('/role-selection');
        }
      }, 1000);
    }, 1500);
  };

  return (
    <div className="login-page-wrapper">
      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>
      <div className="bg-circle circle-3"></div>

      <div className="login-container">
        {/* --- PHẦN BÊN TRÁI: CSS ART (GIỮ NGUYÊN) --- */}
        <div className="left-side">
            <div className="logo">
                <div className="logo-icon"><div className="logo-shape"></div></div>
                <div className="logo-text"><h2>Finder.</h2><p>"Kết nối cơ hội"</p></div>
            </div>
            <div className="illustration">
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="person">
                    <div className="person-head"><div className="person-hair"><div className="person-bun"></div></div></div>
                    <div className="person-body"></div>
                    <div className="person-legs"><div className="leg"></div><div className="leg"></div></div>
                </div>
                <div className="dashboard dashboard-large">
                    <div className="chart-bars">
                        <div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div>
                    </div>
                </div>
                <div className="dashboard dashboard-small">
                    <div className="chart-pie"></div>
                    <div className="chart-lines"><div className="line"></div><div className="line"></div><div className="line"></div></div>
                </div>
                <div className="tree tree-left"><div className="tree-leaves"></div><div className="tree-trunk"></div></div>
                <div className="tree tree-right"><div className="tree-leaves"></div><div className="tree-trunk"></div><div className="pot"></div></div>
            </div>
        </div>

        {/* --- PHẦN BÊN PHẢI: FORM --- */}
        <div className="right-side">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>{isLogin ? 'Login' : 'Register'}</h1>
                <p className="welcome-text">{welcomeText}</p>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter your username" className={shakeField ? 'shake' : ''} />
                </div>

                {!isLogin && (
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="example@gmail.com" className={shakeField ? 'shake' : ''} />
                    </div>
                )}

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your password" className={shakeField ? 'shake' : ''} />
                    {isLogin && (
                        <div className="forgot-password">
                            <a href="#" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                        </div>
                    )}
                </div>

                {!isLogin && (
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm your password" className={shakeField ? 'shake' : ''} />
                    </div>
                )}

                <button type="submit" className={btnClass}>{isLogin ? 'LOGIN' : 'REGISTER'}</button>

                {/* Phần Social Login */}
                <div className="social-login">
                    <div className="divider"><span>Or {isLogin ? 'login' : 'register'} with</span></div>
                    <div className="social-buttons">
                        <button type="button" className="social-btn google">
                            <span className="icon-social">G</span> Google
                        </button>
                        <button type="button" className="social-btn facebook">
                            <span className="icon-social">f</span> Facebook
                        </button>
                    </div>
                </div>

                <p className="register-text">
                    {isLogin ? "New to Finder? " : "Already have an account? "}
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setIsLogin(!isLogin);
                        setBtnText(isLogin ? 'REGISTER' : 'LOGIN');
                        setBtnClass('login-btn');
                    }}>
                        {isLogin ? "Register Here" : "Login Here"}
                    </a>
                </p>
            </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;