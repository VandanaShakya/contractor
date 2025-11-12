import React from 'react'

const Privacy = () => {
  return (
    <div>
       <div className="min-h-screen bg-gradient-to-b from-[#d3f5f3] to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#00BFB6] mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          Your privacy matters to us. This Privacy Policy explains what personal data we
          collect, how we use it, and your rights.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">1. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            We may collect personal information when you contact us, subscribe to newsletters,
            make donations, apply for services, or interact with our site (name, email, phone,
            payment details when necessary). We also collect non-personal data (analytics, device,
            browser, IP) to improve site performance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed">
            Information is used to respond to inquiries, provide services, process donations,
            send updates, fulfil legal obligations, and improve user experience. We do not sell
            personal data to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">3. Cookies & Tracking</h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar technologies for functionality, analytics, and marketing.
            You can control cookies through your browser settings; however disabling some cookies
            may affect site functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">4. Sharing & Third Parties</h2>
          <p className="text-gray-700 leading-relaxed">
            We may share data with trusted service providers (payment processors, analytics,
            hosting) for performance of services. We require vendors to protect data and use it
            only for permitted purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">5. Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable security measures to protect personal data. No system is
            100% secure — if a breach occurs we will notify affected users and authorities as
            required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">6. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our services are not directed at children under 13. We do not knowingly collect
            personal information from children. If discovered, we will promptly delete it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You may request access, correction, deletion, or portability of your data, or object to
            processing. To exercise these rights, contact us (details below). We respond to requests
            within applicable legal timeframes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">8. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this policy from time to time. We will post the updated policy on this page
            and indicate the date of the latest revision.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00BFB6] mb-3">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            For privacy requests or questions, email{" "}
            <a href="mailto:privacy@yourdomain.org" className="text-[#00BFB6] underline">
              privacy@yourdomain.org
            </a>{" "}
            or write to: Your Organization, 123 Main St, City, Country.
          </p>
        </section>
      </div>
    </div>
    </div>
  )
}

export default Privacy
