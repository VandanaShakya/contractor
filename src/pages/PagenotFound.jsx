import React from 'react'
import { Link } from "react-router-dom";


const PagenotFound = () => {
  return (
     <div
      className="flex flex-col items-center justify-center min-h-screen text-center p-6"
      style={{
        background: "linear-gradient(to bottom right, #d3f5f3, #b3e5fc)",
      }}
    >
      <h1 className="text-6xl font-extrabold mb-4" style={{ color: "#00BFB6" }}>
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#00BFB6] text-white font-medium rounded-full shadow hover:bg-[#00a39c] transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default PagenotFound
