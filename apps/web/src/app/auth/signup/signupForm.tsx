'use client';
import React from 'react';
import { useFormState } from 'react-dom';
import { TextField, Typography, Box } from '@mui/material';
import { signUp } from '../../../../lib/auth';
import SubmitButton from '../../../../components/submitButton';

const SignUpForm = () => {
  const [state, action] = useFormState(signUp, undefined);

  return (
    <Box
      component="form"
      action={action}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {state?.message && (
        <Typography variant="body2" color="error">
          {state.message}
        </Typography>
      )}

      <TextField
        id="name"
        name="name"
        label="Name"
        placeholder="John Doe"
        variant="outlined"
        error={!!state?.error?.name}
        helperText={state?.error?.name || ''}
        fullWidth
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        placeholder="john@example.com"
        variant="outlined"
        error={!!state?.error?.email}
        helperText={state?.error?.email || ''}
        fullWidth
      />

      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        error={!!state?.error?.password}
        helperText={
          state?.error?.password && (
            <>
              Password must:
              <ul>
                {state.error.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </>
          )
        }
        fullWidth
      />

      <SubmitButton>Sign Up</SubmitButton>
    </Box>
  );
};

export default SignUpForm;
