import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />}/>
        <Route path='/home' element ={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
