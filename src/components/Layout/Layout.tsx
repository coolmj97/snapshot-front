import { ReactNode } from 'react';
import { Header } from './Layout.styles';
import { Button } from '..';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div
        style={{
          borderBottom: '1px solid #eee',
        }}
      >
        <Header>
          <div>
            <img src="/src/assets/logo.png" width={'100%'} />
          </div>
          <div>
            <Button $border="1px solid #D3D3D3" $marginRight="8px">
              로그인
            </Button>
            <Button $background="#f0133a" $color="#fff">
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
