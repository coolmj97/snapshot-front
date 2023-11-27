import { Button, Layout, Title } from '@/components';
import LoginForm from '../features/login/LoginForm';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { loginByGoogle } from '@/service/auth';
import { Email } from '@/assets/icons/Email';
import { GoogleLogo } from '@/assets/icons/GoogleLogo';
import { authService } from '@/service/firebase';

const LoginPage = () => {
  const navigate = useNavigate();

  const [isLoginByEmail, setIsLoginByEmail] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLoginWithGoogle = async () => {
    try {
      await loginByGoogle();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        navigate('/feed/list');
      }
    });
  }, []);

  return (
    <>
      <Layout>
        <Box>
          <Title title="로그인" />

          {isLoginByEmail ? (
            <LoginForm />
          ) : (
            <ButtonBox>
              <Button
                $border="1px solid #D3D3D3"
                $marginBottom="8px"
                $fullWidth
                onClick={onLoginWithGoogle}
              >
                <GoogleLogo style={{ marginRight: '8px' }} /> 구글로 로그인
              </Button>
              <Button
                $border="1px solid #D3D3D3"
                $fullWidth
                onClick={() => {
                  setIsLoginByEmail(true);
                }}
              >
                <Email style={{ marginRight: '8px' }} /> 이메일로 로그인
              </Button>

              <SignUpButton onClick={() => navigate('/sign-up')}>회원가입</SignUpButton>
            </ButtonBox>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default LoginPage;

const SignUpButton = styled.a`
  display: inline-block;
  margin-top: 48px;
  color: #606060;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 400px;
  height: 100vh;
  padding: 48px 0;
  margin: 0 auto;
`;
