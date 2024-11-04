'use client';

import React, { useState } from 'react';
import CreateMachineForm from './machineForm';
import { Button, Grid2, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Table from '@/src/components/table';

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
            Add Machine
          </Button>
        </div>
        <div className="mt-5 ">{visible ? <CreateMachineForm /> : null}</div>
        <div className="mt-10">
          <Table />
        </div>
      </Paper>
    </div>
  );
};

export default Machines;
