import React from 'react'

const Newletterbox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-700'> Subscribe now & get 20% off</p>
            
            <p className='text-gray-400 mt-3'>
<<<<<<< HEAD
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.    
=======
            JERSEYSHOP đã có trên 10 năm kinh nghiệm trong lĩnh vực quần áo bóng đá – giày đá banh – đồng phục thể thao tại TpHCM được nhiều khách hàng, đối tác gần xa tin tưởng..    
>>>>>>> 4d166ce (test)
            </p>

            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-full'>
                <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' />
                <button className='bg-black text-white text-xs px-10 py-4 cursor-pointer rounded-r-full' type='submit'>SUBCRIBE</button>
            </form>
        </div>
    )
}

export default Newletterbox
