import React, { useContext } from 'react';
import { AuthContext } from '../controller/auth_hook';

const LoginView = ({ username, setUsername, password, setPassword, error, onSubmit }) => {
  const token = useContext(AuthContext)
  const testObj = useContext(AuthContext)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <img
          src="https://i.ibb.co/N2WHzdZv/aspiration-logo-2.png" // <-- replace with your actual logo path
          alt="Logo"
          className="mb-6 w-24 h-24 object-contain text-center mx-auto"
        /><hr className="border-t border-gray-300 my-4" />
        <h2 className="text-2xl font-bold text-center text-gray-800 ">Login</h2>
        <hr className="border-t border-gray-300 my-4 mb-6" />
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left">
              Username
            </label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Login
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default LoginView;