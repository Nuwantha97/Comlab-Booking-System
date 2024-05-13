import React from 'react';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import AccountCreation from './pages/signup';
import LoginForm from './pages/signIn';
import MyApp from './pages/booking'
import CalendarView from './pages/View';


function App() {
  return (
    
    <div>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/user" element={<User/>}></Route>
         <Route path='/signup' element={<AccountCreation/>}></Route>
         <Route path='/signin' element={<LoginForm/>}></Route>
         <Route path='/booking' element={<MyApp/>}></Route>
         <Route path='/view' element={<CalendarView/>}></Route>

         
       </Routes>
        
      </BrowserRouter>
      </div>
    
  );
}

export default App;
