
import React, { useState, useEffect} from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Help from './pages/Help'
import Contact from './pages/Contact' 
import Privacy from './pages/Privacy'
import TermAndConditions from './pages/TermAndConditions'
import Faq from './pages/Faq'
import PagenotFound from './pages/PagenotFound'
import AdminRegisterForm from './components/AdminRegisterForm'
import LoginForm from './components/LoginForm'


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div> 
     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#d3f5f3] to-[#b3e5fc]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00BFB6]"></div>
    </div>
  </div>;


  return (
    <>
        <Navbar />
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About-us' element={<About/>}/>
         <Route path='/Contact-us' element={<Contact/>}/>
          <Route path='/Help' element={<Help/>}/>
          <Route path='/terms-conditions' element={<TermAndConditions/>}/>
          <Route path='/privacy-policy' element={<Privacy/>}/>
          <Route path='/faqs' element={<Faq/>}/>
          <Route path='/admin-register' element={<AdminRegisterForm/>}/>
           <Route path='/admin-login' element={<LoginForm/>}/>

          {/* page not found */}
               <Route path="*" element={<PagenotFound />} />
               
       </Routes>
       <Footer/>
    </>
  )
}

export default App
