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
import { createMonitoringPoint, createSensor } from '@/src/lib/actions';
import SubmitButton from '@/src/components/submitButton';
import { fetchMonitoringPoints } from '@/src/lib/redux/store/monitoringPointSlice';
import { SensorTypeOptions } from '@/src/lib/constants';

const CreateSensorForm = () => {
  const dispatch = useAppDispatch();
  const { monitoringPoints, loading, error } = useAppSelector(
    (state) => state.monitoringPoints
  );

  // Local state for form inputs
  const [model, setModel] = useState('');
  const [monitoringPointId, setmonitoringPointId] = useState<number | ''>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMonitoringPoints());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!model || !monitoringPointId) {
      setFormError('Please fill in all required fields.');
      return;
    }

    // Call the createMonitoringPoint action
    const result = await createSensor(model, monitoringPointId);

    if (result.error) {
      setFormError(result.error);
      setSuccessMessage(null);
    } else {
      setFormError(null);
      setSuccessMessage('Sensor associated successfully!');
      setModel(''); // Reset the form
      setmonitoringPointId('');
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

      {/* <TextField
        id="name"
        name="name"
        label="Monitoring Point Name"
        placeholder="Enter monitoring point name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      /> */}

      <TextField
        id="model"
        name="model"
        label="Sensor Model"
        placeholder="Select Sensor Model"
        select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        variant="outlined"
        fullWidth
      >
        {SensorTypeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="monitoringPointId"
        name="monitoringPointId"
        label="Monitoring Point ID"
        select
        variant="outlined"
        fullWidth
        value={monitoringPointId}
        onChange={(e) => setmonitoringPointId(Number(e.target.value))}
      >
        {monitoringPoints.map((monitoringPoint) => (
          <MenuItem key={monitoringPoint.id} value={monitoringPoint.id}>
            {monitoringPoint.name}
          </MenuItem>
        ))}
      </TextField>

      <SubmitButton>Associate Sensor</SubmitButton>
    </Box>
  );
};

export default CreateSensorForm;
