import React from 'react'
import images from '../assets/images';


const instagramSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
  <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" stroke-width="1.6" fill="none"/>
  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6" fill="none"/>
  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
</svg>`;

const facebookSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
  <path d="M15 3h3v4h-3v14h-4V7H9V4h3V2.5C12 1 13 0 15 0h0v3z" fill="currentColor" />
</svg>`;

const xSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const githubSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
  <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.5.7-4.2-1.7-4.2-1.7-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.7.8 2 1.2.6 1 .8 1.1 2 1.2 0 0 1.5 0 3.1-2 0 0 .4-.7 1.3-1.3-2.7-.3-5.6-1.3-5.6-5.9 0-1.3.5-2.3 1.3-3.2-.1-.3-.6-1.6.1-3.4 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18 5.9 19 6 19 6c.7 1.8.3 3.1.1 3.4.8.9 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.7 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" fill="currentColor"/>
</svg>`;

const linkedinSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
  <path d="M4 4h4v16H4zM6 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 8h3.6v2.2h.1c.5-.9 1.6-1.8 3.3-1.8 3.6 0 4.2 2.4 4.2 5.5V20h-4v-5.1c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.6V20h-4V8z" fill="currentColor"/>
</svg>`;

const PRIMARY_COLOR = '#00BFB6';


const Form = () => {
  return (
    <div>
       <div className="relative bg-[#eaf8ff] min-h-screen">
      {/* Left dotted/world background pattern (SVG) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-full w-full opacity-30"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMinYMin slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#cfeef6" />
            </pattern>
            <linearGradient id="fade" x1="0" x2="1">
              <stop offset="0%" stopColor="#eaf8ff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* large pale fill */}
          <rect width="1200" height="800" fill="url(#fade)" />

          {/* dotted shapes on left and center */}
          <g transform="translate(30,40)">
            <rect x="0" y="0" width="520" height="720" fill="url(#dots)" />
          </g>

          <g transform="translate(420,80)" opacity="0.45">
            <rect x="0" y="0" width="360" height="620" fill="url(#dots)" />
          </g>
        </svg>
      </div>

      {/* Main container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Large white contact card (left) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16">
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-3">
                Ready to get started?
                <br />
                <span className="block">let's chat.</span>
              </h3>

              <p className="text-sm md:text-base text-slate-500 mb-8 max-w-2xl">
                Please fill out the form below, and a member of our team will get
                back to you as soon as possible.
              </p>

              {/* form */}
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    className="border-b border-slate-200 focus:border-slate-300 outline-none py-3 placeholder:text-slate-300"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="border-b border-slate-200 focus:border-slate-300 outline-none py-3 placeholder:text-slate-300"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="border-b border-slate-200 focus:border-slate-300 outline-none py-3 placeholder:text-slate-300"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="border-b border-slate-200 focus:border-slate-300 outline-none py-3 placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Message"
                    className="w-full resize-none border-b border-slate-200 focus:border-slate-300 outline-none py-4 placeholder:text-slate-300"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-[#00BFB6] hover:bg-[#00BFA6] hover: cursor-pointer text-white font-semibold py-3 px-6 rounded-lg shadow"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right tall navy card */}
          <aside className="lg:col-span-5 flex justify-end">
            <div className="w-full max-w-md">
              <div className="bg-[#0f2740] rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 text-center">
                  <h4 className="text-xl font-semibold text-white mb-6">Follow Us</h4>

                  {/* social icons */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    {[
                      { name: "instagram", svg: instagramSVG },
                      { name: "facebook", svg: facebookSVG },
                      { name: "x", svg: xSVG },
                      { name: "github", svg: githubSVG },
                      { name: "linkedin", svg: linkedinSVG },
                    ].map((s) => (
                      <button
                        key={s.name}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-[#0f2740] transition"
                        aria-label={s.name}
                        dangerouslySetInnerHTML={{ __html: s.svg }}
                        // Note: using dangerouslySetInnerHTML to keep this file self-contained
                      />
                    ))}
                  </div>

                  {/* agent image container */}
                  <div className="relative flex items-end justify-center pb-8 px-6">
                    <div className="w-56 md:w-64 lg:w-72 transform translate-y-6">
                      <img
                        src={images.contactRightImage}
                        alt="Agent"
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* small decorative dot at top center of content (like sample) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6">
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Form
