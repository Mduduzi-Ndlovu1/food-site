import React from 'react';
import Header from './Header';

const ContactUs = () => {
    
  return (
    <div id='contact' className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <iframe class='w-screen h-96 rounded-lg' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14306.892281488623!2d28.2442225!3d-26.3030761!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95196c69b7d575%3A0x852ad6135b34960e!2sDawn%20Park%20Chicken%20and%20Chips!5e0!3m2!1sen!2sza!4v1686222626890!5m2!1sen!2sza" allowfullscreen="" loading="lazy"></iframe>

      <form class="mt-8 w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name
                </label>
                
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
      
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Your Message
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="..."/>
      <p class="text-gray-600 text-xs italic"></p>
    </div>
  </div>
  <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 flex'>Send</button>

  
</form>
      
    </div>
  );
};

export default ContactUs;
