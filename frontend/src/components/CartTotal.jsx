<<<<<<< HEAD
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{getCartAmount()}{currency}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping fee</p>
                    <p>{delivery_fee}{currency}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}{currency}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
=======
import React from 'react';

const CartTotal = ({ cartItems }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 500000 ? 0 : 10000;
  const total = subtotal + shippingFee;

  return (
    <div className="border p-4">
      <h3 className="text-lg font-semibold mb-4">CART TOTAL</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{subtotal.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping fee:</span>
          <span>{shippingFee.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span>Total:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
>>>>>>> 4d166ce (test)
