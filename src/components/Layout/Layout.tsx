import { ReactNode, useEffect, useState } from 'react';
import { Header } from './Layout.styles';
import { Button } from '..';
import { useNavigate } from 'react-router';
import { authService } from '@/service/firebase';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const onClickLogOut = () => {
    authService.signOut();
    setIsLoggedIn(false);
    navigate('/');
  };

  const checkCurrentUser = () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(true);
    });
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  if (!isLoading) return <></>;

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

          {!isLoggedIn ? (
            <div>
              <Button
                $border="1px solid #D3D3D3"
                $marginRight="8px"
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </Button>
              <Button $background="#f0133a" $color="#fff" onClick={() => navigate('/sign-up')}>
                회원가입
              </Button>
            </div>
          ) : (
            <div>
              <Button $border="1px solid #D3D3D3" $marginRight="8px" onClick={onClickLogOut}>
                로그아웃
              </Button>
              <Button $background="#f0133a" $color="#fff" onClick={() => navigate('/feed/create')}>
                글 작성하기
              </Button>
            </div>
          )}
        </Header>
      </div>

      {children}
    </>
  );
};

export default Layout;
