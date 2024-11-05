import { useEffect } from 'react';
import { Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/src/lib/redux/store/hooks';
import { fetchMachines } from '@/src/lib/redux/store/machineslice';
import DataTable from '@/src/components/table';

const MachinesTable = () => {
  const dispatch = useAppDispatch();
  const { machines, loading, error } = useAppSelector(
    (state) => state.machines
  );

  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);

  const columns = [
    { field: 'name', headerName: 'Machine Name' },
    { field: 'machineType', headerName: 'Machine Type' },
  ];

  const data = machines.map((machine) => ({
    name: machine.name,
    machineName: machine?.name || 'N/A',
    machineType: machine?.type || 'N/A',
  }));

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Machines List
      </Typography>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default MachinesTable;
