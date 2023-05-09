import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/authActions";

const LoginPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if((username === "user1" || username === "user2") && password === "12345678") {
      props.login()
      history('/');
    } else
      alert("Incorrect username or password")
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow max-w-md w-full mx-auto p-8">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
  }
};

export default connect(null, mapDispatchToProps)(LoginPage);
