import { Navigate, Outlet } from 'react-router';
import { auth } from '@/service/firebase';

const LoginCheck = () => {
  return auth.currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginCheck;
