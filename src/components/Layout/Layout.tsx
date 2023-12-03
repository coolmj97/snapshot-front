import { ReactNode, useEffect, useRef, useState } from 'react';
import { Header } from './Layout.styles';
import { Button } from '..';
import { useNavigate } from 'react-router';
import { auth } from '@/service/firebase';
import { PrevArrow } from '@/assets/icons/PrevArrow';
import Menu from '../Menu/Menu';
import { MenuListType } from '../Menu/Menu.types';
import { MenuBox } from '../Menu/Menu.styles';
import Profile from '../Profile/Profile';
import { User } from 'firebase/auth';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const dropdownRef = useRef<any>(null);

  const onClickLogOut = () => {
    auth.signOut();
    setIsLoggedIn(false);
    navigate('/intro');
  };

  const menuList: MenuListType[] = [
    {
      name: '마이페이지',
      onClick: () => navigate('/user/setting'),
    },
    {
      name: '로그아웃',
      onClick: onClickLogOut,
    },
  ];

  const onBlur = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };

  const checkCurrentUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(true);
    });
  };

  useEffect(() => {
    checkCurrentUser();
    document.addEventListener('mousedown', onBlur);
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
            style={{
              cursor: 'pointer',
            }}
            onClick={() => navigate(-1)}
          >
            <PrevArrow color="#121212" />
          </div>
          <div
            onClick={() => navigate('/intro')}
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
            <div
              style={{
                display: 'flex',
              }}
            >
              <Button
                $background="#f0133a"
                $color="#fff"
                $marginRight="16px"
                onClick={() => navigate('/feed/create')}
              >
                글 작성하기
              </Button>

              <MenuBox ref={dropdownRef}>
                <Profile
                  url={currentUser?.photoURL ?? ''}
                  name={currentUser?.displayName ?? ''}
                  onlyImg
                  onClick={() => setOpenMenu(!openMenu)}
                />
                {openMenu && <Menu list={menuList} $top={50} />}
              </MenuBox>
            </div>
          )}
        </Header>
      </div>

      {children}
    </>
  );
};

export default Layout;
