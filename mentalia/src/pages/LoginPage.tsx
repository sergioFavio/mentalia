import { Link } from "react-router-dom";
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Aquí puedes agregar la lógica de autenticación
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent w-full">
      <form onSubmit={handleSubmit} className="bg-white block p-3 w-full max-w-sm rounded-lg shadow-lg">
        <p className="text-xl font-semibold text-center text-black mb-2">
          Sign in to your account
        </p>

        <div className="relative">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white p-4 pr-12 text-sm w-full border border-gray-300 rounded-lg shadow-sm my-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            required
          />
          <span className="absolute top-0 bottom-0 right-0 px-4 flex items-center justify-center">
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400"
            >
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white p-4 pr-12 text-sm w-full border border-gray-300 rounded-lg shadow-sm my-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            required
          />
          <span className="absolute top-0 bottom-0 right-0 px-4 flex items-center justify-center">
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <button
          type="submit"
          className="block py-3 px-5 bg-indigo-600 text-white text-sm font-medium w-full rounded-lg uppercase hover:bg-indigo-700 transition-colors mt-2"
        >
          Sign in
        </button>

        <p className="text-gray-500 text-sm text-center mt-4">
          No account?{' '}
          <Link to="/register" className="underline text-indigo-600 hover:text-indigo-700">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;