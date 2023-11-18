import { Layout, Title } from '@/components';
import LoginForm from '../features/login/LoginForm';
import styled from 'styled-components';

const LoginPage = () => {
  return (
    <Layout>
      <Box>
        <Title title="로그인"></Title>
        <LoginForm />
      </Box>
    </Layout>
  );
};

export default LoginPage;

const Box = styled.div`
  width: 400px;
  height: 100vh;
  padding: 48px 0;
  margin: 0 auto;
`;
