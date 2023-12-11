import { ReactNode, useEffect, useRef, useState } from 'react';
import { Header, LogoBox } from './Layout.styles';
import { Button } from '..';
import { useNavigate } from 'react-router';
import { auth } from '@/service/firebase';
import Menu from '../Menu/Menu';
import { MenuListType } from '../Menu/Menu.types';
import { MenuBox } from '../Menu/Menu.styles';
import Profile from '../Profile/Profile';
import { User } from 'firebase/auth';
import { EditIcon } from '@/assets/icons/EditIcon';
import { Dimmer } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Modal from '../Modal/Modal';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const feed = useSelector((state: RootState) => state.feed);
  const { title, photos, content } = feed;

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

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
      setIsLoading(false);
    });
  };

  useEffect(() => {
    checkCurrentUser();
    document.addEventListener('mousedown', onBlur);
  }, []);

  if (isLoading) return <Dimmer active blurring inverted />;

  return (
    <>
      <div
        style={{
          borderBottom: '1px solid #eee',
        }}
      >
        <Header>
          <LogoBox
            onClick={() => {
              if (feed) {
                setOpenModal(true);
              }
            }}
          >
            <img src="/src/assets/logo.png" width={'100%'} />
          </LogoBox>

          {!isLoggedIn ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
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
                alignItems: 'center',
              }}
            >
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

      <Modal
        $visible={openModal}
        content={
          <div>
            작성 중인 게시글이 있습니다.
            <br /> 정말로 나가시겠습니까?
          </div>
        }
        footer={
          <>
            <Button
              $background="#f0133a"
              $color="#fff"
              $marginRight="8px"
              onClick={() => navigate('/intro')}
            >
              네
            </Button>
            <Button $border="1px solid #D3D3D3" onClick={() => setOpenModal(false)}>
              아니오
            </Button>
          </>
        }
      />
    </>
  );
};

export default Layout;
