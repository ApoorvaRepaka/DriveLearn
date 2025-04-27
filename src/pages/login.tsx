import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MainButton from '@/components/elements/button/MainButton';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Login response:', data); // Debugging log
          localStorage.setItem('userId', data.userId); // Store userId in localStorage
          router.push('/dashboard'); // Redirect to dashboard
        } else {
          const errorData = await res.json();
          formik.setErrors({ email: errorData.message }); // Display error message
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('An error occurred. Please try again.');
      }
    },
  });

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-mainbg min-h-screen flex justify-between pt-7 px-16 w-full">
        <div className="pt-1 pb-8 w-[29%]">
          <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
          <p className="mb-4">Login to your account</p>

          <form className="pt-3" onSubmit={formik.handleSubmit}>
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
              className="mb-4"
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
              className="mb-6"
            />

            <MainButton text="Login" />

            <div className="flex justify-center mt-3 text-sm">
              <span>Do not have an account?</span>
              <Link href="/SignUp" className="mx-2 text-[#1F59EE]">
                Sign Up
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

export default Login;
