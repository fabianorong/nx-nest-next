import Link from 'next/link';
import React from 'react';
import SignInForm from './signinForm';

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <SignInForm />
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <p>Don&apos;t have an account? &nbsp;</p>
        <Link className="underline" href={'/auth/signin'}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
