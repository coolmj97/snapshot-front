import { ReactNode, useEffect, useState } from 'react';
import { Header } from './Layout.styles';
import { Button } from '..';
import { useNavigate } from 'react-router';
import { authService } from '@/service/firebase';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const onClickLogOut = () => {
    authService.signOut();
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      <div
        style={{
          borderBottom: '1px solid #eee',
        }}
      >
        <Header>
          <div
            onClick={() => navigate('/')}
            style={{
              cursor: 'pointer',
            }}
          >
            <img src="/src/assets/logo.png" width={'100%'} />
          </div>
          <div>
            <Button
              $border="1px solid #D3D3D3"
              $marginRight="8px"
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                } else {
                  onClickLogOut();
                }
              }}
            >
              {!isLoggedIn ? '로그인' : '로그아웃'}
            </Button>
            <Button $background="#f0133a" $color="#fff" onClick={() => navigate('/sign-up')}>
              회원가입
            </Button>
          </div>
        </Header>
      </div>

      {children}
    </>
  );
};

export default Layout;
