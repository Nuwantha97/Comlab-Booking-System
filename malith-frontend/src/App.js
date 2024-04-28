import React from 'react';
import MyApp from './pages/booking'
import Home from './pages/Home'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import User from './pages/User';


function App() {
  return (
    
    <div>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/booking" element={<MyApp/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/user" element={<User/>}></Route>
         
       </Routes>
        
      </BrowserRouter>
        
        
        
      </div>
    
  );
}

export default App;
