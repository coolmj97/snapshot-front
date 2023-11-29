import { Outlet, useNavigate } from 'react-router';
import { auth } from '@/service/firebase';
import { useEffect } from 'react';

const LoginCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, [auth]);

  return <Outlet />;
};

export default LoginCheck;
