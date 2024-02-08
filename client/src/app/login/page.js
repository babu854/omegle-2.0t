"use client";

import Navbar from '@/components/navbar/Navbar'
import Link from 'next/link'
import React, { useState } from 'react'
import './login.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '@/redux/features/userSlice';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (event) => {
    setEnteredValues((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart());
    try {
      const { email, password } = enteredValues;
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        email, password
      }, {
        withCredentials: true
      });
      dispatch(loginSuccess(res.data));
      router.push("/");
      console.log(res.data)
    } catch (error) {
      dispatch(loginFailure());
    }
  }

  return (
    <div className='login'>
      <Navbar />
      <div className='container'>
        <div className='wrapper'>

          <span className='title'>Login</span>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              value={enteredValues.email}
              onChange={handleChange}
              name='email'
            />
            <input
              type='password'
              placeholder='Password'
              value={enteredValues.password}
              onChange={handleChange}
              name='password'
            />
            <button>Login</button>
          </form>

          <p>{"You don't have an account?"}
            <Link href={"/register"} className='link'> Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
