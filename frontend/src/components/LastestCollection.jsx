import React, { useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const LastestCollection = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                setProducts(data.slice(0, 10)); // lấy 10 sản phẩm mới nhất
            } catch (error) {
                console.error('Lỗi fetch sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    products.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    );
};

export default LastestCollection;
