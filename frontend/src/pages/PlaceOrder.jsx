<<<<<<< HEAD
import React, { useContext, useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>

        <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

        <div className='flex gap-3'>
          <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip code' />
          <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>

        <input className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === 'stripe' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === 'razorpay' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartTotal from '../components/CartTotal';

// Import JSON data
import provinces from '../services/tinh_tp.json';
import districts from '../services/quan_huyen.json'; 
import wards from '../services/xa_phuong.json';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const cartData = localStorage.getItem('cartData');
  const parsedCartData = cartData ? JSON.parse(cartData) : null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: ''
  });

  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  useEffect(() => {
    // Kiểm tra dữ liệu giỏ hàng từ localStorage
    if (!cartData) {
      navigate('/cart');
    } else {
      setIsLoading(false);
    }
  }, [cartData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    // Lọc ra các quận/huyện của tỉnh được chọn
    const filteredDistricts = Object.values(districts).filter(
      district => district.parent_code === provinceCode
    );
    setDistrictList(filteredDistricts);
    setWardList([]);
    
    // Reset district và ward khi đổi tỉnh
    setFormData(prev => ({
      ...prev,
      province: provinceCode,
      district: '',
      ward: ''
    }));
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    // Lọc ra các phường/xã của quận/huyện được chọn
    const filteredWards = Object.values(wards).filter(
      ward => ward.parent_code === districtCode
    );
    setWardList(filteredWards);
    
    // Reset ward khi đổi quận/huyện
    setFormData(prev => ({
      ...prev,
      district: districtCode,
      ward: ''
    }));
  };

  // Nếu đang loading hoặc không có items, return null
  if (isLoading || !cartData) {
    return null;
  }

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    const required = ['name', 'phone', 'email', 'address', 'province', 'district', 'ward'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    try {
      // Xóa sản phẩm khỏi giỏ hàng trong database
      const token = localStorage.getItem('token');
      const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
      const sessionId = localStorage.getItem('sessionId');

      await fetch('http://localhost:5000/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user?.id || user?._id, // Thêm user?._id vì có thể id được lưu dưới dạng _id
          sessionId: sessionId
        })
      });

      // Tạo đơn hàng mới
      const orderItems = parsedCartData.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image
      }));

      const orderData = {
        items: orderItems,
        shippingInfo: formData,
        paymentMethod: formData.payment || 'cod',
        orderDate: new Date().toISOString(),
        status: 'Chờ xác nhận',
        total: parsedCartData.total
      };

      // Lưu đơn hàng vào localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, orderData]));

      // Xóa cartData khỏi localStorage
      localStorage.removeItem('cartData');

      // Trigger event để cập nhật Cart component
      const clearCartEvent = new CustomEvent('clearCart');
      window.dispatchEvent(clearCartEvent);

      // Chuyển hướng đến trang Orders
      navigate('/orders');

    } catch (error) {
      console.error('Lỗi khi xử lý đơn hàng:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Thông tin giao hàng */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-6">Thông tin giao hàng</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Tên"
              className="w-full border p-3 rounded"
              value={formData.name}
              onChange={handleInputChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Điện thoại"
              className="w-full border p-3 rounded"
              value={formData.phone}
              onChange={handleInputChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Địa chỉ Email"
              className="w-full border p-3 rounded"
              value={formData.email}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              className="w-full border p-3 rounded"
              value={formData.address}
              onChange={handleInputChange}
            />

            <div className="grid grid-cols-3 gap-4">
              <select
                name="province"
                className="border p-3 rounded"
                value={formData.province}
                onChange={handleProvinceChange}
              >
                <option value="">Tỉnh/TP</option>
                {Object.values(provinces).map(province => (
                  <option key={province.code} value={province.code}>
                    {province.name_with_type}
                  </option>
                ))}
              </select>

              <select
                name="district"
                className="border p-3 rounded"
                value={formData.district}
                onChange={handleDistrictChange}
                disabled={!formData.province}
              >
                <option value="">Quận/Huyện</option>
                {districtList.map(district => (
                  <option key={district.code} value={district.code}>
                    {district.name_with_type}
                  </option>
                ))}
              </select>

              <select
                name="ward"
                className="border p-3 rounded"
                value={formData.ward}
                onChange={handleInputChange}
                disabled={!formData.district}
              >
                <option value="">Phường/Xã</option>
                {wardList.map(ward => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name_with_type}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="note"
              placeholder="Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính)"
              className="w-full border p-3 rounded h-32"
              value={formData.note}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="lg:w-[400px]">
          <h2 className="text-xl font-semibold mb-6">Phương thức thanh toán</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {/* COD */}
            <div className="border p-4 rounded hover:border-gray-400 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="radio" 
                  name="payment" 
                  id="cod" 
                  value="cod"
                  defaultChecked 
                  onChange={handleInputChange}
                />
                <label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 ml-6">
                Miễn phí vận chuyển cho mọi đơn hàng trên 500.000đ
              </p>
            </div>

            {/* Bank Transfer */}
            <div className="border p-4 rounded hover:border-gray-400 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="radio" 
                  name="payment" 
                  id="bank" 
                  value="bank"
                  onChange={handleInputChange}
                />
                <label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                  <span>Thanh toán qua thẻ ngân hàng</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 ml-6">
                Hỗ trợ tất cả ngân hàng nội địa Việt Nam
              </p>
            </div>

            {/* VNPay */}
            <div className="border p-4 rounded hover:border-gray-400 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="radio" 
                  name="payment" 
                  id="vnpay" 
                  value="vnpay"
                  onChange={handleInputChange}
                />
                <label htmlFor="vnpay" className="flex items-center gap-2 cursor-pointer">
                  <span>Thanh toán qua VNPay</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 ml-6">
                Thanh toán qua ứng dụng VNPay trên điện thoại
              </p>
            </div>
          </div>
        
          {/* Thêm margin-top vào div bọc CartTotal */}
          <div className="mt-8">
            <CartTotal cartItems={parsedCartData?.items || []} />
          </div>
        
          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition-colors"
          >
            ĐẶT HÀNG NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
>>>>>>> 4d166ce (test)
