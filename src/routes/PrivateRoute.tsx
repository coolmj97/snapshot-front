import { Outlet, useNavigate } from 'react-router';
import { auth } from '@/service/firebase';
import { useEffect } from 'react';

const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, [navigate]);

  return <Outlet />;
};

export default PrivateRoute;
