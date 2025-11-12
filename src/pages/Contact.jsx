import React from 'react'
import images from '../assets/images';
import Map from '../components/Map';
import Form from '../components/Form';


// import {
//   Instagram,
//   Facebook,
//   Twitter,
//   Github,
//   Linkedin,
// } from "lucide-react";


const Contact = () => {
  return (
    <div>


         <div className="relative h-[70vh] w-full overflow-hidden font-['Inter']">
      
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <img
          src={images.contactHero}
          alt="Construction site background"
          className="w-full h-full object-cover"
          // Fallback placeholder image
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/1920x1080/4F46E5/ffffff?text=Construction+Site";
          }}
        />
        
        {/* Dark Overlay with subtle gradient/opacity to ensure text visibility */}
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      </div>

      {/* Content Container - Centered and Responsive */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
         Contact Us
        </h1>
        
        {/* Breadcrumb Navigation */}
        <p className="text-base sm:text-lg tracking-wider font-medium drop-shadow-md">
          <a href="/" className="hover:text-[#00BFB6] transition duration-300">
            Home
          </a> 
          <span className="mx-2">/</span>
          <a href="about-us" className="hover:text-[#00BFB6] transition duration-300">
            About Us
          </a>
        </p>
      </div>

      {/* Rounded Bottom Corner (Mimics the image style) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-50 rounded-b-[50px] shadow-inner transform translate-y-full"></div>
    </div>



    
          <Form/>

<div className="py-16 px-4 sm:px-6 lg:px-8 bg-white font-sans">
  {/* Main Heading */}
  <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-12">
    Get In Touch
  </h2>

  {/* Contact Cards Container */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 justify-items-center">

    {/* --- 1. Address Card --- */}
    <div className="flex flex-col items-center p-4 sm:p-6 text-center w-full max-w-sm 
      bg-white shadow-xl rounded-xl transform transition-all duration-300 
      hover:-translate-y-4 hover:shadow-2xl hover:scale-[1.03]">
      
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-blue-100/50 mb-4">
        <span className="text-3xl sm:text-4xl text-blue-600">📍</span>
      </div>
      <p className="text-lg sm:text-xl font-medium text-gray-800 mb-1 leading-tight">
        123 New York, NY 60606
      </p>
      <p className="text-sm text-gray-500">
        Visit Our Office in NY
      </p>
    </div>

    {/* --- 2. Phone Card (Slightly Elevated by Default) --- */}
    <div className="flex flex-col items-center p-4 sm:p-6 text-center w-full max-w-sm 
      bg-white shadow-xl rounded-xl transform md:-translate-y-4 transition-all duration-300 
      hover:-translate-y-6 hover:shadow-2xl hover:scale-[1.03]">
      
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-blue-100/50 mb-4">
        <span className="text-3xl sm:text-4xl text-blue-600">📞</span>
      </div>
      <p className="text-lg sm:text-xl font-medium text-gray-800 mb-1 leading-tight">
        +44 0 800 555 22 11
      </p>
      <p className="text-sm text-gray-500">
        Call Us Right Now!
      </p>
    </div>

    {/* --- 3. Email Card --- */}
    <div className="flex flex-col items-center p-4 sm:p-6 text-center w-full max-w-sm 
      bg-white shadow-xl rounded-xl transform transition-all duration-300 
      hover:-translate-y-4 hover:shadow-2xl hover:scale-[1.03]">
      
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-blue-100/50 mb-4">
        <span className="text-3xl sm:text-4xl text-blue-600">✉️</span>
      </div>
      <p className="text-lg sm:text-xl font-medium text-gray-800 mb-1 leading-tight">
        ureachimm@info.com
      </p>
      <p className="text-sm text-gray-500">
        Send Us A Message
      </p>
    </div>

  </div>
</div>


    <Map/>
    </div>
  )
}

export default Contact
