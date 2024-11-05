import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector as <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected;
