<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const {products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for(const item in cartItems){
      for(const size in cartItems[item]){
        if(cartItems[item][size] > 0 && size){
          tempData.push({
            _id: item,
            size: size,
            quantity: cartItems[item][size]
          });
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b border-gray-300 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />

                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>

                    <div className='flex items-center gap-5 mt-2'>
                      <p>{productData.price}{currency}</p>
                      <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <input onChange={(e) => e.target.value === '' || e.target.value === 0 ? updateQuantity(item._id, item.size, 0) : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} defaultValue={item.quantity} />
              
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            );
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'>PROCEED TO CHECKOUT</button>
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const sessionId = localStorage.getItem('sessionId') || `guest_${Date.now()}`;
        
        if (!localStorage.getItem('sessionId')) {
          localStorage.setItem('sessionId', sessionId);
        }

        const queryParam = user ? `userId=${user.id}` : `sessionId=${sessionId}`;
        const res = await fetch(`http://localhost:5000/api/cart?${queryParam}`);
        
        if (!res.ok) throw new Error('Không thể lấy dữ liệu giỏ hàng');
        
        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();

    const handleClearCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const sessionId = localStorage.getItem('sessionId');

        await fetch('http://localhost:5000/api/cart/clear', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user?.id,
            sessionId: sessionId
          })
        });

        setCartItems([]);
        localStorage.removeItem('cartData');
      } catch (error) {
        console.error('Lỗi khi xóa giỏ hàng:', error);
      }
    };

    window.addEventListener('clearCart', handleClearCart);

    return () => {
      window.removeEventListener('clearCart', handleClearCart);
    };
  }, []);

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, { method: 'DELETE' });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Lỗi khi xoá sản phẩm:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      if (selectedItems[item._id]) {
        return sum + (item.price * item.quantity);
      }
      return sum;
    }, 0);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để tiếp tục thanh toán');
      navigate('/login');
      return;
    }

    const selectedProducts = cartItems.filter(item => selectedItems[item._id]);
    if (selectedProducts.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }

    const subtotal = calculateTotal();
    const cartData = {
      items: selectedProducts,
      subtotal: subtotal,
      shippingFee: subtotal > 500000 ? 0 : 10000
    };
    localStorage.setItem('cartData', JSON.stringify(cartData));
    
    navigate('/placeorder');
  };

  if (loading) return <p>Loading...</p>;
  if (cartItems.length === 0) return <p>🛒 Giỏ hàng của bạn đang trống.</p>;

  const subtotal = calculateTotal();
  const shippingFee = subtotal > 500000 ? 0 : 10000;
  const total = subtotal + shippingFee;

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems[item._id] || false}
                  onChange={() => handleSelectItem(item._id)}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-600 mt-1">{item.price.toLocaleString()}đ</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-sm">{item.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center border rounded">
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() =>
                      item.quantity > 1 &&
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center py-1 border-x"
                  />
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-[400px]">
          <div className="border p-6">
            <h3 className="text-xl font-semibold mb-6">CART TOTALS</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              
              <div className="flex justify-between border-t border-b py-4">
                <span className="text-gray-600">Shipping Fee</span>
                <span>{shippingFee.toLocaleString()}đ</span>
              </div>
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toLocaleString()}đ</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition-colors"
            >
              PROCEED TO CHECKOUT
            </button>
>>>>>>> 4d166ce (test)
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  )
}

export default Cart
=======
  );
};

export default Cart;
>>>>>>> 4d166ce (test)
