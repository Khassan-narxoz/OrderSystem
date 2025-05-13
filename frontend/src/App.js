import { Outlet } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import { useContext } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from './pages/MainPage';
import {AuthContext} from './context/AuthContext';

export default function App() {
  const { user } = useContext(AuthContext);
  if (user) {
    console.log(user)
  }
  return (
    <div>
      <MainPage Component={<Outlet />} />
      <ToastContainer />
    </div>
  );
}
