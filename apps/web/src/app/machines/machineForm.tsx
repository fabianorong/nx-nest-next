'use client';
import { Box, TextField, Typography, MenuItem } from '@mui/material';

import { createMachine } from '@/src/lib/actions';
import { useFormState } from 'react-dom';
import SubmitButton from '@/src/components/submitButton';
import { MachineTypeOptions } from '@/src/lib/constants';

const CreateMachineForm = () => {
  const [state, action] = useFormState(createMachine, undefined);

  return (
    <Box
      component="form"
      action={action}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
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
          }}
        >
          {state.message}
        </Typography>
      )}

      <TextField
        id="name"
        name="name"
        label="Machine Name"
        placeholder="Enter machine name"
        variant="outlined"
        error={!!state?.error?.name}
        helperText={state?.error?.name || ''}
        fullWidth
      />

      <TextField
        id="type"
        name="type"
        label="Machine Type"
        select
        variant="outlined"
        fullWidth
        defaultValue=""
      >
        {MachineTypeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <SubmitButton>Create Machine</SubmitButton>
    </Box>
  );
};

export default CreateMachineForm;
