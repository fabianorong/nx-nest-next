// store/machineSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Machine, MachineState } from '../../type';
import { fetchAllMachines } from '../../actions';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const initialState: MachineState = {
  machines: [],
  loading: false,
  error: null,
};

// Async thunk to fetch machines
export const fetchMachines = createAsyncThunk<Machine[]>(
  'machines/fetchMachines',
  async () => {
    return await fetchAllMachines();
  }
);

export const createMachine = createAsyncThunk(
  'machines/createMachine',
  async (machineData: { name: string; type: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `localhost:8000/api/machine/create-machine`,
        machineData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || 'Failed to create machine'
      );
    }
  }
);

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
      })
      .addCase(
        createMachine.fulfilled,
        (state, action: PayloadAction<Machine>) => {
          state.machines.push(action.payload);
          state.error = null;
        }
      )
      .addCase(createMachine.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default machineSlice.reducer;
