// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/login'; 
import Signup from './components/signup'; 
import Home from './components/home'
import Puppeteer from './components/puppeteer';
import Welcome from './components/welcome'


function App() {
  return (
    <Router>
      <Routes>
     
       
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/home" element={<Home/>} />
        <Route path="puppeteer" element={<Puppeteer/>}/>
        <Route path="/welcome" element={<Welcome/>}/>
      </Routes>
    </Router>
  );
}

export default App;
