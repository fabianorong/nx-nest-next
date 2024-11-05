import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MonitoringPoint, MonitoringPointState } from '../../type';
import { fetchAllMonitoringPoints } from '../../actions';

export const fetchMonitoringPoints = createAsyncThunk<MonitoringPoint[]>(
  'monitoringPoints/fetchMonitoringPoints',
  async () => {
    return await fetchAllMonitoringPoints();
  }
);

const initialState: MonitoringPointState = {
  monitoringPoints: [],
  loading: false,
  error: null,
};

const monitoringPointSlice = createSlice({
  name: 'monitoringPoints',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonitoringPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMonitoringPoints.fulfilled,
        (state, action: PayloadAction<MonitoringPoint[]>) => {
          state.loading = false;
          state.monitoringPoints = action.payload;
        }
      )
      .addCase(fetchMonitoringPoints.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to fetch monitoring points';
      });
  },
});

export default monitoringPointSlice.reducer;
