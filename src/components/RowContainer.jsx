import React, { useRef } from 'react'
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const RowContainer = ({flag, data,scrollValue}) => {
    const rowContainer = useRef();

    const [items, setItems] = useState([])

    const [{cartItems},dispatch] = useStateValue();

    const addToCart = () => {
       

        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems : items ,
        });

        localStorage.setItem("cartItems", JSON.stringify(items))

    };
    

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    },[scrollValue]);

    useEffect(() => {
        addToCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items]
    );
    
    

  return (
    <div 
    ref={rowContainer}
    className={`w-full flex items-center gap-3 my-12 scroll-smooth ${
        flag ? 'overflow-x-scroll scrollbar-none ' : 'overflow-x-hidden flex-wrap justify-center'}`}>
{/* Catergories section */}
        {data && data.map(item => (
            // div for image
            <div key={item.id} className='w-300 min-w-[300px] md:w-300 md:min-w-[300px] my-12 h-[250px] bg-cardOverlay rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between'>
            <div className='w-full flex items-center justify-between'>

                <motion.div className='w-40 h-40 -mt-8 drop-shadow-2xl' whileHover={{scale: 1.2}}>
                <img  src={item?.imageURL} alt="" className='w-full h-full object-contain' />
                </motion.div>

                <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'
                onClick={() => setItems([...cartItems,item])}
                >
                    <MdShoppingBasket className='text-white'/>
                </motion.div>
            </div>
            {/* card details */}
            <div className='w-full flex flex-col items-end justify-end'>
                {/* title */}
                <p className='text-textColor font-semibold text-base md:text-lg'>{item?.title}</p>
                <p className='mt-1 text-sm text-gray-500'>{item?.calories}</p>
                <div className='flex items-center gap-8'>
                    <p className='text-lg text-textColor font-semibold'><span className='text-sm text-red-500'>R</span>{item?.price}</p>
                </div>

            </div>
        </div>
        ))}
    </div>
  );
};

export default RowContainer