<<<<<<< HEAD
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt='' />
            </div>

            <p className='pt-3 pb-1 text-sm'>{name}</p>

            <p className='text-sm font-medium'>{price}{currency}</p>
        </Link>
    )
}

export default ProductItem
=======

import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const imageUrl = image
    ? (Array.isArray(image) ? image[0] : image)
    : '/default-image.jpg';

  const finalImage = imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000/${imageUrl}`;

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='w-full h-[350px] overflow-hidden rounded-md'>
        <img
          className='w-full h-full object-cover transition-transform hover:scale-110'
          src={finalImage}
          alt={name || 'Sản phẩm'}
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name || 'Tên sản phẩm'}</p>
      <p className='text-sm font-medium'>{price ? `${price}${currency}` : 'Liên hệ'}</p>
    </Link>
  );
};

export default ProductItem;
>>>>>>> 4d166ce (test)
