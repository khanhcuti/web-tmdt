import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom'; // Nếu sau login cần chuyển trang

const Login = () => {
  const [currentState, setCurrentState] = useState('Đăng nhập');
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Lấy dữ liệu từ form theo name
    const username = form.elements.username?.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword?.value;

    try {
      if (currentState === 'Đăng nhập') {
        // Xử lý đăng nhập
        const res = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          alert('Đăng nhập thành công!');
          localStorage.setItem('token', data.token); // lưu token nếu có
          navigate('/'); // chuyển về trang chủ nếu cần
        } else {
          alert(data.message || 'Đăng nhập thất bại!');
        }
      } else {
        // Xử lý đăng ký
        if (password !== confirmPassword) {
          alert('Mật khẩu không khớp!');
          return;
        }

        if (!captchaToken) {
          alert('Vui lòng xác nhận Captcha!');
          return;
        }

        const res = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          alert('Đăng ký thành công!');
          setCurrentState('Đăng nhập'); // sau khi đăng ký thành công → quay về Đăng nhập
        } else {
          alert(data.message || 'Đăng ký thất bại!');
        }
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Đã xảy ra lỗi, vui lòng thử lại!');
    }

    // Reset form sau khi submit
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
  };

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
      </div>

      {currentState === 'Đăng nhập' ? '' : (
        <input name="username" className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Tên người dùng' required />
      )}
      <input name="email" className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' required />
      <input name="password" className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Mật khẩu' required />
      {currentState === 'Đăng nhập' ? '' : (
        <input name="confirmPassword" className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Nhập lại mật khẩu' required />
      )}
      
      {currentState === 'Đăng nhập' ? '' : (
        <div className='w-full'>
          <ReCAPTCHA sitekey="6LcMuxUrAAAAAJUjH0M18y7ykDBtpBB6qEWl16-d" onChange={onCaptchaChange} ref={recaptchaRef} />
        </div>
      )}

      <button
        type="submit"
        className='w-full bg-black text-white font-light px-8 py-2 cursor-pointer'
        disabled={currentState === 'Đăng ký' && !captchaToken}
      >
        {currentState === 'Đăng nhập' ? 'Đăng nhập' : 'Đăng ký'}
      </button>
      
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Quên mật khẩu</p>
        {currentState === 'Đăng nhập' ? (
          <p onClick={() => setCurrentState('Đăng ký')} className='cursor-pointer'>Tạo tài khoản</p>
        ) : (
          <p onClick={() => setCurrentState('Đăng nhập')} className='cursor-pointer'>Đăng nhập ngay</p>
        )}
      </div>
    </form>
  );
};

export default Login;
