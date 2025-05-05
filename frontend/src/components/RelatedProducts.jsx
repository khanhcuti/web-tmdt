<<<<<<< HEAD
import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if(products.length > 0){
            var productCopy = products.slice();

            productCopy = productCopy.filter((item) => category === item.category);
            productCopy = productCopy.filter((item) => subCategory === item.subCategory);

            setRelated(productCopy.slice(0, 5));
        }
    }, [products])

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts
=======
import React, { useState, useEffect } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/products');
        
        if (!res.ok) {
          throw new Error('Không thể tải sản phẩm liên quan');
        }

        const data = await res.json();
        
        // Lọc sản phẩm cùng category và loại bỏ sản phẩm hiện tại
        const filtered = data
          .filter(product => 
            product.category === category && 
            product._id !== currentProductId
          );

        // Random 4 sản phẩm
        const randomized = filtered
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setRelatedProducts(randomized);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchRelatedProducts();
    }
  }, [category, currentProductId]);

  if (!category || relatedProducts.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="my-24">
        <div className="text-center">
          <Title text1={'RELATED'} text2={'PRODUCTS'} />
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-24">
        <div className="text-center">
          <Title text1={'RELATED'} text2={'PRODUCTS'} />
          <p className="text-red-500 mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-24">
      <div className="text-center mb-12">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
>>>>>>> 4d166ce (test)
