import React from 'react' 
import { helpServices, blocksData } from '../data/data'
import images from '../assets/images'





const Help = () => {
  return (
    <div>


 <div className="relative h-[70vh] w-full overflow-hidden font-['Inter']">
      
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <img
          src={images.helpHeroImg}
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
        Help
        </h1>
        
        {/* Breadcrumb Navigation */}
        <p className="text-base sm:text-lg tracking-wider font-medium drop-shadow-md">
          <a href="/" className="hover:text-gray-300 transition duration-300">
            Home
          </a> 
          <span className="mx-2">/</span>
          <a href="contact-us" className="hover:text-gray-300 transition duration-300">
            Contact Us
          </a>
        </p>
      </div>

      {/* Rounded Bottom Corner (Mimics the image style) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-50 rounded-b-[50px] shadow-inner transform translate-y-full"></div>
    </div>


     <div className="bg-white">
  <div className="relative h-[26rem] md:h-[28rem] lg:h-[32rem] overflow-hidden flex items-center">
    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
      <div className="w-full">
        <div className="max-w-3xl">
          <p className="text-sm tracking-widest uppercase text-gray-500 mb-2">
            Welcome to Support
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight mb-4">
            Search for the solution
          </h1>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Find manuals, drivers, FAQs and self-help resources. If you still need help, contact our support team.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl border border-gray-200">
            <div className="flex items-center p-3">
              <svg
                className="w-5 h-5 text-[#00BFB6] mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Please describe your problem"
                className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button className="ml-3 bg-[#00BFB6] hover:bg-[#03a69e] text-white px-4 py-2 rounded-md transition">
                Search
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Need to check a previous case?{" "}
            <a href="#" className="text-[#00BFB6] underline font-medium">
              Check your case
            </a>
          </p>
        </div>
      </div>

      {/* Right image (optional) */}
      <div className="hidden xl:flex ml-auto items-end">
        <div className="w-[100%] h-[100%] rounded-l overflow-hidden transform translate-y-6 drop-shadow-2xl">
          <img
            src={images.helpRightImage}
            alt="agent"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>

  {/* --------------------- SERVICES ICONS --------------------- */}
  <div className="py-10 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {helpServices.map((s, idx) => (
          <a
            key={idx}
            href="#"
            className="flex flex-col items-center p-6 hover:bg-[#00BFB6]/5 rounded-lg transition"
          >
            <div className="p-4 rounded-full border border-[#00BFB6]/30 mb-3">
              <svg
                className="w-8 h-8 text-[#00BFB6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d={s.iconPath}
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  </div>
</div>



    {/* third section */}
<div className="bg-gray-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Container - Fully Responsive */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blocksData.map((block, index) => (
  <div
    key={index}
    className="
      relative flex flex-col items-start text-left p-6 sm:p-8 
      transition duration-300 group
    "
  >
    {/* Thin vertical line at left center */}
    <span
      className="
        absolute left-0 top-1/2 -translate-y-1/2
        h-1/2 w-[2px] bg-gray-300
        group-hover:bg-gray-500 transition-colors duration-300
      "
    ></span>

    {/* Image */}
    <div className="mb-4">
      <img
        src={block.imageSrc}
        alt={block.altText}
        className="h-24 w-24 object-contain"
      />
    </div>

    {/* Title */}
    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
      {block.title}
    </h3>

    {/* Description */}
    <p className="text-gray-600 text-base leading-relaxed">
      {block.description}
    </p>
  </div>
))}

        </div>
      </div>
    </div>

    </div>
  )
}

export default Help
