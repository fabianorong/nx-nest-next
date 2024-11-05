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

import { useAppDispatch, useAppSelector } from '@/src/lib/redux/store/hooks';
import { fetchMonitoringPoints } from '@/src/lib/redux/store/monitoringPointSlice';

const MonitoringPointsTable = () => {
  const dispatch = useAppDispatch();
  const { monitoringPoints, loading, error } = useAppSelector(
    (state) => state.monitoringPoints
  );

  useEffect(() => {
    dispatch(fetchMonitoringPoints());
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
        Monitoring Points List
      </Typography>
      <Table aria-label="monitoring points table">
        <TableHead>
          <TableRow>
            <TableCell>MP Name</TableCell>
            <TableCell>Machine Name</TableCell>
            <TableCell>Machine Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monitoringPoints.map((monitoringPoint) => (
            <TableRow key={monitoringPoint.id}>
              <TableCell>{monitoringPoint.name}</TableCell>
              <TableCell>{monitoringPoint.machine?.name || 'N/A'}</TableCell>
              <TableCell>{monitoringPoint.machine?.type || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonitoringPointsTable;
