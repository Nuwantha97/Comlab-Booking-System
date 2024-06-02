// src/App.js
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import AccountCreation from './pages/signup';
import LoginForm from './pages/signIn';
import MyApp from './pages/booking';
import CalendarView from './pages/View';
import Errmsg from './pages/errmsg';
import Profile from './components/Profile';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<User />} />
          <Route path="/signup" element={<AccountCreation />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/booking" element={<MyApp />} />
          <Route path="/view" element={<CalendarView />} />
          <Route path="/errmsg" element={<Errmsg />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
