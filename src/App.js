// import React from 'react'
// import { useState } from 'react'
// import Axios from "axios";
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Notes from './Notes';
import Arch from './Arch'
import Recycle from './Recycle'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/notes' element={<Notes/>}></Route>
      <Route path='/archived' element={<Arch/>}></Route>
      <Route path='/recycle' element={<Recycle/>}></Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App;
