'use client';
import React, { useState } from 'react';

import { Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateSensorForm from './sensorForm';

const Sensors = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div className=" mt-5 flex flex-col items-center justify-center">
      <Paper className="machine-list-paper " square={false} elevation={1}>
        <div>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleClick}
            className="w-full"
          >
            Add Sensor
          </Button>
        </div>
        <div className="mt-5 mb-5">{visible ? <CreateSensorForm /> : null}</div>
        {/* <MonitoringPointsTable /> */}
      </Paper>
    </div>
  );
};

export default Sensors;
