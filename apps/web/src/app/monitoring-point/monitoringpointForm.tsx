import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/store/hooks';
import { fetchMonitoringPoints } from '@/src/lib/redux/store/monitoringPointSlice';
import apiService from '@/src/lib/apiService';
import { fetchMachines } from '@/src/lib/redux/store/machineslice';

const CreateMonitoringPointForm = () => {
  const dispatch = useAppDispatch();
  const { machines, loading, error } = useAppSelector(
    (state) => state.machines
  );

  const [name, setName] = useState('');
  const [machineId, setMachineId] = useState<number | ''>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name && !machineId) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (!machineId) {
      setFormError('Please select a machine.');
      return;
    }
    if (!name) {
      setFormError('Please enter a name.');
      return;
    }

    const result = await apiService.createMonitoringPoint(Number(machineId), {
      name,
    });
    if (result.error) {
      setFormError(result.error);
      setSuccessMessage('');
    } else {
      setFormError(null);
      setSuccessMessage('Monitoring point created successfully.');
      setName(''); // Reset the form
      setMachineId('');
      //  Re-fetch monitoring points to update the list after adding a new point
      dispatch(fetchMonitoringPoints());
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Create New Monitoring Point</Typography>
      {formError && <Typography color="error">{formError}</Typography>}
      {successMessage && (
        <Typography color="primary">{successMessage}</Typography>
      )}
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Monitoring Point Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          Create
        </Button>
      </form>
    </Paper>
  );
};

export default CreateMonitoringPointForm;
