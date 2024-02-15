import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><HomePage/><Footer/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
