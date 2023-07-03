import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { MdFastfood,MdCloudUpload,MdDelete,MdFoodBank,MdAttachMoney } from 'react-icons/md';
import { catergories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { snapshotEqual } from 'firebase/firestore';
import { getAllFoodItems, saveItem } from '../utils/FirebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory]=  useState(null);
  const [fields, setFields]=useState(false);
  const [alertStatus, setalertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAssest, setImageAsset] = useState(null);
  const [{}, dispatch] = useStateValue();


  const uploadImage = (e) =>{
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage,`Image/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef,imageFile);

    uploadTask.on('state_changed',(snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },(error) => {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading: Try again');
      setalertStatus("danger")
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)}, 
        4000);
    },() =>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true)
        setMsg("Image uploaded sucessfully");
        setalertStatus('success');
        setTimeout(() =>{
          setFields(false)
        },4000);

      })
    })
    
  };
  const deleteImage = () =>{
    setIsLoading(true);
    const deleteRef = ref(storage, imageAssest);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
        setMsg("Image deleted sucessfully");
        setalertStatus('success');
        setTimeout(() =>{
          setFields(false)
        },4000);

    })
  }
  const saveDetails = () =>{
    setIsLoading(true);
    try {
      if (!title || !calories  || !price  || !imageAssest || !category ) {
        setFields(true);
      setMsg("Required Fields can't be empty");
      setalertStatus("danger")
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)}, 
        4000);
      }
      else{
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL : imageAssest,
          category: category,
          calories: calories,
          qty: 1,
          price: price
        }
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded sucessfully");
        
        setalertStatus('success');
        setTimeout(() =>{
        setFields(false);
        clearData();
            
          },4000);

          fetchData();
      }
      
      
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading: Try again');
      setalertStatus("danger")
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)}, 
        4000);
      
    }
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("");
  };

  

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems : data
      })

    })
  };

  return (
    <div className='w-full min-h-screen  flex items-center justify-center'>
      {/* for small screen */}
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
        {
          fields && (
            <motion.p initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}            
            
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
              {msg}
            </motion.p>
          )
        }
        {/* for giving title */}
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdFastfood className='text-xl text-gray-700'/>
          <input type="text" required value={title} placeholder='Give me a title....' 
          className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'
          onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* for selecting catergories */}
        <div className='w-full'>
          <select onChange={(e) => setCategory(e.target.value) } className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer' >
            <option value="other" className='bg-white'>Select Catergory</option>
            {catergories && catergories.map(item => (
              <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor' value={item.urlParaName}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* for inserting img */}

        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
          {isLoading ? ( <Loader/> ): (
          <>
              {!imageAssest ? (<>
                <label htmlFor="" className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                  <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                    <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>
                    <input type="file"
                  name='uploadimage'
                  accept='image/*'
                  onChange={uploadImage}
                  className='w-80 h-80' />
                  
                  </div>

                </label>
              </> ) : (
              <>
              <div className='relative h-full'>
                <img src={imageAssest} alt="Uploaded " className='w-full h-full object-cover'/>
                <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                onClick={deleteImage}> <MdDelete className='text-white'/></button>
              </div>
              
              </>)}
          </>)}

        </div>

        {/* for inserting calories */}
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdFoodBank className='text-gray-700 text-2xl'/>
            <input type="text" required placeholder='Calories' name="" id=""
            className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'
             value={calories}
             onChange={(e) => setCalories(e.target.value)}
             />
          </div>

        </div>

        {/* for inserting price */}
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdAttachMoney className='text-gray-700 text-2xl'/>
            <input type="text" required placeholder='Enter Price' name="" id=""
            className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
          </div>

        </div>

       {/* for saving information */}
       <div className='flex items-center w-full'>
        <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' 
        onClick={saveDetails}>
          Save
        </button>

       </div>
      </div>
       
    </div>
  )
}

export default CreateContainer