'use client';
import React, { useState } from 'react';
import CreateMonitoringPointForm from './monitoringpointForm';
import { Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MonitoringPointsTable from './monitoringPointsTable';

const Machines = () => {
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
            Add Monitoring Point
          </Button>
        </div>
        <div className="mt-5 mb-5">
          {visible ? <CreateMonitoringPointForm /> : null}
        </div>
        <MonitoringPointsTable />
      </Paper>
    </div>
  );
};

export default Machines;
