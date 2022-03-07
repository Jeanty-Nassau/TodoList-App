import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import TaskMenu from './TaskMenu';
import Nav from './Nav'
import AllMenu from './AllMenu';

function App() {
  return (
    <Router>
      <div className='w-screen h-screen flex justify-between'>
        <Nav />
        <Routes>

          <Route path='/taskMenu/:category' element={<TaskMenu />} />
          <Route path='/' element={<AllMenu />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App