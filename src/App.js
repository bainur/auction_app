import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

function App() {
  const authToken = useSelector(state => state.authToken)
  return (
    <Router basename="/auction_app">
      <Routes>
        <Route path='/' element={<HomePage />} />
        {authToken === '' && <Route path='/login' element={<LoginPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
