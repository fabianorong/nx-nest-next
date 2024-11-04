'use client';
import React, { PropsWithChildren } from 'react';
import { Button } from '@mui/material';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      type="submit"
      aria-disabled={pending}
      className="w-full mt-2"
      color="success"
    >
      {pending ? 'Submitting...' : children}
    </Button>
  );
};

export default SubmitButton;
