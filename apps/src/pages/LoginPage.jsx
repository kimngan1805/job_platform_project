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
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username?.value;
    const password = event.target.password?.value;
    const email = event.target.email?.value;
    const confirmPass = event.target.confirmPassword?.value;

    let isValid = true;
    
    // Validate
    if (!username || !password) isValid = false;
    if (!isLogin) { // Nếu đang đăng ký
        if (!email || password !== confirmPass) isValid = false;
    }

    if (!isValid) {
        setShakeField(true);
        setTimeout(() => setShakeField(false), 500);
        if (!isLogin && password !== confirmPass) alert("Mật khẩu không khớp!");
        return;
    }

    // Animation Loading
    setBtnText(isLogin ? 'Logging in...' : 'Registering...');
    setBtnClass('login-btn loading');

    setTimeout(() => {
      setBtnText('✓ Success!');
      setTimeout(() => {
        if (isLogin) {
            // --- THAY ĐỔI Ở ĐÂY: Chuyển hướng sang trang Dashboard ---
            navigate('/dashboard'); 
        } else {
            alert("Đăng ký thành công! Hãy đăng nhập.");
            setIsLogin(true); // Về trang Login
            setBtnText('LOGIN');
            setBtnClass('login-btn');
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
                <div className="logo-text"><h2>AddWebSolution</h2><p>"lets tech solution"</p></div>
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

                {/* Phần Social Login thêm vào */}
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
                    {isLogin ? "New to Logo? " : "Already have an account? "}
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