<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
=======
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
>>>>>>> 4d166ce (test)
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
<<<<<<< HEAD

    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5));
    }, []);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
=======
  const { products } = useContext(ShopContext); // Lấy danh sách sản phẩm từ context
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Lọc sản phẩm bestseller
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5)); // Lấy 5 sản phẩm bestseller
  }, [products]); // Chạy lại khi danh sách sản phẩm thay đổi

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Các sản phẩm bán chạy nhất của cửa hàng.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.images[0]} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
>>>>>>> 4d166ce (test)
