import { Link } from "react-router-dom";
import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register attempt:', formData);
    // Aquí puedes agregar la lógica de registro
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent w-full p-4">
      <style>{`
        @keyframes pulse {
          from {
            transform: scale(0.9);
            opacity: 1;
          }
          to {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .title-dot::before,
        .title-dot::after {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          border-radius: 50%;
          left: 0px;
          background-color: royalblue;
        }
        .title-dot::before {
          width: 18px;
          height: 18px;
        }
        .title-dot::after {
          width: 18px;
          height: 18px;
          animation: pulse 1s linear infinite;
        }
        .input-label {
          position: relative;
        }
        .input-field {
          width: 100%;
          padding: 10px 10px 20px 10px;
          outline: 0;
          border: 1px solid rgba(105, 105, 105, 0.397);
          border-radius: 10px;
          background-color: white;
        }
        .input-span {
          position: absolute;
          left: 10px;
          top: 15px;
          color: grey;
          font-size: 0.9em;
          cursor: text;
          transition: 0.3s ease;
          pointer-events: none;
        }
        .input-field:focus + .input-span,
        .input-field:valid + .input-span {
          top: 30px;
          font-size: 0.7em;
          font-weight: 600;
        }
        .input-field:valid + .input-span {
          color: green;
        }
        .input-field:placeholder-shown + .input-span {
          top: 15px;
          font-size: 0.9em;
        }
      `}</style>

      <div className="flex flex-col gap-2.5 max-w-sm bg-white p-4 rounded-3xl shadow-lg">
        <p className="text-3xl font-semibold relative flex items-center pl-8 title-dot" style={{ color: 'royalblue', letterSpacing: '-1px' }}>
          Register
        </p>
        <p className="text-sm" style={{ color: 'rgba(88, 87, 87, 0.822)' }}>
          Signup now and get full access to our app.
        </p>

        <div className="flex w-full gap-1.5">
          <label className="input-label w-full">
            <input
              required
              placeholder=""
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="input-field"
            />
            <span className="input-span">Firstname</span>
          </label>

          <label className="input-label w-full">
            <input
              required
              placeholder=""
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="input-field"
            />
            <span className="input-span">Lastname</span>
          </label>
        </div>

        <label className="input-label">
          <input
            required
            placeholder=""
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
          <span className="input-span">Email</span>
        </label>

        <label className="input-label">
          <input
            required
            placeholder=""
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />
          <span className="input-span">Password</span>
        </label>

        <label className="input-label">
          <input
            required
            placeholder=""
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-field"
          />
          <span className="input-span">Confirm password</span>
        </label>

        <button
          onClick={handleSubmit}
          className="border-none outline-none px-2.5 py-2.5 rounded-xl text-white text-base transition-all duration-300 hover:bg-blue-700"
          style={{ backgroundColor: 'royalblue' }}
        >
          Submit
        </button>

        <p className="text-center text-sm" style={{ color: 'rgba(88, 87, 87, 0.822)' }}>
          Already have an account?{' '}
          <Link to="/login" className="hover:underline" style={{ color: 'royalblue' }}>
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;