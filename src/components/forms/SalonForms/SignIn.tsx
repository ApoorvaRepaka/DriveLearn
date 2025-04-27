import React, { useState } from 'react'; // useState is already imported here
import { useFormik } from 'formik';
import * as yup from 'yup';
import Head from 'next/head';
import MainButton from '@/components/elements/button/MainButton';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  board: yup.string().oneOf(['CBSE', 'ICSE', 'State'], 'Select a valid board').required('Board selection is required'),
});

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', board: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Set loading to true when form submission starts
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (res.ok) window.location.href = '/login';
        else alert((await res.json()).message || 'Signup failed');
      } catch (err) {
        console.error('Signup error:', err);
      }
      finally {
        setIsLoading(false); // Set loading to false when the request finishes
      }
    },
  });

  return (
    <>
      <Head>
        <title>Sign Up | AI Tutor</title>
      </Head>

      <div className="bg-gradient-to-b from-[#f9f6e7] to-white min-h-screen flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 md:px-16 lg:px-20">
        {/* Signup Form */}
        <div className="w-full md:w-2/5 max-w-md sm:max-w-lg bg-white shadow-xl rounded-lg p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">Welcome To AI Tutor</h2>
          <p className="text-gray-600 text-base sm:text-lg text-center mb-6">Create your account</p>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            {(['name', 'email', 'password', 'confirmPassword'] as const).map((field) => (
              <TextField
                key={field}
                size="small"
                variant="outlined"
                fullWidth
                id={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field.includes('password') ? 'password' : 'text'}
                value={formik.values[field]} // ✅ No more indexing error
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched[field] && formik.errors[field])}
                helperText={formik.touched[field] ? formik.errors[field] : ''}
              />
            ))}


            {/* Board Selection */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Select Board</label>
              <select
                id="board"
                name="board"
                value={formik.values.board}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select your board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State">State</option>
              </select>
              {formik.touched.board && formik.errors.board && (
                <p className="text-red-600 text-xs mt-1">{formik.errors.board}</p>
              )}
            </div>

            <MainButton
              text={isLoading ? 'Signing Up...' : 'Sign Up'}
              className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
              disabled={isLoading}
            />

            {/* Login Link */}
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-1/2 flex items-center justify-center">
          <img src="/images/projectSignIn.jpg" alt="Signup Visual" className="max-w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
        </div>
      </div>
    </>
  );
};

export default Signup;
