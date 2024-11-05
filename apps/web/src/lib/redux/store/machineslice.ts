// store/machineSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Machine, MachineState } from '../../type';
import { fetchAllMachines } from '../../actions';

// Async thunk to fetch machines
export const fetchMachines = createAsyncThunk<Machine[]>(
  'machines/fetchMachines',
  async () => {
    return await fetchAllMachines();
  }
);

const initialState: MachineState = {
  machines: [],
  loading: false,
  error: null,
};

const machineSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMachines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMachines.fulfilled,
        (state, action: PayloadAction<Machine[]>) => {
          state.loading = false;
          state.machines = action.payload;
        }
      )
      .addCase(fetchMachines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch machines';
      });
  },
});

export default machineSlice.reducer;
