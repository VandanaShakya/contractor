// src/components/auth/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

// Simple email regex for basic client-side check
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- NEW: Simple regex for international phone numbers ---
// This pattern allows for an optional '+' followed by digits, spaces, hyphens, and parentheses.
const phoneRegex = /^\+?[\d\s-()]{7,20}$/; 

export default function AdminRegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: 'First admin',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
    phone: '+1234567890',
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    // Clear validation error when user starts typing
    setValidationErrors((p) => ({ ...p, [e.target.name]: null })); 
  }

  // --- UPDATED: Validation Logic Function with Phone Check ---
  const validateForm = () => {
    const errors = {};

    // Name Validation
    if (!form.name.trim()) {
      errors.name = 'Name is required.';
    } else if (form.name.length < 3) {
      errors.name = 'Name must be at least 3 characters.';
    }

    // Email Validation
    if (!form.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Password Validation
    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    // --- NEW: Phone Validation ---
    if (form.phone.trim() && !phoneRegex.test(form.phone.trim())) {
        errors.phone = 'Please enter a valid phone number (e.g., +1 555 123 4567).';
    }
    // --- END: NEW ---

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  // --- END: UPDATED Validation Logic Function ---


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Client-side validation failed. Check fields for the red borders, engineer!");
      return; 
    }

    try {
      dispatch(clearError());
      
      const resultAction = await dispatch(register(form));
      if (register.fulfilled.match(resultAction)) {
        // Success is handled by useEffect
      } else {
        console.error('Register failed', resultAction);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getInputFieldClasses = (fieldName) => 
    `mt-1 block w-full rounded-md border p-2 focus:ring-[#00BFB6] focus:border-[#00BFB6] ${
        validationErrors[fieldName] ? 'border-red-500' : 'border-gray-300'
    }`;


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            User Registration
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              className={getInputFieldClasses('name')} required />
            {validationErrors.name && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email"
              className={getInputFieldClasses('email')} required />
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password" value={form.password} onChange={handleChange} type="password"
              className={getInputFieldClasses('password')} required />
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
            )}
          </div>

          {/* Role Field (No validation needed here as it has a default) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select name="role" value={form.role} onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 py-2.5 bg-white focus:ring-[#00BFB6] focus:border-[#00BFB6]">
              <option value="admin">admin</option>
              <option value="editor">editor</option>
              <option value="viewer">viewer</option>
            </select>
          </div>

          {/* Phone Field (NOW VALIDATED) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} type="tel"
              className={getInputFieldClasses('phone')} />
            {validationErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
            )}
          </div>

          {/* Global/Server Error Message (from Redux) */}
          {error && <p className="text-red-600 text-sm mt-4 text-center">{error.message || 'Registration failed'}</p>}

          {/* Submit Button */}
          <button type="submit"
            className="w-full rounded-full px-4 py-3 bg-[#00BFB6] text-white font-bold mt-6 hover:bg-[#00a8a0] transition duration-150 disabled:opacity-60"
            disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}