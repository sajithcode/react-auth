import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import ProtectedRoutes from './pages/utils/ProtectedRoutes';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Register from './pages/Register';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectedRoutes />} >
          <Route path='/' index element={<Home />} />
          <Route path="/contact" element={<Profile />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
