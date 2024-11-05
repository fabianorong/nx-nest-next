// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import machineReducer from './store/machineslice';
import monitoringPointReducer from './store/monitoringPointSlice';

const store = configureStore({
  reducer: {
    machines: machineReducer,
    monitoringPoints: monitoringPointReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
