import React, { useState } from 'react';

import {MdShoppingBasket,MdAdd,MdLogout} from 'react-icons/md';
import {motion} from 'framer-motion';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import Logo from '../img/img/Logo.png';
import Avater from '../img/img/avatar.png';


import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';





const Header = () => {
    
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user,cartShow,cartItems},dispatch] = useStateValue();

    // this state is to keep track of the clicked new item to then be able to createContent
    const [isMenu, setisMenu] = useState(false);

    const login = async () => {
       if (!user) {
        const {
            user: {refreshToken, providerData},} = await signInWithPopup(firebaseAuth,provider);
        dispatch(
            {
                type: actionType.SET_USER,
                user: providerData[0],
            });

        localStorage.setItem("user", JSON.stringify(providerData[0]));
        
       } else{
        setisMenu(!isMenu)
       }
    };

    const logout = () => {
        setisMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null
        })
    }

    const showCart = () => {
        dispatch(
            {
                type: actionType.SET_CART_SHOW,
                cartShow: !cartShow,
            });

    }
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
    <header  className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
        {/* this is for desktop and tablet */}
        <div className='hidden md:flex w-full h-full items-center justify-between   '>
            <Link to={'/'} className='flex items-center gap-2'>
                <img src={Logo} alt="logo" className='w-16 rounded-3xl object-cover' />
                
            </Link>
            <div className='flex items-center gap-8'>
                {/* nav bar components */}
            <motion.ul 
            initial={{opacity: 0 , x : 200}} 
            animate={{opacity: 1 , x : 0}} 
            exit={{opacity: 0 , x : 200}} 
            
            
            className='flex items-center gap-8  '>
                <li className='text-base text-textColor hover:text-headingColor duration-100 cursor-pointer'><button onClick={() => scrollToSection('home')}>Home</button></li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 cursor-pointer'><button onClick={() => scrollToSection('menu')}>Menu</button></li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 cursor-pointer'><button onClick={() => scrollToSection('about')}>About Us</button></li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 cursor-pointer'><button onClick={() => scrollToSection('contact')}>Contact Us</button></li>
            </motion.ul>
            {/* img and cart components */}
            <motion.div whileTap={{scale : 0.6}} className='relative flex items-center justify-center '
            onClick={showCart}
            >
                <MdShoppingBasket className='text-textColor text-2xl  cursor-pointer'/>

                {cartItems && cartItems.length > 0 && (
                        <div className=' absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-cartNumBg'>
                        <p className=' text-xs flex items-center justify-center text-white font-semibold '>{cartItems.length}</p>
                    </div>
                    )}
            </motion.div>
            
          <div className='relative'>
          <motion.img whileTap={{scale : 0.6}} 
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'  
            src={user ? user.photoURL: Avater} alt="AvaterPhoto" 
            onClick={login}
            />
            {
                isMenu && (
                    <motion.div 
                    initial={{opacity : 0, scale: 0.6}}
                    animate={{opacity : 1, scale: 1}}
                    exit={{opacity : 0, scale: 0.6}}

                    className=' flex flex-col w-40 bg-primary shadow-xl rounded-lg absolute top-12 right-0 '>
                {motion.
                    user && user.email === "mduduzindlovu61@gmail.com" && (
                        <Link to={'/createItem'}>
                            <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base  '
                            
                            onClick={ () => setisMenu(false)} 
                            >New Item<MdAdd/></p>
                        
                        </Link>
                    )
                }
                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base '>Log Out<MdLogout/></p>

            </motion.div>
                )
            }

          </div>

            </div>
        </div>

        {/* this is for mobile */}
        <div className='flex items-center justify-between md:hidden w-full h-full'>

        <motion.div whileTap={{scale : 0.6}} className='relative flex items-center justify-center '
        onClick={showCart}
        >
                <MdShoppingBasket className='text-textColor text-2xl  cursor-pointer'/>

                {cartItems && cartItems.length > 0 && (
                        <div className=' absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-cartNumBg'>
                        <p className=' text-xs flex items-center justify-center text-white font-semibold '>{cartItems.length}</p>
                    </div>
                    )}
            </motion.div>
            
        <Link to={'/'} className='flex items-center gap-2'>
                <img src={Logo} alt="logo" className='w-8 object-cover'/>
                <p className='text-headingColor text-xl font-bold '>City</p>
            </Link>

            

            

            <div className='relative'>
          <motion.img whileTap={{scale : 0.6}} 
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'  
            src={user ? user.photoURL: Avater} alt="AvaterPhoto" 
            onClick={login}
            />
            {
                isMenu && (
                    <motion.div 
                    initial={{opacity : 0, scale: 0.6}}
                    animate={{opacity : 1, scale: 1}}
                    exit={{opacity : 0, scale: 0.6}}

                    className=' flex flex-col w-40 bg-primary shadow-xl rounded-lg absolute top-12 right-0 '>
                {
                    user && user.email === "mduduzindlovu61@gmail.com" && (
                        <Link to={'/createItem'}>
                            <p className='m-2 p-2 rounded-md shadow-md px-4 py-2 flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-400 transition-all duration-100 ease-in-out text-textColor text-base '>New Item<MdAdd/></p>
                        
                        </Link>
                    )
                }

                <ul className='flex flex-col  '>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 cursor-pointer hover:bg-slate-300 transition-all  ease-in-out rounded px-4 py-2' onClick={ () => setisMenu(false)} >Home</li>
                    <li className='text-base text-textColorS hover:text-headingColor duration-100 cursor-pointer hover:bg-slate-300 transition-all  ease-in-out rounded px-4 py-2' onClick={ () => setisMenu(false)} >Menu</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 cursor-pointer hover:bg-slate-300 transition-all  ease-in-out rounded px-4 py-2' onClick={ () => setisMenu(false)} >About Us</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 cursor-pointer hover:bg-slate-300 transition-all  ease-in-out rounded px-4 py-2' onClick={ () => setisMenu(false)} >Contact Us</li>
                            </ul>
                <p className='m-2 p-2 rounded-md shadow-md px-4 py-2 flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-400 transition-all duration-100 ease-in-out text-textColor text-base ' onClick={logout}>Log Out<MdLogout/></p>

            </motion.div>
                )
            }

          </div>



        </div>
    </header>
  )
}

export default Header;