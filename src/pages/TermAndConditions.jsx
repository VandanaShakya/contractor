import React from 'react'

const TermAndConditions = () => {
  return (
    <div>
    <div
      className="min-h-screen bg-gradient-to-b from-[#d3f5f3] to-white py-16 px-6"
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-semibold text-[#00BFB6] mb-6 text-center">
          Terms and Conditions
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          Please read these Terms and Conditions carefully before using our website or services.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms and Conditions govern your use of our website and services. 
            By accessing or using our site, you agree to comply with and be bound by these terms. 
            If you disagree with any part of the terms, you may not use our website.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">
            2. Use of Our Services
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to use our services only for lawful purposes and in a manner that does not 
            infringe upon the rights of others or restrict their use and enjoyment of the website. 
            Misuse or unauthorized access is strictly prohibited.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">
            3. Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content, design, logos, and other materials displayed on this website are the 
            intellectual property of our company. You may not reproduce, distribute, or create 
            derivative works without our prior written consent.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">
            4. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We strive to ensure that the information provided on our website is accurate and up to date. 
            However, we make no warranties regarding its completeness or accuracy. We shall not be liable 
            for any damages arising from the use or inability to use our services.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">
            5. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. Changes will be effective 
            immediately upon posting. Continued use of the website after modifications constitutes 
            acceptance of the updated terms.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">
            6. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms and Conditions, please contact us at{" "}
            <a href="mailto:support@example.com" className="text-[#00BFB6] underline">
              support@example.com
            </a>.
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TermAndConditions
