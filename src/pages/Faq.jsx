import React, { useState } from 'react'
import images from '../assets/images'
import {faqData} from '../data/data'
import { motion, AnimatePresence } from 'framer-motion'



const Faq = () => {

  const [openId, setOpenId] = useState(null);

  // 3. Toggle handler function
  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
   <>
     <div className="relative h-[70vh] w-full overflow-hidden font-['Inter']">
      
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <img
          src={images.aboutHeroImg}
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
         Faq
        </h1>
        
        {/* Breadcrumb Navigation */}
        <p className="text-base sm:text-lg tracking-wider font-medium drop-shadow-md">
          <a href="/" className="hover:text-[#00BFB6] transition duration-300">
            Home
          </a> 
          <span className="mx-2">/</span>
            <a href="/contact-us" className="hover:text-[#00BFB6] transition duration-300">
            Contact Us
          </a> 
        </p>
      </div>

      {/* Rounded Bottom Corner (Mimics the image style) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-50 rounded-b-[50px] shadow-inner transform translate-y-full"></div>
    </div>


    {/* faq second section */}

<div className="w-[66%] mx-auto px-4 py-16 lg:py-24">
  <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
    {/* === LEFT SIDE: Header and Chat Prompt === */}
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.h1
        className="text-3xl font-semibold leading-tight text-gray-900 md:text-7xl lg:text-6xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, delay: 0.05 }}
      >
        Frequently <br /> Asked Questions
      </motion.h1>

      <motion.div
        className="mt-12 lg:mt-24"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.12 }}
      >
        <p className="text-lg font-medium text-gray-700">Can't find what you are looking for?</p>
        <p className="text-2xl font-semibold text-gray-900">We would like to chat with you.</p>

        {/* Chat Icon and Arrow */}
        <div className="mt-6 flex items-start">
          <motion.div
            className="h-16 w-16 rounded-xl bg-blue-600 p-4 shadow-lg flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            {/* Simplified Chat Icon SVG */}
            <svg className="h-full w-full text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2h8v2H6zm12-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </motion.div>

          <motion.svg
            className="h-20 w-20 -translate-x-4 -translate-y-3 transform text-gray-900"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.22 }}
          >
            <path d="M10 80 C 40 100, 70 90, 90 20" stroke="currentColor" strokeWidth="2" fill="none" />
            <polygon points="88,20 80,25 90,27" fill="currentColor" />
          </motion.svg>
        </div>
      </motion.div>
    </motion.div>

    {/* === RIGHT SIDE: Search and FAQ List === */}
    <motion.div
      className="lg:pt-[100px]"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6 }}
    >
      {/* Search Bar */}
      <div className="relative mb-8 border-b border-gray-300">
        <motion.input
          type="text"
          placeholder="What are you looking for?"
          className="w-full py-4 pl-12 pr-4 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0"
          aria-label="Search FAQs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
        />
        {/* Search Icon SVG */}
        <svg className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openId === item.id;

          return (
            <motion.div
              key={item.id}
              className="border-b border-gray-200"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <button
                className="flex w-full items-center justify-between py-5 text-left transition-colors duration-300 focus:outline-none"
                onClick={() => toggleFaq(item.id)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center">
                  {/* Accordion Icons */}
                  {isOpen ? (
                    <svg className="mr-4 h-5 w-5 flex-shrink-0 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  ) : (
                    <svg className="mr-4 h-5 w-5 flex-shrink-0 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                  <span className="text-xl font-medium text-gray-900 md:text-lg">{item.question}</span>
                </div>

                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="ml-4">
                  <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
                  </svg>
                </motion.div>
              </button>

              {/* The Answer Content (AnimatePresence for smooth height + fade) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.32 }}
                    className="pb-6 pl-9 pr-4 text-gray-700 overflow-hidden"
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </div>
</div>

   </>
  )
}

export default Faq
