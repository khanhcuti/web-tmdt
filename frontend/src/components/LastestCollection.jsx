import React, { useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const LastestCollection = () => {
    const [products, setProducts] = useState([]);
<<<<<<< HEAD
=======
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
>>>>>>> 4d166ce (test)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
<<<<<<< HEAD
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                setProducts(data.slice(0, 10)); // lấy 10 sản phẩm mới nhất
            } catch (error) {
                console.error('Lỗi fetch sản phẩm:', error);
=======
                setLoading(true);
                const res = await fetch('http://localhost:5000/api/products');
                
                if (!res.ok) {
                    throw new Error('Không thể tải sản phẩm');
                }

                const data = await res.json();
                
                // Sắp xếp theo _id giảm dần (giả sử _id lớn hơn = mới hơn)
                // và lấy 10 sản phẩm đầu tiên
                const latestProducts = data
                    .sort((a, b) => b._id - a._id)
                    .slice(0, 5);
                
                setProducts(latestProducts);
            } catch (error) {
                console.error('Lỗi fetch sản phẩm:', error);
                setError(error.message);
            } finally {
                setLoading(false);
>>>>>>> 4d166ce (test)
            }
        };

        fetchProducts();
    }, []);

<<<<<<< HEAD
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
=======
    if (loading) {
        return (
            <div className="my-10 text-center">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <div className="mt-8 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-10 text-center">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className="text-red-500 mt-4">{error}</p>
            </div>
        );
    }

    return (
        <div className='my-10'>
            <div className='text-center py-8'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Sau đây là những sản phẩm mới nhất của JERSEYSHOP
>>>>>>> 4d166ce (test)
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
<<<<<<< HEAD
                {
                    products.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
=======
                {products.map((item) => (
                    <ProductItem
                        key={item._id}
                        id={item._id}
                        image={item.images?.[0] || '/default-image.jpg'}
                        name={item.name}
                        price={item.price}
                    />
                ))}
>>>>>>> 4d166ce (test)
            </div>
        </div>
    );
};

export default LastestCollection;
