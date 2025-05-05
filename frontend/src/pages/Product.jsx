<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() =>{
    fetchProductData();
  }, [productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='' />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>{productData.price}{currency}</p>
        
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>

            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`cursor-pointer py-2 px-4 bg-gray-100 ${item === size ? 'border' : ''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>

          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 opacity-10' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
=======
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../components/RelatedProducts';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState('₫');
  const { fetchCartItems } = useContext(ShopContext);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await res.json();
        setProductData(data);
        setImage(data.images[0]);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = async () => {
    if (!size) {
      alert('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!');
      return;
    }

    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const sessionId = localStorage.getItem('sessionId') || `guest_${Date.now()}`;

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: productData._id,
          size,
          quantity,
          sessionId: !user ? sessionId : undefined,
          user: user ? user.id : undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchCartItems(); // Thêm dòng này để cập nhật giỏ hàng
        alert('✅ Đã thêm vào giỏ hàng!');
      } else {
        alert('❌ ' + (data.message || 'Không thể thêm vào giỏ hàng.'));
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
    }
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`Ảnh sản phẩm ${index + 1}`}
              />
            ))}
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='Sản phẩm' />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            <p className='pl-2'>(122 đánh giá)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>
            {productData.price}
            {currency}
          </p>

          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Chọn kích thước</p>

            <div className='flex gap-2'>
              {Object.keys(productData.stock).map((sizeKey, index) => (
                <button
                  onClick={() => setSize(sizeKey)}
                  className={`cursor-pointer py-2 px-4 bg-gray-100 ${
                    sizeKey === size ? 'border' : ''
                  }`}
                  key={index}
                >
                  {sizeKey}
                </button>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-4 my-4'>
            <p>Số lượng:</p>
            <input
              type='number'
              value={quantity}
              onChange={handleQuantityChange}
              className='w-16 border border-gray-300 rounded-md text-center'
              min='1'
            />
          </div>

          <button
            onClick={handleAddToCart}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'
          >
            THÊM VÀO GIỎ HÀNG
          </button>
          <hr className='mt-8 sm:w-4/5 opacity-10' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>Sản phẩm chính hãng 100%.</p>
            <p>Hỗ trợ thanh toán khi nhận hàng.</p>
            <p>Chính sách đổi trả dễ dàng trong 7 ngày.</p>
>>>>>>> 4d166ce (test)
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Description $ Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
          <p></p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
=======
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Mô tả</b>
          <p className='border px-5 py-3 text-sm'>Đánh giá (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>{productData.description}</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className='opacity-0'>Đang tải...</div>
  );
};

export default Product;
>>>>>>> 4d166ce (test)
