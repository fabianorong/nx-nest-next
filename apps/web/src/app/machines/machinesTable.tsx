import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { fetchMachines } from '@/src/lib/redux/store/machineslice';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/store/hooks';

const MachinesTable = () => {
  const dispatch = useAppDispatch();
  const { machines, loading, error } = useAppSelector(
    (state) => state.machines
  );

  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="center" gutterBottom>
        Machine List
      </Typography>
      <Table aria-label="machine table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell>{machine.id}</TableCell>
              <TableCell>{machine.name}</TableCell>
              <TableCell>{machine.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MachinesTable;
