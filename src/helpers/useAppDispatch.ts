import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'; // Импорт AppDispatch

// Создаем типизированный хук для dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
