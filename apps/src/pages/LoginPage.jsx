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

  // 3. Xử lý Submit Form (ĐÃ TÍCH HỢP API)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username?.value; // Khi register dùng làm Full Name
    const email = event.target.email?.value;
    const password = event.target.password?.value;
    const confirmPass = event.target.confirmPassword?.value;

    // --- VALIDATE ---
    let isValid = true;
    
    // Login cần Email + Pass, Register cần thêm Username + Confirm Pass
    if (isLogin) {
        if (!email || !password) isValid = false;
    } else {
        if (!username || !email || !password || password !== confirmPass) isValid = false;
    }

    if (!isValid) {
        setShakeField(true);
        setTimeout(() => setShakeField(false), 500);
        if (!isLogin && password !== confirmPass) {
            alert("Mật khẩu xác nhận không khớp!");
        } else {
            alert("Vui lòng điền đầy đủ thông tin!");
        }
        return;
    }

    // --- GỌI API BACKEND ---
    setBtnClass('login-btn loading');
    setBtnText(isLogin ? 'Logging in...' : 'Registering...');

    try {
        // Xác định endpoint
        const endpoint = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
        
        // Chuẩn bị dữ liệu gửi đi
        const payload = isLogin 
            ? { email, password } 
            : { email, password, full_name: username, role: 'candidate' }; // Mặc định role candidate khi đăng ký

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        // --- XỬ LÝ THÀNH CÔNG ---
        setBtnText('✓ Success!');
        
        setTimeout(() => {
            if (isLogin) {
                // Đăng nhập thành công -> Lưu user info
                localStorage.setItem('user_data', JSON.stringify(data.user));
                
                // Chuyển hướng dựa vào role (để vào đúng trang Dashboard)
                if (data.user.role === 'recruiter') {
                    navigate('/recruiter');
                } else if (data.user.role === 'admin') {
                    navigate('/admin'); // Nếu có trang admin
                } else {
                    // Mặc định candidate vào trang tìm việc hoặc profile
                    navigate('/find-jobs'); 
                }
            } else {
                // Đăng ký thành công -> Chuyển sang màn hình chọn Role (như thiết kế cũ)
                // Lưu tạm thông tin user vừa tạo để trang RoleSelection dùng
                localStorage.setItem('user_data', JSON.stringify(data.user));
                navigate('/role-selection');
            }
        }, 1000);

    } catch (err) {
        // Xử lý lỗi
        setBtnClass('login-btn error'); 
        setBtnText('Failed');
        alert(err.message);
        
        // Reset nút về trạng thái ban đầu
        setTimeout(() => {
            setBtnClass('login-btn');
            setBtnText(isLogin ? 'LOGIN' : 'REGISTER');
        }, 2000);
    }
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

                {/* Khi đăng ký thì hiện Username (Full Name) */}
                {!isLogin && (
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="username" placeholder="Enter your name" className={shakeField ? 'shake' : ''} />
                    </div>
                )}

                {/* Email luôn hiện */}
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="example@gmail.com" className={shakeField ? 'shake' : ''} />
                </div>

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

                <button type="submit" className={btnClass}>{btnText}</button>

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