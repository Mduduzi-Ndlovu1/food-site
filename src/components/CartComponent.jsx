import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { motion } from 'framer-motion';
import {RiRefreshFill} from 'react-icons/ri'
import {BiMinus, BiPlus} from 'react-icons/bi'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const CartComponent = () => {
    const [{cartShow}, dispatch] = useStateValue();

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        })
    }
  return (
    <motion.div 
    initial={{opacity: 0, x:200}} 
    animate={{opacity: 1, x:0}} 
    exit={{opacity: 0, x:200}} 
    className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]'>
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div whileTap={{scale:0.75}}>
            <MdOutlineKeyboardBackspace className='text-textColor text-3xl' onClick={showCart}/>
            
            
            </motion.div>
            <p className='text-textColor text-lg font-semibold'>Cart</p>
            <motion.p whileTap={{scale:0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base'>Clear <RiRefreshFill/></motion.p>
        </div>
        {/* bottom section of cart */}
        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
            <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
                {/* for cart items */}
                <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
                     <img src="" alt="cartItem" className='w-20 h-20 max-w-[60px] rounded-full object-contain' />

                     {/* cart description etc */}
                     <div className='flex flex-col gap-2'>
                        <p className='text-base text-gray-50'>Choclate Vasld</p>
                        <p className='text-sm block text-gray-300 font-semibold'>R50</p>
                     </div>

                     {/* button section */}
                     <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
                        <motion.div whileTap={{scale:0.75}}>
                            <BiMinus/>

                        </motion.div>
                        <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>
                            0
                        </p>
                        <motion.div whileTap={{scale:0.75}}>
                            <BiPlus/>
                        </motion.div>
                     </div>
                </div> 
            </div>

        {/* Cart total section */}

        <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
            {/* regular subtotal */}
            <div className='w-full flex items-center justify-between'>
                <p className='text-gray-400 text-lg'> Sub Total</p>
                <p className='text-gray-400 text-lg'>R 85</p>
            </div>
            {/* Delivery option */}
            <div className='w-full flex items-center justify-between'>
                <p className='text-gray-400 text-lg'> Delivery</p>
                <p className='text-gray-400 text-lg'>R 85</p>
            </div>

            <div className='w-full border-b border-gray-600 my-2'></div>

        <div className='w-full flex items-center justify-between'>
            <p className='text-gray-200 text-xl font-semibold'>Total</p>
            <p className='text-gray-200 text-xl font-semibold'> R500</p>
        </div>
        <motion.button
            whileTap={{scale:0.8}}
            type="button"
            className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-500 text-gray-50 text-lg my-2 hover:shadown-lg transition-all duration-150 ease-out'
        > Check Out </motion.button>
        </div>
        

        

        



        </div>

        
    </motion.div>
  )
}

export default CartComponent