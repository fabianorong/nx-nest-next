'use client';

import React, { useState } from 'react';
import CreateMachineForm from './machineForm';
import { Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import MachinesTable from './machinesTable';

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
        <div className="mt-5 mb-5">
          {visible ? <CreateMachineForm /> : null}
        </div>
        <MachinesTable />
        {/* <div className="mt-10"></div> */}
      </Paper>
    </div>
  );
};

export default Machines;
