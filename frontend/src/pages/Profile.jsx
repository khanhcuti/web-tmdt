import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn chưa đăng nhập!');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setPhone(data.phone || '');
          setGender(data.gender || '');
          setBirthday(data.birthday ? data.birthday.slice(0, 10) : '');
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Lỗi lấy thông tin người dùng:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, gender, birthday }),
      });

      if (res.ok) {
        alert('Cập nhật thành công!');
      } else {
        alert('Cập nhật thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi lưu thông tin:', error);
    }
  };

  if (!user) return <div className="text-center mt-20">Đang tải thông tin tài khoản...</div>;

  return (
    <div className="flex flex-col items-center mt-10 text-gray-800">
      <h2 className="text-3xl font-semibold mb-5">Thông tin tài khoản</h2>
      <div className="w-[90%] sm:max-w-md p-6 border border-gray-300 rounded-md shadow-md">
        <p className="mb-3"><strong>Tên đăng nhập:</strong> {user.username}</p>
        <p className="mb-3"><strong>Email:</strong> {user.email}</p>

        <div className="mb-3">
          <label><strong>Số điện thoại:</strong></label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border" />
        </div>

        <div className="mb-3">
          <label><strong>Giới tính:</strong></label>
          <div className="flex gap-4 mt-1">
            <label>
              <input type="radio" value="Nam" checked={gender === 'Nam'} onChange={() => setGender('Nam')} />
              Nam
            </label>
            <label>
              <input type="radio" value="Nữ" checked={gender === 'Nữ'} onChange={() => setGender('Nữ')} />
              Nữ
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label><strong>Ngày sinh:</strong></label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="w-full p-2 border" />
        </div>

        <button onClick={handleSave} className="mt-4 bg-black text-white px-4 py-2 rounded">
          LƯU
        </button>
      </div>
    </div>
  );
};

export default Profile;
