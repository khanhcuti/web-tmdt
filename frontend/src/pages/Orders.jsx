<<<<<<< HEAD
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {

  const { products, currency} = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          products.slice(1, 4).map((item, index) => (
            <div key={index} className='py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />

                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>

                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{item.price}{currency}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>

                  <p className='mt-2'>Date: <span className='text-gray-400'>25, Jul, 2024</span></p>
=======
import React, { useState } from 'react';
import Title from '../components/Title';

const Orders = () => {
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders') || '[]'));

  // Hàm xử lý hủy đơn hàng
  const handleCancelOrder = (orderIndex) => {
    const newOrders = orders.filter((_, index) => index !== orderIndex);
    
    // Cập nhật localStorage
    localStorage.setItem('orders', JSON.stringify(newOrders));
    
    // Cập nhật state
    setOrders(newOrders);
  };

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='mb-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='space-y-4'>
        {orders.map((order, orderIndex) => (
          order.items.map((item, itemIndex) => (
            <div key={`${orderIndex}-${itemIndex}`} 
              className='py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20 object-cover' src={item.image} alt={item.name} />
                
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{item.price.toLocaleString()}đ</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className='mt-2'>
                    Date: <span className='text-gray-400'>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </p>
>>>>>>> 4d166ce (test)
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
<<<<<<< HEAD
                  <p className='min-w-2 h-2 rounded-full bg-green-600'></p>
                  <p className='text-sm md-text-base'>Ready to ship</p>
                </div>
                <button className='border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
=======
                  <div className='w-2 h-2 rounded-full bg-green-600'></div>
                  <p className='text-sm md:text-base'>{order.status}</p>
                </div>
                <button 
                  onClick={() => handleCancelOrder(orderIndex)}
                  className='border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors'
                >
                  Hủy Đơn Hàng
                </button>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Orders;
>>>>>>> 4d166ce (test)
