<<<<<<< HEAD
import React, { useState, createContext } from 'react'
import { products } from '../assets/frontend_assets/assets';
=======
import React, { useState, createContext, useEffect } from 'react';
>>>>>>> 4d166ce (test)
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
<<<<<<< HEAD

  const currency = 'đ';
  const delivery_fee = 10;
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = (itemId, size) => {
    var cartData = structuredClone(cartItems);

    if(!size){
      toast.error("PLease select product size");
    }

    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size] += 1;
      }else{
        cartData[itemId][size] = 1;
      }
    }else{
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  }

  const getCartCount = () => {
    let totalcount = 0;
    for(const item in cartItems){
      for(const size in cartItems[item]){
        if(cartItems[item][size] && size){
          totalcount += cartItems[item][size];
        }
      }
    }
    return totalcount;
  }

  const updateQuantity = (itemId, size, quantity) => {
    var cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  }

  const getCartAmount = () => {
    var totalAmount = 0;
    for(const item in cartItems){
      var itemInfo = products.find((product) => product._id === item);
      for(const size in cartItems[item]){
        if(cartItems[item][size] > 0 && size){
          totalAmount += itemInfo.price * cartItems[item][size];
        }
      }
    }
    return totalAmount;
  }

  const value = {
    products, currency, delivery_fee,
    cartItems, addToCart,
    getCartCount, updateQuantity,
    getCartAmount, navigate
  }
=======
  const currency = 'đ';
  const delivery_fee = 10000;
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('userInfo'));
  const sessionId = localStorage.getItem('sessionId') || `guest_${Date.now()}`;
  if (!localStorage.getItem('sessionId')) {
    localStorage.setItem('sessionId', sessionId);
  }

  // Lấy sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        toast.error('Không thể tải danh sách sản phẩm');
      }
    };
    fetchProducts();
  }, []);

  // Lấy giỏ hàng
  const fetchCartItems = async () => {
    try {
      const queryParam = user?._id ? `userId=${user._id}` : `sessionId=${sessionId}`;
      const res = await fetch(`http://localhost:5000/api/cart?${queryParam}`);
      if (!res.ok) throw new Error('Không thể lấy dữ liệu giỏ hàng từ server');
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu giỏ hàng:', err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Vui lòng chọn kích thước sản phẩm');
      return;
    }

    try {
      const body = {
        product: itemId,
        size,
        quantity: 1,
        user: user?._id,
        sessionId: user ? undefined : sessionId,
      };

      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Thêm sản phẩm vào giỏ hàng thất bại');

      // Sau khi thêm thành công, gọi fetchCartItems để cập nhật state
      await fetchCartItems();

      toast.success('Đã thêm sản phẩm vào giỏ hàng');
    } catch (error) {
      console.error(error);
      toast.error('Thêm vào giỏ hàng thất bại');
    }
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const getCartAmount = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const value = {
    products,
    cartItems,
    currency,
    delivery_fee,
    addToCart,
    getCartCount,
    getCartAmount,
    fetchCartItems,
    navigate,
  };
>>>>>>> 4d166ce (test)

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
<<<<<<< HEAD

}

export default ShopContextProvider;
=======
};

export default ShopContextProvider;
>>>>>>> 4d166ce (test)
