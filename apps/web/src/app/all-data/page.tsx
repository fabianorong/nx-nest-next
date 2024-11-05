'use client';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/src/lib/redux/store/hooks';
import { fetchMonitoringPoints } from '@/src/lib/redux/store/monitoringPointSlice';
import DataTable from '@/src/components/table';

const AllMonitoringPointsTable = () => {
  const dispatch = useAppDispatch();
  const { monitoringPoints, loading, error } = useAppSelector(
    (state) => state.monitoringPoints
  );

  useEffect(() => {
    dispatch(fetchMonitoringPoints());
  }, [dispatch]);

  const columns = [
    { field: 'name', headerName: 'Monitoring Point Name' },
    { field: 'machineName', headerName: 'Machine Name' },
    { field: 'machineType', headerName: 'Machine Type' },
    { field: 'sensorModels', headerName: 'Sensor Model(s)' },
  ];

  const data = monitoringPoints.map((point) => ({
    name: point.name,
    machineName: point.machine?.name || 'N/A',
    machineType: point.machine?.type || 'N/A',
    sensorModels:
      point.sensors.length > 0
        ? point.sensors.map((sensor) => sensor.model).join(', ')
        : 'No Sensors',
  }));

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Monitoring Points List
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

export default AllMonitoringPointsTable;
