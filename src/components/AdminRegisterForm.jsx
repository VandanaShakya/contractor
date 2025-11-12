// src/components/auth/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react"; 



// Simple email regex for basic client-side check
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple regex for international phone numbers
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [autoRedirectTimer, setAutoRedirectTimer] = useState(null);
const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);



  useEffect(() => {
    // If user becomes authenticated (e.g. via login), go to dashboard
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
    return () => {
      // clear any server error when component unmounts
      dispatch(clearError());
      if (autoRedirectTimer) clearTimeout(autoRedirectTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    // Clear validation error when user starts typing
    setValidationErrors((p) => ({ ...p, [e.target.name]: null }));
  };

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

    // Phone Validation
    if (form.phone.trim() && !phoneRegex.test(form.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (e.g., +1 555 123 4567).';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Client-side validation failed. Check fields for the red borders, engineer!');
      return;
    }

    try {
      dispatch(clearError());

      const resultAction = await dispatch(register(form));

      if (register.fulfilled.match(resultAction)) {
        // show success popup/modal
        setShowSuccess(true);
        // auto-redirect to /login after 1.5s (user can click the button to go immediately)
        const t = setTimeout(() => {
          setShowSuccess(false);
          navigate('/admin-login', { replace: true });
        }, 1500);
        setAutoRedirectTimer(t);
      } else {
        // register rejected — resultAction contains payload or error info
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

  // Helper to render server/global error (handles string or object)
  const renderErrorText = (err) => {
    if (!err) return null;
    if (typeof err === 'string') return err;
    if (err.message) return err.message;
    return 'Registration failed';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className={getInputFieldClasses('name')} required />
            {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" className={getInputFieldClasses('email')} required />
            {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
          </div>

          {/* Password Field */}
         <div className="relative">
               <label className="block text-sm font-medium">Password</label>
               <input
                 name="password"
                 value={form.password}
                 onChange={handleChange}
                 type={showPassword ? "text" : "password"}
                 className="mt-1 block w-full rounded-md border border-gray-300 p-2 pr-10 focus:ring-[#00BFB6] focus:border-[#00BFB6]"
                 required
               />
         
               {/* Eye icon */}
               <button
                 type="button"
                 onClick={togglePassword}
                 className="absolute right-3 top-[35px] text-gray-500 hover:text-[#00BFB6]"
               >
                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
               </button>
             </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2 py-2.5 bg-white focus:ring-[#00BFB6] focus:border-[#00BFB6]">
              <option value="admin">admin</option>
              <option value="editor">editor</option>
              <option value="viewer">viewer</option>
            </select>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} type="tel" className={getInputFieldClasses('phone')} />
            {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
          </div>

          {/* Global/Server Error Message (from Redux) */}
          {error && <p className="text-red-600 text-sm mt-4 text-center">{renderErrorText(error)}</p>}

          {/* Submit Button */}
          <button type="submit" className="w-full rounded-full px-4 py-3 bg-[#00BFB6] text-white font-bold mt-6 hover:bg-[#00a8a0] transition duration-150 disabled:opacity-60" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowSuccess(false); if (autoRedirectTimer) { clearTimeout(autoRedirectTimer); navigate('/login', { replace: true }); } }} />
          <div className="relative z-10 max-w-sm w-full bg-white rounded-lg p-6 shadow-2xl text-center">
            <h3 className="text-lg font-semibold mb-2 text-green-600">Registration Successful</h3>
            <p className="text-sm text-gray-600 mb-4">Your account was created successfully. Redirecting to login...</p>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => {
                  setShowSuccess(false);
                  if (autoRedirectTimer) clearTimeout(autoRedirectTimer);
                  navigate('/admin-login', { replace: true });
                }}
                className="px-4 py-2 rounded-full bg-[#00BFB6] text-white font-medium hover:bg-[#00a8a0] transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
