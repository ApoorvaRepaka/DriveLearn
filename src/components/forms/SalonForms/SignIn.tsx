import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Head from 'next/head';
import MainButton from '@/components/elements/button/MainButton';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  board: yup.string().oneOf(['CBSE', 'ICSE', 'State'], 'Select a valid board').required('Board selection is required'),
});

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      board: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          window.location.href = '/login';
        } else {
          const data = await res.json();
          alert(data.message || 'Signup failed');
        }
      } catch (err) {
        console.error('Signup error:', err);
      }
    },
  });

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-mainbg min-h-screen flex justify-between pt-7 px-16 w-full">
        <div className="pt-1 pb-8 w-[29%]">
          <h2 className="text-2xl font-bold mb-1">Welcome To AI Tutor</h2>
          <p className="mb-4">Create your account</p>

          <form className="pt-3" onSubmit={formik.handleSubmit}>
            <TextField
              size="small"
              variant="standard"
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              className="mb-2"
            />

            <TextField
              size="small"
              variant="standard"
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className="mb-2"
            />

            <TextField
              size="small"
              variant="standard"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              className="mb-2"
            />

            <TextField
              size="small"
              variant="standard"
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              className="mb-2"
            />

            <div className="mb-4">
              <label className="text-sm font-medium block mb-1">Select Board</label>
              <select
                id="board"
                name="board"
                value={formik.values.board}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none"
              >
                <option value="" disabled>
                  Select your board
                </option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State">State</option>
              </select>
              {formik.touched.board && formik.errors.board && (
                <div className="text-red-600 text-xs mt-1">{formik.errors.board}</div>
              )}
            </div>

            <MainButton text="Sign Up" />

            <div className="flex justify-center mt-3 text-sm">
              <span>Already have an account?</span>
              <Link href="/login" className="mx-2 text-[#1F59EE]">
                Login
              </Link>
            </div>
          </form>
        </div>
        <div className="w-[62%] flex items-center justify-center">
          <img src="/images/projectSignIn.jpg" alt="Signup Visual" className="max-w-full h-auto" />
      </div>
      </div>
    </>
  );
};

export default Signup;