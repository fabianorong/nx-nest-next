'use client';
import React from 'react';
import { useFormState } from 'react-dom';
import { TextField, Typography, Box } from '@mui/material';
import { signIn } from '../../../../lib/auth';
import SubmitButton from '../../../../components/submitButton';
import Link from 'next/link';

const SignInForm = () => {
  const [state, action] = useFormState(signIn, undefined);

  return (
    <Box
      component="form"
      action={action}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      {state?.message && (
        <Typography
          variant="body2"
          color="error"
          sx={{
            justifyContent: 'center',
            display: 'flex',
            alignContent: 'center',
            maxWidth: 250,
            mb: 2,
          }}
        >
          {state.message}
        </Typography>
      )}

      <TextField
        id="email"
        name="email"
        label="Email"
        placeholder="john@example.com"
        variant="outlined"
        error={!!state?.error?.email}
        helperText={state?.error?.email || ''}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        error={!!state?.error?.password}
        helperText={state?.error?.password || ''}
        fullWidth
      />
      <Link
        className="underline text-sm justify-center flex  text-gray-600 mt-2 mb-5"
        href={'/auth/signin'}
      >
        Forgot password?
      </Link>

      <SubmitButton>Sign In</SubmitButton>
    </Box>
  );
};

export default SignInForm;
