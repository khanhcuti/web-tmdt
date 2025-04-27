import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'
const Footer = () => {
    const location = useLocation(); // <- lấy thông tin url hiện tại
  
    if (location.pathname.startsWith('/admin')) {
      return null;
    }
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img className='mb-5 w-32' src={assets.logo} alt='' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>0123456789</li>
                        <li>contact@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
