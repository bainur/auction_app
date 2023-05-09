import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {!isLoggedIn && <Route path='/login' element={<LoginPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
