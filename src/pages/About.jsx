import React, { useState } from "react";
import { motion } from "framer-motion";
import { teamMembers, pricingPlans, testimonials } from "../data/data";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import images from "../assets/images";

const PRIMARY_COLOR = "#00BFB6";

const About = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = testimonials[currentSlideIndex];

  return (
    <>
      {/* HERO SECTION */}
      <motion.div
        className="relative h-[70vh] w-full overflow-hidden font-['Inter']"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0">
          <img
            src={images.aboutHeroImg}
            alt="Construction site background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1920x1080/4F46E5/ffffff?text=Construction+Site";
            }}
          />
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            About Us
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base tracking-wider font-medium drop-shadow-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <a
              href="/"
              className="hover:text-[#00BFB6] transition duration-300"
            >
              Home
            </a>{" "}
            <span className="mx-1 sm:mx-2">/</span>{" "}
            <a
              href="/contact-us"
              className="hover:text-[#00BFB6] transition duration-300"
            >
              Contact Us
            </a>
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-50 rounded-b-[50px] shadow-inner transform translate-y-full"></div>
      </motion.div>

      {/* TEAM SECTION */}
      <div className="w-full bg-gray-50">
        <div className="w-full sm:w-[90%] md:w-[69%] mx-auto py-12 px-4 sm:px-0 font-['Inter']">
          <motion.header
            className="text-center max-w-full sm:max-w-3xl mx-auto mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h1
              style={{ color: PRIMARY_COLOR }}
              className="text-3xl sm:text-4xl font-extrabold mb-4"
            >
              Our team
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 max-w-full sm:max-w-2xl mx-auto">
              We specialize in a wide range of construction services, including residential, commercial, and industrial projects.
            </p>
          </motion.header>

          <div className="max-w-full sm:max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 w-full"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <motion.img
                      src={member.imageUrl}
                      alt={member.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x500/00BFB6/ffffff?text=${member.name.replace(
                          " ",
                          "+"
                        )}`;
                      }}
                      initial={{ scale: 1.02, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">
                      {member.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">{member.role}</p>

                    <div className="flex space-x-2 justify-center sm:justify-start">
                      <a
                        href="#"
                        aria-label="Facebook Profile"
                        className={`p-2 border border-gray-300 rounded-full text-gray-500 hover:text-[${PRIMARY_COLOR}] hover:border-[${PRIMARY_COLOR}] transition duration-300`}
                      >
                        <Facebook className="w-4 h-4" />
                      </a>

                      <a
                        href="#"
                        aria-label="Instagram Profile"
                        className={`p-2 border border-gray-300 rounded-full text-gray-500 hover:text-[${PRIMARY_COLOR}] hover:border-[${PRIMARY_COLOR}] transition duration-300`}
                      >
                        <Instagram className="w-4 h-4" />
                      </a>

                      <a
                        href="#"
                        aria-label="LinkedIn Profile"
                        className={`p-2 border border-gray-300 rounded-full text-gray-500 hover:text-[${PRIMARY_COLOR}] hover:border-[${PRIMARY_COLOR}] transition duration-300`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="bg-blue-50 py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="relative mb-6 lg:mb-0">
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl relative z-10"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
                  alt="Construction workers at site"
                  className="w-full h-full object-cover max-h-[400px] sm:max-h-[500px] lg:max-h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl z-20 text-center w-28 sm:w-36 md:w-40 transform"
                initial={{ scale: 0.96, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <p className="text-3xl sm:text-5xl font-bold text-gray-900">25+</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                  Years Of <br /> Experience
                </p>
              </motion.div>
            </div>

            {/* Right Column */}
            <motion.div
              className="lg:pl-4"
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-orange-500 mb-2">
                Our History
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                Crafting structures that last a lifetime
              </h2>
              <div className="text-sm sm:text-base text-gray-600 space-y-4">
                <p>
                  We specialize in a wide range of <b>construction services</b>,
                  including residential, commercial, and industrial projects.
                  From initial design to final inspection, we work closely with
                  our clients to understand their unique needs and vision.
                </p>
                <p className="italic text-gray-500 text-xs sm:text-sm">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <motion.div
        className="py-12 sm:py-16 lg:py-24 bg-gray-50"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="mx-auto max-w-full sm:max-w-[90%] md:max-w-[69%] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Pricing Plans
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className="flex flex-col rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {plan.title}
                </h3>
                <div className="mt-2 sm:mt-4 flex flex-col items-start">
                  <p className={`text-3xl sm:text-5xl font-extrabold ${plan.priceGradient}`}>
                    {plan.price}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-light text-gray-500">
                    {plan.frequency}
                  </p>
                </div>

                <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-4 flex-grow">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 sm:mt-6">
                  <button
                    className={`w-full rounded-full py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-lg font-bold text-white shadow-lg transition duration-150 transform hover:scale-[1.02] ${plan.buttonGradient}`}
                  >
                    Start Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* TESTIMONIALS SECTION */}
      <motion.section
        className={`relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${currentSlide.bgColor} shadow-xl overflow-hidden`}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-full sm:max-w-[90%] md:max-w-[68%] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 lg:gap-20">
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-2xl">
              <motion.img
                key={currentSlideIndex}
                src={currentSlide.imageSrc}
                alt={currentSlide.altText}
                className="w-full h-full object-cover min-h-[200px] sm:min-h-[300px] md:min-h-[500px]"
                onError={(e) =>
                  (e.target.src =
                    "https://placehold.co/500x700/6A5ACD/ffffff?text=Image+Not+Found")
                }
                initial={{ opacity: 0, scale: 1.02 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <div className="w-full md:w-1/2 py-4 sm:py-6">
              <motion.div
                key={currentSlideIndex + 1}
                className="transition-opacity duration-700"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#31395E] leading-tight mb-4 sm:mb-6">
                  {currentSlide.heading}
                </h1>

                <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-8 leading-relaxed">
                  {currentSlide.description}
                </p>

                <ul className="space-y-2 sm:space-y-4">
                  {currentSlide.services.map((service, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm sm:text-lg font-semibold text-gray-800"
                    >
                      <service.icon
                        className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BFA6] mr-2 sm:mr-3 flex-shrink-0"
                        aria-hidden="true"
                      />
                      {service.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center mt-4 sm:mt-8 space-x-2 sm:space-x-4 pt-2 sm:pt-4 border-t border-gray-100">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-colors duration-300 ${
                  index === currentSlideIndex
                    ? "bg-[#00BFA6]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default About;
