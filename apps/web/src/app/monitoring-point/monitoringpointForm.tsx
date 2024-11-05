'use client';
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/store/hooks';
import { fetchMachines } from '@/src/lib/redux/store/machineslice';
import { createMonitoringPoint } from '@/src/lib/actions';
import SubmitButton from '@/src/components/submitButton';

const CreateMonitoringPointForm = () => {
  const dispatch = useAppDispatch();
  const { machines, loading, error } = useAppSelector(
    (state) => state.machines
  );

  // Local state for form inputs
  const [name, setName] = useState('');
  const [machineId, setMachineId] = useState<number | ''>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !machineId) {
      setFormError('Please fill in all required fields.');
      return;
    }

    // Call the createMonitoringPoint action
    const result = await createMonitoringPoint(name, machineId);

    if (result.error) {
      setFormError(result.error);
      setSuccessMessage(null);
    } else {
      setFormError(null);
      setSuccessMessage('Monitoring point created successfully.');
      setName(''); // Reset the form
      setMachineId('');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {formError && (
        <Typography
          variant="body2"
          color="error"
          sx={{ justifyContent: 'center', display: 'flex', maxWidth: 250 }}
        >
          {formError}
        </Typography>
      )}

      {successMessage && (
        <Typography
          variant="body2"
          color="primary"
          sx={{ justifyContent: 'center', display: 'flex', maxWidth: 250 }}
        >
          {successMessage}
        </Typography>
      )}

      <TextField
        id="name"
        name="name"
        label="Monitoring Point Name"
        placeholder="Enter monitoring point name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <TextField
        id="machineId"
        name="machineId"
        label="Machine ID"
        select
        variant="outlined"
        fullWidth
        value={machineId}
        onChange={(e) => setMachineId(Number(e.target.value))}
      >
        {machines.map((machine) => (
          <MenuItem key={machine.id} value={machine.id}>
            {machine.name}
          </MenuItem>
        ))}
      </TextField>

      <SubmitButton>Create Monitoring Point</SubmitButton>
    </Box>
  );
};

export default CreateMonitoringPointForm;
