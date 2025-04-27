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
    initialValues: { email: '', password: '' },
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
          localStorage.setItem('userId', data.userId);
          router.push('/dashboard');
        } else {
          const errorData = await res.json();
          formik.setErrors({ email: errorData.message });
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-mainbg min-h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-12 lg:px-20">
        <div className="w-full md:w-[45%] max-w-xs sm:max-w-sm md:max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6">Login to your account</p>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            {['email', 'password'].map((field) => (
              <TextField
                key={field}
                size="small"
                variant="outlined"
                fullWidth
                id={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field === 'password' ? 'password' : 'text'}
                value={formik.values[field as keyof typeof formik.values] || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched[field as keyof typeof formik.touched] && formik.errors[field as keyof typeof formik.errors])}
                helperText={formik.touched[field as keyof typeof formik.touched] ? formik.errors[field as keyof typeof formik.errors] : ""}
              />
            ))}

            <MainButton text="Login" />
            <p className="text-sm mt-4">New Here? Create an Account! <Link href="/SignUp" className="text-blue-600 hover:underline">Sign Up</Link></p>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-[50%] flex items-center justify-center">
          <img src="/images/projectSignIn.jpg" alt="Signup Visual" className="max-w-full h-auto rounded-lg shadow-md hover:scale-105 transition-all duration-300" />
        </div>
      </div>
    </>
  );
};

export default Login;
