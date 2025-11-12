// src/components/auth/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
  import { Eye, EyeOff } from "lucide-react"; 



export default function LoginForm() {   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: '', password: '' });
const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return alert('Enter email & password');
    try {
      const resultAction = await dispatch(login(form));
      if (login.fulfilled.match(resultAction)) {
        navigate('/', { replace: true });
      } else {
        console.error('Login failed', resultAction);
      }
    } catch (err) {
      console.error(err);
    }
    redirect("/")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-[#00BFB6] focus:border-[#00BFB6]"
              required
            />
          </div>

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

          {error && <p className="text-red-600 text-sm">{typeof error === 'string' ? error : error.message || 'Login failed'}</p>}

          <button
            type="submit"
            className="w-full rounded-full px-4 py-3 bg-[#00BFB6] text-white font-bold mt-6 hover:bg-[#00a8a0] transition duration-150 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
