// import React from 'react'
// import { useState } from 'react'
// import Axios from "axios";
import { Routes,Route, BrowserRouter,HashRouter, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Notes from './Notes';
import Arch from './Arch'
import Recycle from './Recycle'
function App() {
  return (
    <HashRouter>
    <Routes>
    <Route path='*' element={<Navigate to='/' />}></Route>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/notes' element={<Notes/>}></Route>
      <Route path='/archived' element={<Arch/>}></Route>
      <Route path='/recycle' element={<Recycle/>}></Route>
    </Routes>
    </HashRouter>

  )
}

export default App;
