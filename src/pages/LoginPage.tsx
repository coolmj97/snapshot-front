import { Button, Layout, Title } from '@/components';
import LoginForm from '../features/login/LoginForm';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { loginByGoogle } from '@/service/auth';
import { EmailIcon } from '@/assets/icons/EmailIcon';
import { GoogleLogo } from '@/assets/icons/GoogleLogo';
import { auth } from '@/service/firebase';
import { useDispatch } from 'react-redux';
import { logInCheck } from '@/redux/loginSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoginByEmail, setIsLoginByEmail] = useState(false);

  const onLoginWithGoogle = async () => {
    try {
      await loginByGoogle();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(logInCheck(true));
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
                <EmailIcon style={{ marginRight: '8px' }} /> 이메일로 로그인
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

  @media (max-width: 576px) {
    width: 70%;
  }
`;
